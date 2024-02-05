/* eslint react/prop-types: 0 */
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Icon from 'app/components/elements/Icon';
import Follow from 'app/components/elements/Follow';
import Tooltip from 'app/components/elements/Tooltip';
import DateJoinWrapper from 'app/components/elements/DateJoinWrapper';
import TimeAgoWrapper from 'app/components/elements/TimeAgoWrapper';
import tt from 'counterpart';
import Userpic from 'app/components/elements/Userpic';
import AffiliationMap from 'app/utils/AffiliationMap';
import { proxifyImageUrl } from 'app/utils/ProxifyUrl';
import SanitizedLink from 'app/components/elements/SanitizedLink';
import Blacklist from 'app/components/elements/Blacklist'
import DropdownMenu from 'app/components/elements/DropdownMenu'

class UserProfileHeader extends React.Component {
    render() {
        const { current_user, accountname, profile, walletUrl } = this.props;

        const { name, location, about, website, cover_image } = profile
            ? profile.getIn(['metadata', 'profile']).toJS()
            : {};

        const website_label = website
            ? website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
            : null
        
        const isMyAccount = current_user === profile.get('name')

        let cover_image_style = {}
        if (cover_image) {
            if (cover_image.match(/\.(gif)$/) !== null) {
                cover_image_style = {
                backgroundImage: 'url(' + cover_image + ')'
                }
            } 
            else {
                cover_image_style = {
                backgroundImage:
                    'url(' + proxifyImageUrl(cover_image, '2048x512') + ')'
                }
            }
        }

        const vestingShares = profile.getIn(['stats', 'bp'], 0)
        const accountBp = parseInt(vestingShares)

        const rewardsMenu = [
            {
              link: `${walletUrl}/@${accountname}/curation-rewards`,
              label: tt('g.curation_rewards'),
              value: tt('g.curation_rewards')
            },
            {
              link: `${walletUrl}/@${accountname}/author-rewards`,
              label: tt('g.author_rewards'),
              value: tt('g.author_rewards')
            }
        ]
        const _url = (tab) => `/@${accountname}${tab == 'blog' ? '' : '/' + tab}`;
        const _tablink = (tab, label) => {
            return (
                <Link to={_url(tab)} activeClassName="active" >
                    {label}
                </Link>
            );
        };
        const top_menu = (
            <div className="row UserProfile__top-menu">
                <div className="columns small-9 medium-12 medium-expand">
                    <ul className="menu" style={{ flexWrap: 'wrap' }}>
                        <li>{_tablink('blog', tt('g.blog'))}</li>
                        <li>{_tablink('posts', tt('g.posts'))}</li>
                        <li>{_tablink('comments', tt('g.comments'))}</li>
                        <li>{_tablink('recent-replies', tt('g.replies'))}</li>
                        <li>{_tablink('info', tt('g.account_info'))}</li>
                        <li>{_tablink('communities', tt('g.communities'))}</li>
                        {(current_user === accountname) && (<li>{_tablink('notifications', tt('g.notifications'))}</li>)}
                        <DropdownMenu
                            items={rewardsMenu}
                            el="li"
                            selected={tt('g.rewards')}
                            position="right"
                        />
                    </ul>
                </div>
                <div className="columns shrink">
                    <ul className="menu" style={{ flexWrap: 'wrap' }}>
                        <li>
                            <a href={`${walletUrl}/@${accountname}`} target="_blank" rel="noopener noreferrer">
                                {tt('g.wallet')}
                            </a>
                        </li>
                        {isMyAccount && <li>{_tablink('settings', tt('g.settings'))}</li>}
                    </ul>
                </div>
            </div>
        );
    
        return (
            <div>
                <div className="UserProfile__banner row expanded">
                    <div className="column" style={cover_image_style}>
                        <div style={{ position: 'relative' }}>
                            <div className="UserProfile__buttons hide-for-small-only">
                                <Follow
                                    follower={current_user}
                                    following={accountname}
                                />
                            </div>
                        </div>
                        <h1>
                            <Userpic account={accountname} hideIfDefault />
                            {name || accountname}{' '}
                            <Tooltip
                                t={tt(
                                    'user_profile.this_is_users_reputations_score_it_is_based_on_history_of_votes',
                                    { name: accountname }
                                )}
                            >
                            </Tooltip>
                            <Blacklist author={accountname} />
                            {AffiliationMap[accountname]
                                ? (
                                    <span className="affiliation">
                                        {tt(
                                            'g.affiliation_' +
                                            AffiliationMap[accountname]
                                        )}
                                    </span>
                                )
                                : null}
                        </h1>
                        <div>
                            {about && <p className="UserProfile__bio">{about}</p>}
                            <div className="UserProfile__stats">
                                <span>
                                    <Link to={`/@${accountname}/followers`}>
                                        {tt('user_profile.follower_count', {
                                            count: profile.getIn(
                                                ['stats', 'followers'],
                                                0
                                            ),
                                        })}
                                    </Link>
                                </span>
                                <span>
                                    <Link to={`/@${accountname}`}>
                                        {tt('user_profile.post_count', {
                                            count: profile.get('post_count', 0),
                                        })}
                                    </Link>
                                </span>
                                <span>
                                    <Link to={`/@${accountname}/followed`}>
                                        {tt('user_profile.followed_count', {
                                            count: profile.getIn(
                                                ['stats', 'following'],
                                                0
                                            ),
                                        })}
                                    </Link>
                                </span>
                                <span>{accountBp} BP</span>
                                {(profile.get('balance') && typeof parseInt(profile.get('balance')) === 'number') 
                                    && <span>{parseInt(profile.get('balance'))} BLURT</span>}
                            </div>
                            <p className="UserProfile__info">
                                {location && (
                                    <span>
                                        <Icon name="location" /> {location}
                                    </span>
                                )}
                                {website && (
                                    <span>
                                        <Icon name="link" />{' '}
                                        <SanitizedLink
                                            url={website}
                                            text={website_label}
                                        />
                                    </span>
                                )}
                                <Icon name="calendar" />{' '}
                                <DateJoinWrapper date={profile.get('created')} />
                                <Icon name="calendar" />{' '}
                                Active <TimeAgoWrapper date={profile.get('active')} />
                            </p>
                        </div>
                        <div className="UserProfile__buttons_mobile show-for-small-only">
                            <Follow
                                follower={current_user}
                                following={accountname}
                                what="blog"
                            />
                        </div>
                    </div>
                </div>
                <div className="UserProfile__top-nav row expanded">{top_menu}</div>
            </div>
        );
    }
}

export default connect((state, props) => {
    const walletUrl = state.app.get('walletUrl');
    const username = state.user.get('current')
    const current_user = username ? username.get('username') : null
    return {
        accountname: props.accountname,
        profile: props.profile,
        current_user,
        walletUrl
    };
})(UserProfileHeader);
