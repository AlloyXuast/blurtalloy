import React from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';

import tt from 'counterpart';
import PropTypes from 'prop-types';
import NativeSelect from 'app/components/elements/NativeSelect';

const Topics = ({
    compact,
    className,
    username,
    topics,
    subscriptions,
    current,
    communities
    
}) => {
    
    if (compact) {
        const opt = (tag, label = null) => {
            if (tag && tag[0] === '@')
                return { value: `/@${username}/feed`, label: tt('header_jsx.my_friends') || tt('g.my_feed'), title: true };
            if (tag === 'my')
                return { value: `/trending/my`, label: tt('g.my_communities'), title: true };
            if (tag == 'explore')
                return { value: `/communities`, label: tt('g.explore_communities'), title: true };
            if (tag == 'tags')
                return { value: `/tags`, label: tt('g.trending_tags'), title: true };
            if (tag == 'subscriptions')
                return { value: `subscriptions`, label: tt('g.my_subscriptions'), disabled: true, title: true };
            if (tag)
                return { value: `/trending/${tag}`, label: label || '#' + tag };
            return { value: `/`, label: tt('g.all_posts'), title: true  };
        };

        const options = [];
        // Add 'All Posts' link.
        options.push(opt(null));
        options.push(opt('tags'));
        if (username && subscriptions) {
            // Add 'My Friends' Link
            options.push(opt('@' + username));
            // Add 'My Communities' Link
            options.push(opt('my'));
            const subscriptionOptions = subscriptions
                .toJS()
                .map(cat => opt(cat[0], cat[1]));
            options.push(...subscriptionOptions);
        }
        if (topics) {
            const topicsOptions = topics
                .toJS()
                .map(cat => opt(cat[0], cat[1]));
            options.push({ value: `/communities`, label: tt('g.explore_communities'), title: true });
            options.push(...topicsOptions);
        }

        const currOpt = opt(current);
        if (!options.find(opt => opt.value == currOpt.value)) {
            options.push(opt(current, communities.getIn([current, 'title'])));
        }

        return (
            <NativeSelect
                options={options}
                currentlySelected={currOpt.value}
                onChange={opt => {
                    browserHistory.push(opt.value);
                }}
            />
        );
    } 
    const link = (url, label, className = 'c-sidebar__header') => (
        <div className={className}>
            <Link
                to={url}
                className="c-sidebar__link"
                activeClassName="active"
            >
                {label}
            </Link>
        </div>
    );

    const moreLabel = <span>{tt('g.show_more_communities')}&hellip;</span>;
    const title =
        subscriptions && username
            ? 'My subscriptions'
            : 'Trending Communities';
    const commsHead = (
        <div style={{ color: '#aaa', paddingTop: '0em', fontSize: '1.15rem' }}>{title}</div>
    );

    const list = (
        <ul className="c-sidebar__list">
            {username && <li>{link('/trending/my', 'My communities')}</li>}
            {(subscriptions || topics).size > 0 && <li>{commsHead}</li>}
            {username
                && subscriptions
                && subscriptions.toJS().map((cat, index) => (
                    <li key={`${index}-${cat[0]}`} style={{ fontSize: '0.9rem' }}>
                        {link(`/trending/${cat[0]}`, cat[1], '')}
                    </li>
                ))}
            {(!username || !subscriptions)
                && topics.toJS().map((cat, index) => (
                    <li key={`${cat[0]}-${index}`} style={{ fontSize: '0.9rem' }}>
                        {link(`/trending/${cat[0]}`, cat[1], '')}
                    </li>
                )
            )}
            <li>
                {link('/communities', moreLabel, 'c-sidebar__link--emphasis'
                )}
            </li>
        </ul>
    );

    return (
        <div className="c-sidebar__module">
            <div className="c-sidebar__content">{list}</div>
        </div>
    );
};

Topics.propTypes = {
    compact: PropTypes.bool.isRequired,
    topics: PropTypes.object.isRequired,
    subscriptions: PropTypes.object,
    current: PropTypes.string,
    username: PropTypes.string,
};

Topics.defaultProps = {
    current: '',
};

export default connect(
    // mapStateToProps
    (state, ownProps) => ({
        ...ownProps,
        communities: state.global.get('community'),
    })
)(Topics);