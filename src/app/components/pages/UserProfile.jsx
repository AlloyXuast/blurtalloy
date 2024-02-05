/* eslint-disable import/no-import-module-exports */
/* eslint react/prop-types: 0 */
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import classnames from 'classnames';
import * as userActions from 'app/redux/UserReducer';
import { actions as fetchDataSagaActions } from 'app/redux/FetchDataSaga';
import UserWallet from 'app/components/modules/UserWallet';
import Settings from 'app/components/modules/Settings';
import UserList from 'app/components/elements/UserList';
import LoadingIndicator from 'app/components/elements/LoadingIndicator';
import PostsList from 'app/components/cards/PostsList';
import { isFetchingOrRecentlyUpdated } from 'app/utils/StateFunctions';
import tt from 'counterpart';
import UserProfileHeader from 'app/components/cards/UserProfileHeader';
import Callout from 'app/components/elements/Callout';
import userIllegalContent from 'app/utils/userIllegalContent';
import ArticleLayoutSelector from 'app/components/modules/ArticleLayoutSelector';
import { actions as UserProfilesSagaActions } from 'app/redux/UserProfilesSaga';
import { api } from '@blurtfoundation/blurtjs';
import NotificationsList from '../cards/NotificationsList';
import UserAvatar from './UserAvatar';
import SubscriptionsList from '../cards/SubscriptionsList';

import WitnessVoters from '../elements/WitnessVoters';

export default class UserProfile extends React.Component {
    constructor() {
        super();
        this.state = {
            showResteem: true,
            authorMutedUsers: undefined,
            authorMutedUsersLoaded: false,
            witnessVoters: undefined
        };
        // this.onPrint = () => {
        //     if (typeof window !== 'undefined') {
        //         window.print();
        //     }
        // };
        this.loadMore = this.loadMore.bind(this);
    }

    componentWillMount() {
        this.loadAuthorMutedUsers();
        const { profile, accountname, fetchProfile, current_user } = this.props;
        const username = current_user ? current_user.get('username') : null;
        if (!profile) fetchProfile(accountname, username);
    }

    shouldComponentUpdate(np, ns) {
        return (
            np.current_user !== this.props.current_user ||
            np.profile !== this.props.profile ||
            np.global_status !== this.props.global_status ||
            np.loading !== this.props.loading ||
            np.location.pathname !== this.props.location.pathname ||
            np.blogmode !== this.props.blogmode ||
            ns.showResteem !== this.state.showResteem ||
            np.notifications !== this.props.notifications ||
            ns.authorMutedUsersLoaded !== this.state.authorMutedUsersLoaded
        );
    }

    componentDidUpdate(prevProps) {
        const { profile, accountname, fetchProfile, current_user } = this.props;
        const username = current_user ? current_user.get('username') : null;
        if (
            prevProps.accountname != accountname ||
            prevProps.username != username
        ) {
            if (!profile) fetchProfile(accountname, username);
        }
    }

    loadMore(last_post, category, showResteem) {
        const { accountname, reblogPref, current_user, global_status } =
            this.props;
        const username = current_user ? current_user.get('username') : null;

        if (!last_post) return;

        if (
            isFetchingOrRecentlyUpdated(
                global_status,
                category,
                '@' + accountname
            )
        ) {
            return;
        }

        let postFilter = null;
        if (reblogPref === 'disabled') {
            postFilter = (value) => value.author === accountname;
        } else {
            postFilter = showResteem
                ? null
                : (value) => value.author === accountname;
        }
        const [author, permlink] = last_post.split('/');
        this.props.requestData({
            author,
            permlink,
            order: category,
            category: '@' + accountname,
            observer: username
        });
    }

    toggleShowResteem = (e) => {
        e.preventDefault();
        this.setState((prevState) => ({ showResteem: !prevState.showResteem }));
    };

    loadAuthorMutedUsers = async () => {
        const { accountname } = this.props;

        if (accountname && accountname.length > 0) {
            const getFollowingAsync = async () => {
                try {
                    const followingAsyncResp = await api.getFollowingAsync(
                        accountname,
                        null,
                        'ignore',
                        1000
                    );
                    const mutedUsers = [];
                    if (followingAsyncResp) {
                        // eslint-disable-next-line no-restricted-syntax
                        for (const follow of followingAsyncResp) {
                            mutedUsers.push(follow.following);
                        }
                        this.setState({
                            authorMutedUsers: mutedUsers,
                            authorMutedUsersLoaded: true
                        });
                    } else {
                        console.warn('Error in loading muted users');
                        this.setState({
                            authorMutedUsers: [],
                            authorMutedUsersLoaded: true
                        });
                    }
                } catch (e) {
                    console.warn('Error in loading muted users');
                    this.setState({
                        authorMutedUsers: [],
                        authorMutedUsersLoaded: true
                    });
                }
            };

            await getFollowingAsync();
        }
    };

    render() {
        const {
            state: { showResteem },
            props: {
                current_user,
                global_status,
                follow,
                accountname,
                notifications,
                profile,
                posts,
                subscriptions,
                section,
                loading,
                routeParams,
                blogmode
            }
            // onPrint
        } = this;

        const { reblogPref } = this.props;
        const username = current_user ? current_user.get('username') : null;
        // Loading status
        const status = global_status
            ? global_status.getIn([section, 'by_author'])
            : null;
        const fetching = (status && status.fetching) || loading;

        if (
            !profile &&
            (fetching || (section === 'notifications' && !notifications))
        ) {
            return (
                <center>
                    <LoadingIndicator type="circle" />
                </center>
            );
        }
        if (!profile) {
            return (
                <div>
                    <center>{tt('user_profile.unknown_account')}</center>
                </div>
            );
        }

        const followers =
            follow && follow.getIn(['getFollowersAsync', accountname]);
        const following =
            follow && follow.getIn(['getFollowingAsync', accountname]);

        const isMyAccount = username === profile.get('name');
        let tab_content = null;

        // let walletClass = '';
        if (section === 'transfers') {
            // walletClass = 'active';
            tab_content = (
                <div>
                    <UserWallet account={profile} current_user={current_user} />
                </div>
            );
        } else if (section === 'followers') {
            if (followers && followers.has('blog_result')) {
                tab_content = (
                    <div>
                        <UserList
                            title={tt('user_profile.followers')}
                            users={followers.get('blog_result')}
                        />
                    </div>
                );
            }
        } else if (section === 'followed') {
            if (following && following.has('blog_result')) {
                tab_content = (
                    <UserList
                        title="Followed"
                        users={following.get('blog_result')}
                    />
                );
            }
        } else if (section === 'communities') {
            tab_content = (
                <SubscriptionsList
                    username={accountname}
                    subscriptions={subscriptions}
                />
            );
        } else if (section === 'settings') {
            tab_content = <Settings routeParams={routeParams} />;
        } else if (section === 'comments') {
            if (posts) {
                if (!fetching && posts && !posts.size) {
                    tab_content = (
                        <Callout>
                            {tt('user_profile.user_hasnt_made_any_posts_yet', {
                                name: accountname
                            })}
                        </Callout>
                    );
                } else {
                    tab_content = (
                        <PostsList
                            posts={posts}
                            loading={fetching}
                            category="comments"
                            loadMore={this.loadMore}
                            showPinned={false}
                            showSpam
                        />
                    );
                }
            } else {
                tab_content = (
                    <center>
                        <LoadingIndicator type="circle" />
                    </center>
                );
            }
        } else if (!section || section === 'blog' || section === 'posts') {
            if (posts) {
                const emptyText = isMyAccount ? (
                    <div>
                        {tt(
                            'user_profile.looks_like_you_havent_posted_anything_yet'
                        )}
                        <br />
                        <br />
                        <Link to="/submit.html">
                            {tt('user_profile.create_a_post')}
                        </Link>
                        <br />
                        <Link to="/hot">
                            {tt('user_profile.explore_trending_articles')}
                        </Link>
                        <br />
                        <Link to="/welcome">
                            {tt('user_profile.read_the_quick_start_guide')}
                        </Link>
                        <br />
                        <Link to="/faq.html">
                            {tt('user_profile.browse_the_faq')}
                        </Link>
                        <br />
                    </div>
                ) : (
                    tt('user_profile.user_hasnt_started_bloggin_yet', {
                        name: accountname
                    })
                );

                if (!fetching && posts && !posts.size) {
                    tab_content = <Callout>{emptyText}</Callout>;
                } else {
                    tab_content = (
                        <div>
                            {reblogPref !== 'disabled' &&
                                (!section || section === 'blog') && (
                                    <a
                                        href="#"
                                        onClick={this.toggleShowResteem}
                                    >
                                        {showResteem
                                            ? tt('user_profile.hide_resteems')
                                            : tt('user_profile.show_all')}
                                    </a>
                                )}
                            <PostsList
                                account={profile.get('name')}
                                posts={posts}
                                loading={fetching}
                                category={section ? section : 'blog'}
                                loadMore={this.loadMore}
                                showPinned={false}
                                showResteem={
                                    reblogPref === 'disabled'
                                        ? false
                                        : showResteem
                                }
                                showSpam
                            />
                        </div>
                    );
                }
            } else {
                tab_content = (
                    <center>
                        <LoadingIndicator type="circle" />
                    </center>
                );
            }
        } else if (section === 'replies') {
            const { authorMutedUsers, authorMutedUsersLoaded } = this.state;

            if (posts && authorMutedUsersLoaded) {
                // let filterPosts = []
                // if (authorMutedUsers !== undefined) {
                //   filterPosts = posts.get('recent_replies').filter(
                //     (reply) => !authorMutedUsers.includes(reply.split('/')[0])
                //   );
                // }

                if (
                    authorMutedUsersLoaded &&
                    !fetching &&
                    posts &&
                    !posts.size
                ) {
                    tab_content = (
                        <Callout>
                            {tt('user_profile.user_hasnt_had_any_replies_yet', {
                                name: accountname
                            }) + '.'}
                        </Callout>
                    );
                } else {
                    tab_content = (
                        <div>
                            <PostsList
                                posts={posts}
                                loading={fetching}
                                category="replies"
                                loadMore={this.loadMore}
                                showPinned={false}
                                showSpam={false}
                            />
                        </div>
                    );
                }
            } else {
                tab_content = (
                    <center>
                        <LoadingIndicator type="circle" />
                    </center>
                );
            }
        } else if (section === 'notifications') {
            const { authorMutedUsers } = this.state;
            if (username === accountname) {
                tab_content = (
                    <div>
                        <NotificationsList
                            authorMutedUsers={authorMutedUsers}
                            username={accountname}
                            notifications={
                                notifications && notifications.toJS()
                            }
                        />
                    </div>
                );
            }
        } else if (section === 'info') {
            tab_content = <WitnessVoters author={accountname} />;
        } else {
            //    console.log( "no matches" );
        }

        // detect illegal users
        if (userIllegalContent.includes(accountname)) {
            tab_content = <div>Unavailable For Legal Reasons.</div>;
        }

        let page_title = '';
        // Page title

        if (isMyAccount) {
            if (section === 'blog') {
                page_title = tt('g.my_blog');
            } else if (section === 'posts') {
                page_title = tt('g.my_posts');
            } else if (section === 'comments') {
                page_title = tt('g.my_comments');
            } else if (section === 'recent-replies') {
                page_title = tt('g.my_replies');
            } else if (section === 'settings') {
                page_title = tt('g.settings');
            }
        } else {
            if (section === 'blog') {
                page_title = tt('g.blog');
            } else if (section === 'posts') {
                page_title = tt('g.posts');
            } else if (section === 'comments') {
                page_title = tt('g.comments');
            } else if (section === 'recent-replies') {
                page_title = tt('g.replies');
            } else if (section === 'settings') {
                page_title = tt('g.settings');
            } else if (section === 'info') {
                // page_title = tt('g.settings')
                page_title = 'Account Info';
            }
        }
        const layoutClass = blogmode ? 'layout-block' : 'layout-list';

        const blog_header = (
            <div>
                <div className="articles__header">
                    <div className="articles__header-col">
                        <h1 className="articles__h1">{page_title}</h1>
                    </div>
                    <div className="articles__header-col articles__header-col--right">
                        <ArticleLayoutSelector />
                    </div>
                </div>
                <hr className="articles__hr" />
            </div>
        );

        if (
            !(
                section === 'transfers' ||
                section === 'permissions' ||
                section === 'password'
            )
        ) {
            tab_content = (
                <div className="row">
                    <div
                        className={classnames(
                            'UserProfile__tab_content',
                            'column',
                            layoutClass,
                            section
                        )}
                    >
                        <article className="articles">
                            {section === 'blog' || section === 'comments'
                                ? blog_header
                                : null}
                            {tab_content}
                        </article>
                    </div>
                </div>
            );
        }

        return (
            <div className="UserProfile">
                <UserProfileHeader
                    accountname={accountname}
                    profile={profile}
                />
                {section &&
                section === 'blog' &&
                profile.getIn(['metadata', 'profile', 'avatar_url']) ? (
                    <div
                        className="avatar"
                        style={{
                            textAlign: 'center',
                            maxWidth: '480px',
                            width: '320px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            boxShadow: '5px 5px 5px 5px #f24933'
                        }}
                    >
                        <UserAvatar
                            avatarUrl={profile.getIn([
                                'metadata',
                                'profile',
                                'avatar_url'
                            ])}
                        />
                    </div>
                ) : (
                    <div />
                )}
                <div>{tab_content}</div>
            </div>
        );
    }
}

module.exports = {
    path: '@:accountname(/:section)',
    component: connect(
        (state, ownProps) => {
            const current_user = state.user.get('current');
            const accountname = ownProps.routeParams.accountname.toLowerCase();
            const walletUrl = state.app.get('walletUrl');
            const userPreferences = state.app.get('user_preferences').toJS();
            const reblogPref = userPreferences.reblogs || 'enabled';
            let { section } = ownProps.routeParams;
            if (!section || section === 'blog') section = 'blog';
            else if (section === 'recent-replies') section = 'replies';
            const order = [
                'blog',
                'posts',
                'comments',
                'replies',
                'payout'
            ].includes(section)
                ? section
                : null;
            return {
                posts: state.global.getIn([
                    'discussion_idx',
                    '@' + accountname,
                    order
                ]),
                discussions: state.global.get('discussion_idx'),
                current_user,
                section,
                order,
                profile: state.userProfiles.getIn(['profiles', accountname]),
                loading: state.app.get('loading'),
                global_status: state.global.get('status'),
                accountname,
                notifications: state.global.getIn(
                    ['notifications', accountname, 'notifications'],
                    null
                ),
                follow: state.global.get('follow'),
                blogmode:
                    state.app.getIn(['user_preferences', 'blogmode']) ===
                    undefined
                        ? false
                        : state.app.getIn(['user_preferences', 'blogmode']),
                reblogPref,
                walletUrl,
                subscriptions: state.global.getIn([
                    'subscriptions',
                    accountname
                ])
                    ? state.global.getIn(['subscriptions', accountname]).toJS()
                    : []
            };
        },
        (dispatch) => ({
            login: () => {
                dispatch(userActions.showLogin());
            },
            fetchProfile: (account, observer) =>
                dispatch(
                    UserProfilesSagaActions.fetchProfile({ account, observer })
                ),
            requestData: (args) =>
                dispatch(fetchDataSagaActions.requestData(args))
        })
    )(UserProfile)
};
