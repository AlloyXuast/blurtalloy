/* eslint react/prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import tt from 'counterpart';
import { List } from 'immutable';
import { actions as fetchDataSagaActions } from 'app/redux/FetchDataSaga';
import constants from 'app/redux/constants';
import shouldComponentUpdate from 'app/utils/shouldComponentUpdate';
import PostsList from 'app/components/cards/PostsList';
import { isFetchingOrRecentlyUpdated } from 'app/utils/StateFunctions';
import Callout from 'app/components/elements/Callout';
import PostsIndexLayout from 'app/components/pages/PostsIndexLayout';
import ArticleLayoutSelector from 'app/components/modules/ArticleLayoutSelector';
import { GptUtils } from 'app/utils/GptUtils';
import Topics from './Topics';
import SortOrder from 'app/components/elements/SortOrder';
import { RECOMMENDED_FOLLOW_ACCOUNT } from 'app/client_config';
import { ifBlurt } from 'app/utils/Community';

const noFriendsText = (
    <div>
        {tt('posts_index.empty_feed_1')}.<br />
        <br />
        {tt('posts_index.empty_feed_2')}.<br />
        <br />
        <Link to="/hot">{tt('posts_index.empty_feed_3')}</Link>
        <br />
        <Link to="/welcome">
            {tt('posts_index.empty_feed_4')}
        </Link>
        <br />
        <Link to="/faq.html">
            {tt('posts_index.empty_feed_5')}
        </Link>
        <br />
    </div>
);

const noCommunitiesText = (
    <div>
        You haven&apos;t joined any active communities yet!
        <br />
        <br />
        <span style={{ fontSize: '1.1rem' }}>
            <Link to="/communities">Explore Communities</Link>
        </span>
    </div>
);
class PostsIndex extends React.Component {
    static propTypes = {
        discussions: PropTypes.object,
        status: PropTypes.object,
        routeParams: PropTypes.object,
        requestData: PropTypes.func,
        loading: PropTypes.bool,
        username: PropTypes.string,
        blogmode: PropTypes.bool,
        topics: PropTypes.object,
    };

    static defaultProps = {
        showSpam: false,
    };

    constructor() {
        super();
        this.state = {};
        this.loadMore = this.loadMore.bind(this);
        this.shouldComponentUpdate = shouldComponentUpdate(this, 'PostsIndex');
    }

    componentDidUpdate(prevProps) {
        if (window.innerHeight && window.innerHeight > 3000 && prevProps.posts !== this.props.posts) {
            this.refs.list.fetchIfNeeded();
        }
    }

    loadMore(last_post) {
        if (!last_post) return;
        if (last_post == this.props.pending) return; // if last post is 'pending', its an invalid start token
        const {
            username, status, order, category,
        } = this.props;

        if (isFetchingOrRecentlyUpdated(status, order, category)) return;

        const [author, permlink] = last_post.split('/');

        this.props.requestData({
            author,
            permlink,
            order,
            category,
            observer: username,
        });
    }

    render() {        
        const status = this.props.status
            ? this.props.status.getIn([category || '', order])
            : null;
        let fetching = (status && status.fetching) || this.props.loading;
        const { showSpam } = this.state;

        const {
            featured, 
            promoted, 
            gptBannedTags, 
            topic, 
            account_name, 
            username,
            category,
            order,
            community,
            topics,
            subscriptions,
            posts
        } = this.props;

        let allowAdsOnContent = true;
        allowAdsOnContent =
            this.props.gptEnabled &&
            !GptUtils.HasBannedTags([topic], gptBannedTags);

        let emptyText = '';
        if (order === 'feed') {
            const isMyAccount = username === account_name;
            if (isMyAccount) {
                emptyText = noFriendsText
            } else {
                emptyText = (
                    <div>
                        {tt('user_profile.user_hasnt_followed_anything_yet', {
                            name: account_name,
                        })}
                    </div>
                );
            }
        }  else if (category === 'my') {
            if (!process.env.BROWSER) {
                fetching = true;
            } else {
                emptyText = noCommunitiesText;
            }
        } else if (posts.size === 0) {
            const cat = community
                ? 'community' //community.get('title')
                : category ? ' #' + category : '';

            if (order == 'payout')
                emptyText = `No pending ${
                    cat
                } posts found. This view only shows posts within 12 - 36 hours of payout.`;
            else if (order == 'created') emptyText = `No posts in ${cat} yet!`;
            else emptyText = `No ${order} ${cat} posts found.`;
        } else {
            emptyText = 'Nothing here to see...';
        }

        // page title
        let page_title = tt('g.all_tags');
        if (order === 'feed') {
            if (account_name === username) {
                page_title = 'My friends' || tt('posts_index.my_feed');
            }
            else if (this.props.location.pathname ===`/@${RECOMMENDED_FOLLOW_ACCOUNT}/feed`) {
                page_title = tt('g.recommended');
            }
            else {
                page_title = tt('posts_index.accountnames_feed', { account_name });
            }
        } else if (category === 'my') {
            page_title = 'My communities';
        } else if (community) {
            page_title = community.get('title');
        } else if (category) {
            page_title = '#' + category;
        }

        let postsIndexDisplay = (
            <PostsList
                ref="list"
                posts={posts || List()}
                loading={fetching}
                anyPosts
                category={category}
                loadMore={this.loadMore}
                showFeatured
                showPromoted
                showSpam={showSpam}
                allowAdsOnContent={allowAdsOnContent}
                order={order}
                hideCategory={!!community}
            />
        );
        if (!fetching && !posts.size) {
            postsIndexDisplay = <Callout>{emptyText}</Callout>;
            if (featured && !featured.size && promoted && !promoted.size) {
                postsIndexDisplay = <Callout>{emptyText}</Callout>;
            }
        }
        if (!username && posts.size && category === 'my') {
            postsIndexDisplay = <Callout>{emptyText}</Callout>;
        }

        return (
            <PostsIndexLayout
                category={category}
                blogmode={this.props.blogmode}
            >
                <div className="articles__header row">
                    <div className="small-6 medium-6 large-6 column">
                        <h1 className="articles__h1 show-for-mq-large articles__h1--no-wrap">
                            {page_title}
                        </h1>
                        <div className="show-for-mq-large">
                            {community && (
                                <div
                                    style={{
                                        fontSize: '80%',
                                        color: 'gray',
                                    }}
                                >
                                    {tt("g.community")}
                                </div>
                            )}
                            {!community && category && order !== 'feed' && category !== 'my' && (
                                <div
                                    style={{
                                        fontSize: '80%',
                                        color: 'gray',
                                    }}
                                >
                                    {tt("g.unmoderated_tag")}
                                </div>
                            )}
                        </div>
                        <span className="hide-for-mq-large articles__header-select">
                            <Topics
                                username={username}
                                current={category}
                                topics={topics}
                                subscriptions={subscriptions}
                                compact
                            />
                        </span>
                    </div>
                    {order != 'feed' && !(category === 'my' && !posts.size) && (
                        <div className="small-4 medium-5 large-4 column articles__header-select">
                            <SortOrder sortOrder={order} topic={category} horizontal={false} />
                        </div>
                    )}
                    {!community && <div className="medium-1 show-for-mq-medium column">
                        <ArticleLayoutSelector />
                    </div>}
                </div>
                <hr className="articles__hr" />
                {postsIndexDisplay}
            </PostsIndexLayout>   
        );
    }
}

module.exports = {
    path: ':order(/:category)',
    component: connect(
        (state, ownProps) => {
            // route can be e.g. trending/food (order/category);
            //   or, @username/feed (category/order). Branch on presence of `@`.
            const route = ownProps.routeParams;
            const account_name = route.order && route.order[0] == '@' ? route.order.slice(1).toLowerCase() : null;
            const category = account_name ? route.order : route.category ? route.category.toLowerCase() : null;
            const order = account_name ? route.category : route.order || constants.DEFAULT_SORT_ORDER;
            const blurt = ifBlurt(category);
            let community = state.global.getIn(['community', blurt], null);
            if (typeof community === 'string') {
                community = null;
            }
            const key = ['discussion_idx', category || '', order];
            let posts = state.global.getIn(key, List());
            const pkey = ['discussion_idx', category || '', '_' + order];
            const pending = state.global.getIn(pkey, null);
            if (pending && !posts.includes(pending)) {
                posts = posts.unshift(pending);
            }
            const username = state.user.getIn(['current', 'username']) || state.offchain.get('account');


            const userPreferences = state.app.get('user_preferences').toJS();
            const reblogPref = userPreferences.reblogs || 'enabled';

            return {
                subscriptions: state.global.getIn(['subscriptions', username]) || null,
                account_name,
                username,
                community,
                order,
                posts,
                category,
                discussions: state.global.get('discussion_idx'),
                status: state.global.get('status'),
                loading: state.app.get('loading'),
                blogmode:
                    state.app.getIn(['user_preferences', 'blogmode']) ===
                    undefined
                        ? false
                        : state.app.getIn(['user_preferences', 'blogmode']),
                topic: ownProps.params.category,
                featured: state.offchain
                    .get('special_posts')
                    .get('featured_posts'),
                promoted: state.offchain
                    .get('special_posts')
                    .get('promoted_posts'),
                notices: state.offchain
                    .get('special_posts')
                    .get('notices')
                    .toJS(),
                maybeLoggedIn: state.user.get('maybeLoggedIn'),
                isBrowser: process.env.BROWSER,
                gptEnabled: state.app.getIn(['googleAds', 'gptEnabled']),
                gptBannedTags: state.app.getIn(['googleAds', 'gptBannedTags']),
                bandwidthKbytesFee: state.global.getIn([
                    'props',
                    'bandwidth_kbytes_fee',
                ]),
                operationFlatFee: state.global.getIn([
                    'props',
                    'operation_flat_fee',
                ]),
                pricePerBlurt: state.global.getIn(['props', 'price_per_blurt']),
                reblogPref,
                topics: state.global.getIn(['topics'], List()),
            };
        },
        (dispatch) => {
            return {
                requestData: (args) =>
                    dispatch(fetchDataSagaActions.requestData(args)),
            };
        }
    )(PostsIndex),
};
