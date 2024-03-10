/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as userActions from 'app/redux/UserReducer';
import { actions as fetchDataSagaActions } from 'app/redux/FetchDataSaga';
import PostSummary from 'app/components/cards/PostSummary';
import LoadingIndicator from 'app/components/elements/LoadingIndicator';
import debounce from 'lodash.debounce';
import { findParent } from 'app/utils/DomUtils';
import {
    parsePayoutAmount,
} from 'app/utils/ParsersAndFormatters';

import shouldComponentUpdate from 'app/utils/shouldComponentUpdate';

function topPosition(domElt) {
    if (!domElt) {
        return 0;
    }
    return domElt.offsetTop + topPosition(domElt.offsetParent);
}

class PostsList extends React.Component {
    static propTypes = {
        posts: PropTypes.object.isRequired,
        loading: PropTypes.bool.isRequired,
        category: PropTypes.string,
        loadMore: PropTypes.func,
        showSpam: PropTypes.bool,
        showResteem: PropTypes.bool,
        fetchState: PropTypes.func.isRequired,
        pathname: PropTypes.string,
        nsfwPref: PropTypes.string.isRequired,
    };

    static defaultProps = {
        showSpam: false,
        loading: false,
    };

    constructor() {
        super();
        this.state = {
            thumbSize: 'desktop',
            showNegativeComments: false,
        };
        this.scrollListener = this.scrollListener.bind(this);
        this.onBackButton = this.onBackButton.bind(this);
        this.closeOnOutsideClick = this.closeOnOutsideClick.bind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'PostsList');
    }

    componentDidMount() {
        this.attachScrollListener();
    }

    componentWillUnmount() {
        this.detachScrollListener();
        window.removeEventListener('popstate', this.onBackButton);
        window.removeEventListener('keydown', this.onBackButton);
        const post_overlay = document.getElementById('post_overlay');
        if (post_overlay) {
            post_overlay.removeEventListener('click', this.closeOnOutsideClick);
        }
        document.getElementsByTagName('body')[0].className = '';
    }

    onBackButton(e) {
        if ('keyCode' in e && e.keyCode !== 27) return;
        window.removeEventListener('popstate', this.onBackButton);
        window.removeEventListener('keydown', this.onBackButton);
    }

    closeOnOutsideClick(e) {
        const inside_post = findParent(e.target, 'PostsList__post_container');
        if (!inside_post) {
            const inside_top_bar = findParent(
                e.target,
                'PostsList__post_top_bar'
            );
            if (!inside_top_bar) {
                const post_overlay = document.getElementById('post_overlay');
                if (post_overlay) {
                    post_overlay.removeEventListener(
                        'click',
                        this.closeOnOutsideClick
                    );
                }
                this.closePostModal();
            }
        }
    }

    fetchIfNeeded() {
        this.scrollListener();
    }

    toggleNegativeReplies = () => {
        this.setState({
            showNegativeComments: !this.state.showNegativeComments,
        });
    };

    scrollListener = debounce(() => {
        const el = window.document.getElementById('posts_list');
        if (!el) return;
        const scrollTop =
            window.pageYOffset !== undefined
                ? window.pageYOffset
                : (
                      document.documentElement ||
                      document.body.parentNode ||
                      document.body
                  ).scrollTop;
        if (
            topPosition(el) + el.offsetHeight - scrollTop - window.innerHeight <
            10
        ) {
            const { loadMore, posts, category, reblogPref } = this.props;
            let { showResteem } = this.props;
            showResteem = reblogPref === 'disabled' ? false: showResteem;
            if (loadMore && posts && posts.size) {
                loadMore(posts.last(), category, showResteem);
            }
        }
        // Detect if we're in mobile mode (renders larger preview imgs)
        const mq = window.matchMedia('screen and (max-width: 39.9375em)');
        if (mq.matches) {
            this.setState({ thumbSize: 'mobile' });
        } else {
            this.setState({ thumbSize: 'desktop' });
        }
    }, 150);

    loadNextPosts = (e) => {
        e.preventDefault();
        const { loadMore, posts, category, reblogPref } = this.props;
        let { showResteem } = this.props;
        showResteem = reblogPref === 'disabled' ? false: showResteem;
        if (loadMore && posts && posts.size) {
            loadMore(posts.last(), category, showResteem);
        }
    };

    attachScrollListener() {
        window.addEventListener('scroll', this.scrollListener, {
            capture: false,
            passive: true,
        });
        window.addEventListener('resize', this.scrollListener, {
            capture: false,
            passive: true,
        });
        this.scrollListener();
    }

    detachScrollListener() {
        window.removeEventListener('scroll', this.scrollListener);
        window.removeEventListener('resize', this.scrollListener);
    }

    calculateVotesWorth = (post) => {
        try {
            let avotes = post.get('active_votes').toJS();
            let total_rshares = 0;
            for (let v = 0; v < avotes.length; ++v) {
                const { rshares } = avotes[v];
                total_rshares += Number(rshares);
            }
            avotes.sort((a, b) =>
                Math.abs(parseInt(a.rshares)) > Math.abs(parseInt(b.rshares))
                ? -1
                : 1 );

            const max_payout = parsePayoutAmount(
                post.get('max_accepted_payout')
            );
            const pending_payout = parsePayoutAmount(
                post.get('pending_payout_value')
            );
            // const promoted = parsePayoutAmount(post.get('promoted'));
            const total_author_payout = post.get('total_payout_value')
                ? parsePayoutAmount(post.get('total_payout_value'))
                : parsePayoutAmount(post.get('author_payout_value'));
            const total_curator_payout = parsePayoutAmount(
                post.get('curator_payout_value')
            );
            let payout = pending_payout + total_author_payout + total_curator_payout;
            if (payout < 0.0) payout = 0.0;
            if (payout > max_payout) payout = max_payout;

            if (max_payout === 0) payout = pending_payout;

            avotes = avotes.filter((vote) => ((payout * vote.rshares)/ total_rshares) > 2
                && !(payout * (vote.rshares/total_rshares) > (40/100) * payout));

            return avotes.length;
        } catch (error) {
            console.log(error);
        }
    }

    render() {
        const {
            posts,
            showFeatured,
            showPromoted,
            // showResteem,
            reblogPref,
            showSpam,
            loading,
            anyPosts,
            pathname,
            category,
            content,
            ignore_result,
            account,
            username,
            nsfwPref,
            blacklist,
            coalStatus,
            hideCategory
        } = this.props;
        let { showResteem } = this.props
        if(showResteem === undefined) showResteem = true
        showResteem = reblogPref === 'disabled' ? false : showResteem;
        const { thumbSize } = this.state;
        const postsInfo = [];

        posts.forEach((item) => {
            const cont = content.get(item);
            if (!cont) {
                console.error('PostsList --> Missing cont key', item);
                return;
            }
            const ignore =
                ignore_result && ignore_result.has(cont.get('author'));
            let hideResteem =
                !showResteem && account && cont.get('author') !== account;
            const hide = cont.getIn(['stats', 'hide']);
            if (!hideResteem && (!(ignore || hide) || showSpam)) {
                postsInfo.push({ item, ignore });
            }
        });

        // in case empty posts, do load next set of posts
        if (
            pathname === '/trending' ||
            pathname === '/trending/' ||
            pathname === '/hot' ||
            pathname === '/hot/'
        ) {
            const { loadMore } = this.props;
            if (
                posts &&
                posts.size > 0 &&
                postsInfo !== undefined &&
                postsInfo.length < 1 &&
                loadMore
            ) {
                // empty posts
                loadMore(posts.last(), category, showResteem);
            }
        }
        /// ////

        // Helper functions for determining whether to show special posts.
        const isLoggedInOnFeed = username && pathname === `/@${username}/feed`;
        const isLoggedOutOnTrending =
            !username &&
            (pathname === '/' || pathname === '/hot' || pathname === '/hot/');

        const areFeaturedPostsVisible =
            showFeatured && (isLoggedInOnFeed || isLoggedOutOnTrending);
        const areFeaturedPostsReady = isLoggedInOnFeed
            ? anyPosts
            : postsInfo.length > 0;
        const showFeaturedPosts =
            areFeaturedPostsVisible && areFeaturedPostsReady;
        const featureds = this.props.featured;
        const renderFeatured = (featuredPosts) => {
            if (!process.env.BROWSER) return null;
            return featuredPosts.map((featuredPost) => {
                const id = `${featuredPost.author}/${featuredPost.permlink}`;
                if (localStorage.getItem(`hidden-featured-post-${id}`)) {
                    return null;
                }
                const featuredPostContent = content.get(id);
                const isSeen = featuredPostContent.get('seen');
                const close = (e) => {
                    e.preventDefault();
                    localStorage.setItem(`hidden-featured-post-${id}`, true);
                    this.forceUpdate();
                };
                const blacklisted = blacklist.get(featuredPost.author);
                return (
                    <li key={id}>
                        {coalStatus === 'enabled' && (
                            <PostSummary
                                account={account}
                                post={id}
                                thumbSize={thumbSize}
                                ignore={false}
                                nsfwPref={nsfwPref}
                                featured
                                onClose={close}
                                blacklisted={blacklisted}
                                hideCategory={hideCategory}
                            />
                        )}
                        {coalStatus === 'disabled' && (
                            <PostSummary
                                account={account}
                                post={id}
                                thumbSize={thumbSize}
                                ignore={false}
                                nsfwPref={nsfwPref}
                                featured
                                onClose={close}
                                hideCategory={hideCategory}
                            />
                        )}
                    </li>
                );
            });
        };

        const arePromotedPostsVisible =
            showPromoted && (isLoggedInOnFeed || isLoggedOutOnTrending);
        const arePromotedPostsReady = isLoggedInOnFeed
            ? anyPosts
            : postsInfo.length > 0;
        const showPromotedPosts =
            arePromotedPostsVisible && arePromotedPostsReady;

        const promoteds = this.props.promoted;
        const renderPromoted = (promotedPosts) => {
            if (!process.env.BROWSER) return null;
            return promotedPosts.map((promotedPost) => {
                const id = `${promotedPost.author}/${promotedPost.permlink}`;
                if (localStorage.getItem(`hidden-promoted-post-${id}`)) {
                    return null;
                }
                const promotedPostContent = content.get(id);
                const isSeen = promotedPostContent.get('seen');
                const close = (e) => {
                    e.preventDefault();
                    localStorage.setItem(`hidden-promoted-post-${id}`, true);
                    this.forceUpdate();
                };
                return (
                    <li key={id}>
                        <PostSummary
                            account={account}
                            post={id}
                            thumbSize={thumbSize}
                            ignore={false}
                            nsfwPref={nsfwPref}
                            promoted
                            onClose={close}
                            hideCategory={hideCategory}
                        />
                    </li>
                );
            });
        };
        const renderSummary = (items) =>
            items.map((item, i) => {
                // const every = this.props.adSlots.in_feed_1.every;
                const every = 5;
                const author = content.get(item.item).get('author');
                const blacklisted = blacklist.get(author);
                const showAds = true;
                if (showAds && i >= every && i % every === 0) {
                    return (
                        <li key={item.item}>
                            {coalStatus === 'enabled' && (
                                <PostSummary
                                    account={account}
                                    post={item.item}
                                    thumbSize={thumbSize}
                                    ignore={item.ignore}
                                    nsfwPref={nsfwPref}
                                    blacklisted={blacklisted}
                                    hideCategory={hideCategory}
                                />
                            )}
                            {coalStatus === 'disabled' && (
                                <PostSummary
                                    account={account}
                                    post={item.item}
                                    thumbSize={thumbSize}
                                    ignore={item.ignore}
                                    nsfwPref={nsfwPref}
                                    blacklisted={
                                        coalStatus ? blacklisted : undefined
                                    }
                                    hideCategory={hideCategory}
                                />
                            )}

                            {/* <div className="articles__content-block--ad">
                                <GptAd
                                    tags={[category]}
                                    type="Freestar"
                                    id="bsa-zone_1566495089502-1_123456"
                                />
                            </div> */}
                            {/* <div className="articles__content-block--ad">
                                <iframe
                                    data-aa="2309669"
                                    title="A-ads bitcoin ads"
                                    src="//acceptable.a-ads.com/2309669"
                                    style={{
                                        width: '100%',
                                        border: '0px',
                                        padding: '0',
                                        overflow: 'hidden',
                                        backgroundColor: 'transparent',
                                    }}
                                />
                                <br />
                                <div className="text-center">
                                    <small>
                                        <a
                                            rel="external nofollow"
                                            href="https://a-ads.com/?partner=2309669"
                                        >
                                            Join A-Ads Network
                                        </a>
                                    </small>
                                </div>
                            </div> */}
                        </li>
                    );
                }
                return (
                    <li key={item.item}>
                        {coalStatus === 'enabled' && (
                            <PostSummary
                                account={account}
                                post={item.item}
                                thumbSize={thumbSize}
                                ignore={item.ignore}
                                nsfwPref={nsfwPref}
                                blacklisted={blacklisted}
                                hideCategory={hideCategory}
                            />
                        )}
                        {coalStatus === 'disabled' && (
                            <PostSummary
                                account={account}
                                post={item.item}
                                thumbSize={thumbSize}
                                ignore={item.ignore}
                                nsfwPref={nsfwPref}
                                blacklisted={
                                    coalStatus ? blacklisted : undefined
                                }
                                hideCategory={hideCategory}
                            />
                        )}
                    </li>
                );
            });

        return (
            <div id="posts_list" className="PostsList">
                <ul
                    className="PostsList__summaries hfeed"
                    itemScope
                    itemType="http://schema.org/blogPosts"
                >
                    {/* Only render featured and promoted posts when other posts are ready */}
                    {showFeaturedPosts && renderFeatured(featureds)}
                    {showPromotedPosts && renderPromoted(promoteds)}
                    {renderSummary(postsInfo)}
                </ul>
                {loading && (
                    <center>
                        <LoadingIndicator
                            style={{ marginBottom: '2rem' }}
                            type="circle"
                        />
                    </center>
                )}
                {!loading && (pathname === '/trending'
                || pathname === '/trending/' || pathname === '/hot'
                || pathname === '/hot/') && (
                <center><button type="button" className="button e-btn" onClick={(e) => this.loadNextPosts(e)}>Load More Posts</button></center>
                )}
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        const pathname = state.app.get('location').pathname;
        const current = state.user.get('current');
        const username = current
            ? current.get('username')
            : state.offchain.get('account');
        const content = state.global.get('content');
        const ignore_result = state.global.getIn([
            'follow',
            'getFollowingAsync',
            username,
            'ignore_result',
        ]);
        const userPreferences = state.app.get('user_preferences').toJS();
        const nsfwPref = userPreferences.nsfwPref || 'warn';
        const featured = state.offchain
            .get('special_posts')
            .get('featured_posts')
            .toJS();
        const promoted = state.offchain
            .get('special_posts')
            .get('promoted_posts')
            .toJS();
        const shouldSeeAds = state.app.getIn(['googleAds', 'enabled']);
        const adSlots = state.app.getIn(['googleAds', 'adSlots']).toJS();
        const blacklist = state.global.get('blacklist');

        const coalStatus = userPreferences.coalStatus || 'enabled';
        const reblogPref = userPreferences.reblogs || 'enabled';
        return {
            ...props,
            pathname,
            username,
            content,
            ignore_result,
            nsfwPref,
            featured,
            promoted,
            shouldSeeAds,
            adSlots,
            blacklist,
            coalStatus,
            reblogPref,
        };
    },
    (dispatch) => ({
        fetchState: (pathname) => {
            dispatch(fetchDataSagaActions.fetchState({ pathname }));
        },
        removeHighSecurityKeys: () => {
            dispatch(userActions.removeHighSecurityKeys());
        },
    })
)(PostsList);
