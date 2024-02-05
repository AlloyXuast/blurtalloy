import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {Map} from 'immutable'
import { actions as fetchDataSagaActions } from 'app/redux/FetchDataSaga';
class PostCategoryHeader extends React.Component {

    componentWillMount() {
        const { communityName, getCommunity, community } = this.props;
        if (communityName && !community && /^blurt-[0-9]*$/.test(communityName)) getCommunity(communityName);
    }

    componentDidUpdate(prevProps) {
        const { communityName, getCommunity, community } = this.props;
        if (prevProps.communityName != communityName) {
            if (communityName && !community && /^blurt-[0-9]*$/.test(communityName)) getCommunity(communityName);
        }
    }
    render() {
        const { username, communityName, community } = this.props;
        const url = community ? '/trending/' + community.get('name') : null;
        const label = community ? (
            <Link to={url}>{community.get('title')}</Link>
        ) : (
            `@${username}'s blog`
        );

        return (
            <div className="PostCategoryHeader column small-12 ">
                <div className="postTo">
                    <small>
                        Posting to {communityName ? 'Community: ' : ''}
                        <span className="smallLabel">{label}</span>
                    </small>
                </div>
            </div>
        );
    }
}

PostCategoryHeader.propTypes = {
    username: PropTypes.string.isRequired,
    communityName: PropTypes.string,
    communityTitle: PropTypes.string,
};

export default connect(
    (state, ownProps) => {
        const username = state.user.getIn(['current', 'username'], null);
        const community = ownProps.communityTitle && ownProps.communityName
            ? Map({ name: ownProps.communityName, title: ownProps.communityTitle })
            : state.global.getIn(
                ['community', ownProps.communityName],
                null
            )
        return {
            ...ownProps,
            community: community,
            username,
        };
    },
    dispatch => ({
        getCommunity: communityName => {
            return dispatch(fetchDataSagaActions.getCommunity(communityName));
        },
    })
)(PostCategoryHeader);