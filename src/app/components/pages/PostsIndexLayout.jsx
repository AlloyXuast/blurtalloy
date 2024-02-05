/* eslint react/prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List } from 'immutable';
import tt from 'counterpart';
import { actions as fetchDataSagaActions } from 'app/redux/FetchDataSaga';
import constants from 'app/redux/constants';
import SidebarLinks from 'app/components/elements/SidebarLinks';
import SidebarNewUsers from 'app/components/elements/SidebarNewUsers';
import SidebarStats from 'app/components/elements/SidebarStats';
import Notices from 'app/components/elements/Notices';
import CommunityPane from 'app/components/elements/CommunityPane';
import CommunityPaneMobile from 'app/components/elements/CommunityPaneMobile';
import TagList from './TagList'
import { GptUtils } from 'app/utils/GptUtils';
import GptAd from 'app/components/elements/GptAd';
import Topics from './Topics';

const propTypes = {
    category: PropTypes.string,
    order: PropTypes.string,
    username: PropTypes.string,
    blogmode: PropTypes.bool,
    topics: PropTypes.object,
    topic: PropTypes.string,
};

const defaultProps = {
    category: '',
    order: '',
    username: '',
    blogmode: false,
    showSpam: false,
    topics: {},
    topic: '',
};

class PostsIndexLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSpam: false,
        };
        const { subscriptions, getSubscriptions, username } = props;
        if (!subscriptions && username) getSubscriptions(username);
    }

    componentWillMount() {
        const { subscriptions, getSubscriptions, username } = this.props;
        if (!subscriptions && username) getSubscriptions(username);
    }

    componentDidUpdate(prevProps) {
        const { subscriptions, getSubscriptions, username } = this.props;
        if (!subscriptions && username && username !== prevProps.username) getSubscriptions(username);
    }    

    onShowSpam = () => {
        this.setState({ showSpam: !this.state.showSpam });
    };

    render() {
        const {
            topics, 
            subscriptions, 
            community, 
            username, 
            blogmode, 
            isBrowser, 
            children, 
            maybeLoggedIn, 
            bandwidthKbytesFee,
            operationFlatFee,
            pricePerBlurt,
            notices,
            gptEnabled,
            topic,
            order,
            category,
            tags,
            gptBannedTags
        } = this.props;

        const { showSpam } = this.state;

        let allowAdsOnContent = true;
        allowAdsOnContent =
            gptEnabled &&
            !GptUtils.HasBannedTags([topic], gptBannedTags);

        return (
            <div className={'PostsIndex row ' + (community ? 'layout-list' : blogmode ? 'layout-block' : 'layout-list')}>
                <article className="articles">
                    {community && (
                        <span className="hide-for-mq-large articles__header-select">
                            <CommunityPaneMobile community={community} username={username} />
                        </span>
                    )}
                    {children}
                </article>

                <aside className="c-sidebar c-sidebar--right">
                    {community && (
                        <CommunityPane
                            community={community}
                            username={username}
                        />
                    )}
                    {!community ? (isBrowser &&
                    !maybeLoggedIn &&
                    !username ? (
                        <SidebarNewUsers />
                    ) : (
                        isBrowser && (
                            <div>
                                <SidebarLinks username={username} />
                                <SidebarStats
                                    bandwidthKbytesFee={bandwidthKbytesFee.toFixed(
                                        3
                                    )}
                                    operationFlatFee={operationFlatFee.toFixed(
                                        3
                                    )}
                                    pricePerBlurt={pricePerBlurt}
                                />
                            </div>
                        )
                    )) : null }
                    {!community && <Notices notices={notices} />}
                    <div className="sidebar-ad">
                        <iframe
                            data-aa="2059755"
                            title="A-ads bitcoin ads"
                            src="//acceptable.a-ads.com/2059755"
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
                                    href="https://a-ads.com/?partner=2059755"
                                >
                                    Join A-Ads Network
                                </a>
                            </small>
                        </div>
                    </div>
                    {gptEnabled && allowAdsOnContent ? (
                        <div className="sidebar-ad">
                            <GptAd
                                type="Freestar"
                                id="bsa-zone_1566495004689-0_123456"
                            />
                        </div>
                    ) : null}
                </aside>

                <aside className="c-sidebar c-sidebar--left">
                    {/* My communities */}
                    {subscriptions && username && (subscriptions || topics).size > 0 && <Topics username={username} topics={topics} subscriptions={subscriptions} compact = {false} />}
                    {/* Treeding communityies */}
                    {!community && <Topics topics={topics} compact = {false} />}
                    {/* Transaction fee and price block */}
                    {isBrowser &&
                    (maybeLoggedIn ||
                    username) && (
                        <div className={`${!community && "hide-for-mq-large"}`}>
                            <SidebarLinks username={username} />
                            <SidebarStats
                                bandwidthKbytesFee={bandwidthKbytesFee.toFixed(
                                    3
                                )}
                                operationFlatFee={operationFlatFee.toFixed(
                                    3
                                )}
                                pricePerBlurt={pricePerBlurt}
                            />
                        </div>
                    )}
                    {community && <Notices notices={notices} />}
                    {/* Blurt tags */}
                    {tags && <TagList
                        order={order}
                        current={category}
                        compact={false}
                        username={this.props.username}
                        categories={tags}
                    />}
                    <small>
                        <a
                            className="c-sidebar__more-link"
                            onClick={this.onShowSpam}
                        >
                            {showSpam
                                ? tt('g.next_3_strings_together.show_less')
                                : tt('g.next_3_strings_together.show_more')}
                        </a>
                        {' ' + tt('g.next_3_strings_together.value_posts')}
                    </small>
                    <div className="sidebar-ad">
                        <iframe
                            data-aa="2059755"
                            title="A-ads bitcoin ads"
                            src="//acceptable.a-ads.com/2059755"
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
                                    href="https://a-ads.com/?partner=2059755"
                                >
                                    Join A-Ads Network
                                </a>
                            </small>
                        </div>
                    </div>
                    {gptEnabled && allowAdsOnContent ? (
                        <div>
                            <div className="sidebar-ad">
                                <GptAd
                                    type="Freestar"
                                    slotName="bsa-zone_1566494461953-7_123456"
                                />
                            </div>
                            <div
                                className="sidebar-ad"
                                style={{ marginTop: 20 }}
                            >
                                <GptAd
                                    type="Freestar"
                                    slotName="bsa-zone_1566494856923-9_123456"
                                />
                            </div>
                        </div>
                    ) : null}
                </aside>
            </div>
        );
    }
}

PostsIndexLayout.propTypes = propTypes;
PostsIndexLayout.defaultProps = defaultProps;

export default connect(
    (state, props) => {
        const { category, order = constants.DEFAULT_SORT_ORDER } = props;
        const username = state.user.getIn(['current', 'username']) || state.offchain.get('account');
        let community = state.global.getIn(['community', props.category], null);
        if (typeof community === 'string') {
            community = null;
        }
        if (category === 'feed') {
            const account_name = order.slice(1);
            feed_posts = state.global.getIn([
                'accounts',
                account_name,
                'feed',
            ]);
        }

        return {
            order,
            tags: state.global
                    .getIn(['tag_idx', 'trending'])
                    .take(40),
            category,
            blogmode: props.blogmode,
            community,
            subscriptions: state.global.getIn(['subscriptions', username], null),
            topics: state.global.getIn(['topics'], List()),
            isBrowser: process.env.BROWSER,
            username,
            maybeLoggedIn: state.user.get('maybeLoggedIn'),
            bandwidthKbytesFee: state.global.getIn([
                'props',
                'bandwidth_kbytes_fee',
            ]),
            operationFlatFee: state.global.getIn([
                'props',
                'operation_flat_fee',
            ]),
            pricePerBlurt: state.global.getIn(['props', 'price_per_blurt']),
            topic: props.topic,
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
            gptBannedTags: state.app.getIn(['googleAds', 'gptBannedTags']),
            gptEnabled: state.app.getIn(['googleAds', 'gptEnabled']),
        };
    },
    (dispatch) => ({
        getSubscriptions: (account) => dispatch(fetchDataSagaActions.getSubscriptions(account)),
    })
)(PostsIndexLayout);
