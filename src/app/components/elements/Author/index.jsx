/* eslint react/prop-types: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import shouldComponentUpdate from 'app/utils/shouldComponentUpdate';
import Icon from 'app/components/elements/Icon';
import { Link } from 'react-router';
import { authorNameAndRep } from 'app/utils/ComponentFormatters';
import AuthorDropdown from '../AuthorDropdown';
// import Reputation from 'app/components/elements/Reputation';
import normalizeProfile from 'app/utils/NormalizeProfile';
import AffiliationMap from 'app/utils/AffiliationMap';
import tt from 'counterpart';
import Overlay from 'react-overlays/lib/Overlay';
import { findDOMNode } from 'react-dom';
import UserTitle from 'app/components/elements/UserTitle';
import PromotedMember from '../PromotedMember';

import Blacklist from '../Blacklist';

const { string, bool, number } = PropTypes;

const closers = [];

const fnCloseAll = () => {
    var close;
    while ((close = closers.shift())) {
        close();
    }
};

class Author extends React.Component {
    static propTypes = {
        author: string.isRequired,
        hideEditor: bool,
        follow: bool,
        mute: bool,
        authorRepLog10: number,
        showAffiliation: bool,
        role: string,
        title: string,
        community: string,
    };
    static defaultProps = {
        follow: true,
        mute: true,
        showAffiliation: false,
        role: '',
        title: '',
        community: '',
    };

    constructor(...args) {
        super(...args);
        this.state = { show: false };
        this.toggle = this.toggle.bind(this);
        this.close = this.close.bind(this);
    }

    componentDidMount() {
        if (!this.authorProfileLink) {
            return;
        }
        const node = ReactDOM.findDOMNode(this.authorProfileLink);
        if (node.addEventListener) {
            node.addEventListener('click', this.toggle, false);
        } else {
            node.attachEvent('click', this.toggle, false);
        }
    }

    componentWillUnmount() {
        if (!this.authorProfileLink) {
            return;
        }
        const node = ReactDOM.findDOMNode(this.authorProfileLink);
        if (node.removeEventListener) {
            node.removeEventListener('click', this.toggle);
        } else {
            node.detachEvent('click', this.toggle);
        }
    }

    toggle = (e) => {
        if (!(e.metaKey || e.ctrlKey)) {
            e.preventDefault();
            e.stopPropagation();
            const show = !this.state.show;
            fnCloseAll();
            if (show) {
                this.setState({ show });
                closers.push(this.close);
            }
        }
    };

    close = () => {
        this.setState({
            show: false,
        });
    };

    shouldComponentUpdate = shouldComponentUpdate(this, 'Author');
    render() {
        const { 
            author, 
            follow, 
            mute, 
            authorRepLog10, 
            showAffiliation, 
            community,
            permlink,
            role,
            title,
        } =
            this.props; // html
        const { username } = this.props; // redux
        const { name, about } = this.props.account
            ? normalizeProfile(this.props.account.toJS())
            : {};

        const userTitle = (
            <span>
                {community && (
                    <UserTitle
                        username={username}
                        community={community}
                        author={author}
                        permlink={permlink}
                        role={role}
                        title={title}
                        hideEdit={this.props.hideEditor}
                    />
                )}
                {showAffiliation && AffiliationMap[author] ? (
                    <span className="affiliation">
                        {tt('g.affiliation_' + AffiliationMap[author])}
                    </span>
                ) : null}
            </span>
        );

        if (!(follow || mute) || username === author) {
            return (
                <span
                    className="author"
                    itemProp="author"
                    itemScope
                    itemType="http://schema.org/Person"
                >
                    <strong>
                        <Link to={'/@' + author}>{author}</Link>
                    </strong>{' '}
                    {/* <Reputation value={authorRepLog10} /> */}
                    <Blacklist author={author} />
                    <PromotedMember author={author} />
                    {showAffiliation && AffiliationMap[author] ? (
                        <span className="affiliation">
                            {tt('g.affiliation_' + AffiliationMap[author])}
                        </span>
                    ) : null}
                    {userTitle}
                </span>
            );
        }

        return (
            <span className="Author">
                <span
                    itemProp="author"
                    itemScope
                    itemType="http://schema.org/Person"
                >
                    <strong>
                        <Link
                            className="ptc"
                            ref={(link) => {
                                this.authorProfileLink = link;
                            }}
                            to={'/@' + author}
                        >
                            {author}
                            {/* <Reputation value={authorRepLog10} /> */}
                            {showAffiliation && AffiliationMap[author] ? (
                                <span className="affiliation">
                                    {tt(
                                        'g.affiliation_' +
                                            AffiliationMap[author]
                                    )}
                                </span>
                            ) : null}
                            <Icon name="dropdown-arrow" />
                        </Link>
                    </strong>
                    {userTitle}
                </span>
                <Overlay
                    show={this.state.show}
                    onHide={this.close}
                    placement="bottom"
                    container={this}
                    target={() => findDOMNode(this.target)}
                    rootClose
                >
                    <AuthorDropdown
                        author={author}
                        follow={follow}
                        mute={mute}
                        authorRepLog10={authorRepLog10}
                        name={name}
                        about={about}
                        username={username}
                    />
                </Overlay>
            </span>
        );
    }
}

import { connect } from 'react-redux';

export default connect((state, ownProps) => {
    const { post } = ownProps;
    const { author, authorRepLog10 } = ownProps;
    const username = state.user.getIn(['current', 'username']);
    const account = state.global.getIn(['accounts', author]);
    return {
        username,
        account,
        author,
        follow: typeof ownProps.follow === 'undefined' ? true : ownProps.follow,
        mute: typeof ownProps.mute === 'undefined' ? ownProps.follow : ownProps.mute,
        authorRepLog10,
        community: post.get('community'),
        permlink: post.get('permlink'), 
        role: post.get('author_role'),
        title: post.get('author_title'),
    };
})(Author);
