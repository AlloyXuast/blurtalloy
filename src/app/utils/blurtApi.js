/* global $STM_Config */
import { api } from '@blurtfoundation/blurtjs';
import { ifBlurt } from 'app/utils/Community';

import axios from 'axios';
import stateCleaner from 'app/redux/stateCleaner';
import { Client } from '@busyorg/busyjs';

function verifyLocalStorageData(propertyDate, propertyValue, maxSecondsSinceUpdate = 300) {
    if (!process.env.BROWSER) {
        return { result: false }
    }
    try {
        const consultationDate = localStorage.getItem(propertyDate);
        const value = localStorage.getItem(propertyValue);
        if (consultationDate !== null && value !== null && consultationDate !== undefined && value !== undefined) {
            const dateObtained = new Date(Date.parse(consultationDate));
            const currentTimestamp = new Date().getTime();
            // Check if the time difference in seconds is greater than the specified limit
            if (!Number.isNaN(dateObtained.getTime()) && (currentTimestamp - dateObtained.getTime()) / 1000 < maxSecondsSinceUpdate) {
                return { result: true, [propertyDate]: dateObtained, [propertyValue]: value };
            }
        }
        return { result: false };
    } catch (error) {
        console.error("blurtApi:", error.message);
        return { result: false };
    }
}

function saveDataToLocalStorage(dataObject) {
    if (!process.env.BROWSER) {
        return
    }
    try {
        if (typeof dataObject === 'object' && dataObject !== null) {
            Object.entries(dataObject).forEach(([key, value]) => {
                localStorage.setItem(key, JSON.stringify(value));
            });
        }
    } catch (error) {
        console.error(error.message);
    }
}

// TODO: add server-side synchronization of external requests,
// and bybass this if we are server-side rendering.
async function externalRequests() {
    const state = {}
    let { result, price, datePrice } = verifyLocalStorageData('datePrice', 'price')
    if (result) {
        state.price = Number(
            price
        ).toFixed(8);
    }
    else {
        await axios
            .get($STM_Config.price_info_url, { timeout: 3000 })
            .then((response) => {
                if (response.status === 200) {
                    state.price = Number(
                        response.data.price_usd
                    ).toFixed(8);
                    const currentDate = new Date();
                    saveDataToLocalStorage({ datePrice: currentDate.toUTCString(), price: response.data.price_usd })
                }
            })
            .catch((error) => {
                console.error("blurtApi:", error);
            });
    }
    let coal_data = verifyLocalStorageData('dateBlacklist', 'blacklist')
    let { blacklist, dateBlacklist } = coal_data
    result = coal_data.result
    if (result) {
        const map = new Map();
        for (const data of blacklist) {
            map.set(data.name, data);
        }
        state.blacklist = map;
    }
    else {
        await axios
            .get($STM_Config.coal_url, { timeout: 3000 })
            .then((response) => {
                const map = new Map();
                if (response.status === 200) {
                    // eslint-disable-next-line no-restricted-syntax
                    for (const data of response.data) {
                        map.set(data.name, data);
                    }
                    state.blacklist = map;
                    const currentDate = new Date();
                    saveDataToLocalStorage({ dateBlacklist: currentDate.toUTCString(), blacklist: response.data })
                }
            })
            .catch((error) => {
                const map = new Map();
                console.error(error);
                state.blacklist = map;
            });
    }
    return state
}

export async function callBridge(method, params, pre = 'bridge.') {
    // [JES] Hivemind throws an exception if you call for my/[trending/payouts/new/etc] with a null observer
    // so just delete the 'my' tag if there is no observer specified
    if (
        method === 'get_ranked_posts'
        && params
        && (params.observer === null || params.observer === undefined)
        && params.tag === 'my'
    ) {
        delete params.tag;
        delete params.observer;
    }

    if (method === 'normalize_post' && params && params.observer !== undefined) delete params.observer;

    console.log(
        'call bridge',
        method,
        params && JSON.stringify(params).substring(0, 200)
    );
    return new Promise((resolve, reject) => {
        api.call(pre + method, params, (err, data) => {
            if (err) {
                console.error('~~ api.calBridge error ~~~>', method, params, err);
                reject(err);
            } else resolve(data);
        });
    });
}

export async function getStateAsync(url, observer, ssr = false) {
    if (observer === undefined) observer = null;

    const {
        page, tag, sort, key, tags
    } = parsePath(url);
    const domains = [
        'peypaisecurity.com',
        'kinrnightx.monster',
        'jarolovexr.click',
    ];

    // No load posts
    const noLoadPosts = [
        'curation-rewards',
        'author-rewards',
        'notifications',
        'password',
        'followed',
        'followers',
        'settings',
        'info',
        'communities'
    ];

    console.log('GSA', url, observer, ssr);
    const state = {
        accounts: {},
        community: {},
        content: {},
        discussion_idx: {},
        profiles: {},
        props: {},
        blacklist: {},
        phishy_domains: domains,
        reward_fund: {},
        blurt_config: {},
        tags: [],
        tag_idx: { trending: [] }
    };

    if (tags) {
        state.tags = await callBridge("get_trending_tags", [null, 40], "condenser_api.");
        state.tag_idx.trending = state.tags.map((tag) => tag.name )
    }
    // load `content` and `discussion_idx`
    if (page == 'posts' || (page == 'account' && !noLoadPosts.includes(sort))) {
        let posts = await loadPosts(sort, tag, observer);
        state['content'] = posts['content'];
        state['discussion_idx'] = posts['discussion_idx'];
    } else if (page == 'thread') {
        const posts = await loadThread(key[0], key[1]);
        state['content'] = posts['content'];
    }
    if (tag && ifBlurt(tag)) {
        try {
            state['community'][tag] = await callBridge('get_community', {
                name: tag,
                observer: observer,
            });
        } catch (e) {console.log('Bridge Error: ', e);}
    }

    // for SSR, load profile on any profile page or discussion thread author
    const account = tag && tag[0] == '@' ? tag.slice(1) : page == 'thread' ? key[0].slice(1) : null;

    if (ssr && account) {
        const profile = await callBridge('get_profile', { account });
        if (profile && profile['name']) {
            state['profiles'][account] = profile;
        }
    }

    if (ssr) {
        // append `topics` key
        state['topics'] = await callBridge('get_trending_topics', {
            limit: 12,
        });
    }

    const chainProperties = await getChainProperties();
    if (chainProperties) {
        state.props.operation_flat_fee = parseFloat(
            chainProperties.operation_flat_fee
        );
        state.props.bandwidth_kbytes_fee = parseFloat(
            chainProperties.bandwidth_kbytes_fee
        );
    }

    const dynamicGlobalProperties = await getDynamicGlobalProperties();
    if (dynamicGlobalProperties) {
        state.props = { ...dynamicGlobalProperties, ...state.props }
    }

    const response = await externalRequests()
    state.props.price_per_blurt = response.price
    state.blacklist = response.blacklist

    const promotedMembersListURL = 'https://api.nekosunevr.co.uk/v4/apps/ranks/blurt';

    await axios
        .get(promotedMembersListURL, {
            timeout: 3000
        })
        .then((response) => {
            const map = new Map();
            if (response.status === 200) {
                // eslint-disable-next-line no-restricted-syntax
                for (const data of response.data) {
                    map.set(data.name, data);
                }
                state.promoted_members = map;
            }
        })
        .catch((error) => {
            console.warn(error);
        });


    const rewardFund = await getRewardFund();
    if (rewardFund) {
        state.reward_fund = rewardFund;
    }
    const blurtConfig = await getConfig();
    if (blurtConfig) {
        state.blurt_config = blurtConfig;
    }

    const cleansed = stateCleaner(state);
    return cleansed;
}

async function getChainProperties() {
    return new Promise((resolve) => {
        api.getChainProperties((err, result) => {
            if (result) {
                resolve(result);
            } else {
                resolve({});
            }
        });
    });
}

async function getDynamicGlobalProperties(params) {
    return new Promise((resolve) => {
        api.getDynamicGlobalProperties((err, result) => {
            if (result) {
                resolve(result);
            } else {
                resolve({});
            }
        });
    });
}

function getRewardFund() {
    return new Promise((resolve) => {
        api.getRewardFund('post', (err, result) => {
            if (result) {
                resolve(result);
            } else {
                resolve({});
            }
        });
    });
}

function getConfig() {
    return new Promise((resolve) => {
        api.getConfig((err, result) => {
            if (result) {
                resolve(result);
            } else {
                resolve({});
            }
        });
    });
}

async function loadPosts(sort, tag, observer) {
    const account = tag && tag[0] == '@' ? tag.slice(1) : null;

    let posts;
    if (account) {
        const params = { sort, account, observer };
        posts = await callBridge('get_account_posts', params);
    } else {
        const params = { sort, tag, observer };
        posts = await callBridge('get_ranked_posts', params);
    }
    let content = {};
    let keys = [];
    for (var idx in posts) {
        const post = posts[idx];
        const key = post['author'] + '/' + post['permlink'];
        content[key] = post;
        keys.indexOf(key) == -1 && keys.push(key);
    }

    let discussion_idx = {};
    discussion_idx[tag] = {};
    discussion_idx[tag][sort] = keys;
    return { content, discussion_idx };
}

async function loadThread(account, permlink) {
    const author = account.slice(1);
    const content = await callBridge('get_discussion', { author, permlink });
    return { content };
}

export async function callNotificationsApi(account) {
    console.log('call notifications api', account);
    return new Promise((resolve, reject) => {
        const client = new Client('wss://notifications.blurt.world');
        client.call('get_notifications', [account], (err, result) => {
            if (err !== null) reject(err);
            resolve(result);
        });
    });
}

function parsePath(url) {
    // strip off query string
    url = url.split('?')[0];

    // strip off leading and trailing slashes
    if (url.length > 0 && url[0] == '/') url = url.substring(1, url.length);
    if (url.length > 0 && url[url.length - 1] == '/') url = url.substring(0, url.length - 1);
    // curation and author rewards pages are alias of `transfers`
    if (url.indexOf('/curation-rewards') !== -1) url = url.replace('/curation-rewards', '/transfers');
    if (url.indexOf('/author-rewards') !== -1) url = url.replace('/author-rewards', '/transfers');
    // blank URL defaults to `trending`
    if (url === '') url = 'hot';

    const part = url.split('/');
    const parts = part.length;
    const sorts = [
        'trending',
        'promoted',
        'hot',
        'created',
        'payout',
        'payout_comments',
        'muted',
    ];
    const acct_tabs = [
        'blog',
        'feed',
        'posts',
        'comments',
        'recent-replies',
        'curation-rewards',
        'author-rewards',
        'notifications',
        'password',
        'followed',
        'followers',
        'settings',
        'info',
        'communities'
    ];

    const tags_transformation = {
        'recent-replies': 'replies'
    }

    let page = null;
    let tag = null;
    let sort = null;
    let key = null;
    let tags = null

    if (parts == 1 && sorts.includes(part[0])) {
        tags = true
        page = 'posts';
        sort = part[0];
        tag = '';
    } else if (parts == 2 && sorts.includes(part[0])) {
        tags = true
        page = 'posts';
        sort = part[0];
        tag = part[1];
    } else if (parts == 3 && part[1][0] == '@') {
        page = 'thread';
        tag = part[0];
        key = [part[1], part[2]];
    } else if (parts == 1 && part[0][0] == '@') {
        page = 'account';
        sort = 'blog';
        tag = part[0];
    } else if (parts == 2 && part[0][0] == '@') {
        if (part[1] === 'feed') {
            tags = true
        }
        if (acct_tabs.includes(part[1])) {
            page = 'account';
            sort = Object.keys(tags_transformation).includes(part[1])
                ? tags_transformation[part[1]]
                : part[1];
        } else {
            // settings, followers, notifications, etc (no-op)
        }
        tag = part[0];
    } else {
        // no-op URL
    }

    return { page, tag, sort, key, tags };
}