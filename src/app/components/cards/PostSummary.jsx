import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import TimeAgoWrapper from 'app/components/elements/TimeAgoWrapper';
import Icon from 'app/components/elements/Icon';
import { connect } from 'react-redux';
import * as userActions from 'app/redux/UserReducer';
import Reblog from 'app/components/elements/Reblog';
import Voting from 'app/components/elements/Voting';
import { immutableAccessor } from 'app/utils/Accessors';
import extractContent from 'app/utils/ExtractContent';
import VotesAndComments from 'app/components/elements/VotesAndComments';
import { Map } from 'immutable';
import Author from 'app/components/elements/Author';
import TagList from 'app/components/elements/TagList';
import UserNames from 'app/components/elements/UserNames';
import tt from 'counterpart';
import ImageUserBlockList from 'app/utils/ImageUserBlockList';
import { proxifyImageUrl } from 'app/utils/ProxifyUrl';
import Userpic, { avatarSize } from 'app/components/elements/Userpic';
import { SIGNUP_URL } from 'shared/constants';
import { hasNsfwTag } from 'app/utils/StateFunctions';
import { repLog10, parsePayoutAmount } from 'app/utils/ParsersAndFormatters';
import readingTime from 'reading-time';

class PostSummary extends React.Component {
    static propTypes = {
        post: PropTypes.string.isRequired,
        pending_payout: PropTypes.string.isRequired,
        total_payout: PropTypes.string.isRequired,
        content: PropTypes.object.isRequired,
        featured: PropTypes.bool,
        promoted: PropTypes.bool,
        onClose: PropTypes.func,
        thumbSize: PropTypes.string,
        nsfwPref: PropTypes.string,
        nsfWPostsList: PropTypes.array,
    };

    constructor() {
        super();
        this.state = { revealNsfw: false };
        this.onRevealNsfw = this.onRevealNsfw.bind(this);
    }

    shouldComponentUpdate(props, state) {
        return (
            props.thumbSize !== this.props.thumbSize ||
            props.pending_payout !== this.props.pending_payout ||
            props.total_payout !== this.props.total_payout ||
            props.username !== this.props.username ||
            props.nsfwPref !== this.props.nsfwPref ||
            props.blogmode !== this.props.blogmode ||
            state.revealNsfw !== this.state.revealNsfw ||
            props.nsfWPostsList !== this.props.nsfWPostsList
        );
    }

    onRevealNsfw(e) {
        e.preventDefault();
        this.setState({ revealNsfw: true });
    }

    render() {
        const { thumbSize, ignore, hideCategory } = this.props;
        const { post, content, featured, promoted, onClose, nsfWPostsList } =
            this.props;
        const { account } = this.props;
        if (!content) return null;

        let reblogged_by;
        if (
            content.get('reblogged_by') &&
            content.get('reblogged_by').size > 0
        ) {
            reblogged_by = content.get('reblogged_by').toJS();
        }

        if (reblogged_by) {
            reblogged_by = (
                <div className="articles__resteem">
                    <p className="articles__resteem-text">
                        <span className="articles__resteem-icon">
                            <Icon name="reblog" />
                        </span>
                        <UserNames names={reblogged_by} />{' '}
                        {tt('postsummary_jsx.resteemed')}
                    </p>
                </div>
            );
        }

        // 'account' is the current blog being viewed, if applicable.
        if (account && account != content.get('author')) {
            reblogged_by = (
                <div className="articles__resteem">
                    <p className="articles__resteem-text">
                        <span className="articles__resteem-icon">
                            <Icon name="reblog" />
                        </span>
                        {tt('postsummary_jsx.resteemed')}
                    </p>
                </div>
            );
        }

        const { gray } = content.get('stats', Map()).toJS();
        const authorRepLog10 = repLog10(content.get('author_reputation'));
        // if user himself marked his post as NSFW
        let isNsfw = hasNsfwTag(content);
        // for explicit check in case user have not marked post NSFW
        if (isNsfw !== true) {
            const contentId = content.get('post_id');
            if (contentId &&
                nsfWPostsList.filter((nsfwPost) => nsfwPost.post_id === contentId)
                    .length > 0
            ) {
                isNsfw = true;
            }
        }

        const special = content.get('special');
        const p = extractContent(immutableAccessor, content);
        const desc = p.desc;

        // const archived = content.get('payout_at') === '1969-12-31T23:59:59'; // TODO: audit after HF17. #1259

        let post_url;
        let title_text;
        let comments_url;

        if (content.get('depth') > 0) {
            title_text = content.get('root_title') ? tt('g.re_to', { topic: content.get('root_title') }) : content.get('title');
            post_url =
                '/' +
                content.get('category') +
                '/@' +
                content.get('author') +
                '/' +
                content.get('permlink');
            comments_url = p.link + '#comments';
        } else {
            title_text = p.title;
            post_url = p.link;
            comments_url = post_url + '#comments';
        }

        const content_body = (
            <div className="PostSummary__body entry-content">
                <Link to={post_url}>{desc}</Link>
            </div>
        );
        const content_title = (
            <h2 className="articles__h2 entry-title">
                <Link to={post_url}>
                    {isNsfw && <span className="nsfw-flag">nsfw</span>}
                    {title_text}
                </Link>
                {featured && <span className="FeaturedTag">Featured</span>}
                {promoted && <span className="PromotedTag">Sponsored</span>}
            </h2>
        );

        // author and category
        const author_category = (
            <span className="vcard">
                <Userpic account={p.author} />
                <Author
                    post={content}
                    author={p.author}
                    authorRepLog10={authorRepLog10}
                    follow={false}
                    mute={false}
                />
                {} {tt('g.in')} <TagList post={p} single />
                &nbsp;•&nbsp;
                <Link to={post_url}>
                    <TimeAgoWrapper date={p.created} className="updated" />
                </Link>
            </span>
        );
        // New Post Summary heading
        const summary_header = (
            <div className="articles__summary-header">
                <div className="user">
                    {!isNsfw ? (
                        <div className="user__col user__col--left">
                            <a className="user__link" href={'/@' + p.author}>
                                <Userpic
                                    account={p.author}
                                    size={avatarSize.small}
                                />
                            </a>
                        </div>
                    ) : null}
                    <div className="user__col user__col--right">
                        <span className="user__name">
                            <Author
                                post={content}
                                author={p.author}
                                authorRepLog10={authorRepLog10}
                                follow={false}
                                mute={false}
                            />
                        </span>
                        {hideCategory || (
                            <span className="articles__tag-link">
                                {tt('g.in')}&nbsp;
                                <TagList post={p} single />
                                &nbsp;•&nbsp;
                            </span>
                        )}
                        <Link className="timestamp__link" to={post_url}>
                            <span className="timestamp__time">
                                <TimeAgoWrapper
                                    date={p.created}
                                    className="updated"
                                />
                            </span>
                        </Link>
                        <Link className="timestamp__link" to={post_url}>
                            <span className="timestamp__time">
                            &nbsp;•&nbsp; {readingTime(content.get('body')).text}
                            </span>
                            {content.getIn(['stats', 'is_pinned'], false) && (
                                <span className="FeaturedTag">{tt('g.pinned')}</span>
                            )}
                        </Link>
                    </div>

                    {(featured || promoted) && (
                        <a
                            onClick={onClose}
                            className="PostDismiss"
                            title="Dismiss Post"
                            role="button"
                        >
                            <Icon name="close" />
                        </a>
                    )}
                </div>
            </div>
        );

        // const content_footer = (
        //     <div className="PostSummary__footer">
        //         <Voting post={post} showList />
        //         <VotesAndComments post={post} commentsLink={comments_url} />
        //         <span className="PostSummary__time_author_category">
        //             <Reblog
        //                 author={p.author}
        //                 permlink={p.permlink}
        //                 parent_author={p.parent_author}
        //             />
        //             <span className="show-for-medium">{author_category}</span>
        //         </span>
        //     </div>
        // );

        const pending_payout_parsed = parsePayoutAmount(
            this.props.pending_payout
        );
        const total_payout_parsed = parsePayoutAmount(this.props.total_payout);
        const payoutValueInDollar = parseFloat(
            (total_payout_parsed < pending_payout_parsed
                ? pending_payout_parsed
                : total_payout_parsed) * this.props.pricePerBlurt
        ).toFixed(2);

        const summary_footer = (
            <div className="articles__summary-footer">
                <Voting post={post} showList />
                <VotesAndComments post={post} commentsLink={comments_url} />
                <span>
                    <b style={{ color: '#F2652D' }}>${payoutValueInDollar}</b>
                </span>
                <span className="PostSummary__time_author_category">
                    <Reblog
                        author={p.author}
                        permlink={p.permlink}
                        parent_author={p.parent_author}
                    />
                </span>
            </div>
        );

        const { nsfwPref, username } = this.props;
        const { revealNsfw } = this.state;

        if (isNsfw) {
            if (nsfwPref === 'hide') {
                // user wishes to hide these posts entirely
                return null;
            } else if (nsfwPref === 'warn' && !revealNsfw) {
                // user wishes to be warned, and has not revealed this post
                return (
                    <article
                        className="PostSummary hentry"
                        itemScope
                        itemType="http://schema.org/blogPost"
                    >
                        <div className="PostSummary__nsfw-warning">
                            {summary_header}
                            <span className="nsfw-flag">nsfw</span>&nbsp;&nbsp;
                            <span role="button" onClick={this.onRevealNsfw}>
                                <a>{tt('postsummary_jsx.reveal_it')}</a>
                            </span>{' '}
                            {tt('g.or') + ' '}
                            {username ? (
                                <span>
                                    {tt('postsummary_jsx.adjust_your')}{' '}
                                    <Link to={`/@${username}/settings`}>
                                        {tt(
                                            'postsummary_jsx.display_preferences'
                                        )}
                                    </Link>
                                    .
                                </span>
                            ) : (
                                <span>
                                    <a href={SIGNUP_URL}>
                                        {tt(
                                            'postsummary_jsx.create_an_account'
                                        )}
                                    </a>{' '}
                                    {tt(
                                        'postsummary_jsx.to_save_your_preferences'
                                    )}
                                    .
                                </span>
                            )}
                            {summary_footer}
                        </div>
                    </article>
                );
            }
        }

        const userBlacklisted = ImageUserBlockList.includes(p.author);

        let thumb = null;
        if (!gray && p.image_link && !userBlacklisted) {
            // on mobile, we always use blog layout style -- there's no toggler
            // on desktop, we offer a choice of either blog or list
            // if blogmode is false, output an image with a srcset
            // which has the 256x512 for whatever the large breakpoint is where the list layout is used
            // and the 768 for lower than that

            const blogSize = proxifyImageUrl(p.image_link, '800x640').replace(
                / /g,
                '%20'
            );

            if (this.props.blogmode) {
                thumb = (
                    <span className="articles__feature-img-container">
                        <img
                            style={{ minWidth: '310px !important' }}
                            className="articles__feature-img"
                            src={blogSize}
                            alt="thumbnail"
                        />
                    </span>
                );
            } else {
                const listSize = proxifyImageUrl(
                    p.image_link,
                    '130x77'
                ).replace(/ /g, '%20');
                thumb = (
                    <span className="articles__feature-img-container">
                        <picture className="articles__feature-img">
                            <source
                                srcSet={listSize}
                                media="(min-width: 760px)"
                            />
                            <source
                                srcSet={blogSize}
                                media="(max-width: 759px)"
                            />
                            <img srcSet={blogSize} alt="thumbnail" />
                        </picture>
                    </span>
                );
            }
        }

        // A post is hidden if it's marked "gray" or "ignore" and it's not
        // special.
        const commentClasses = [];
        if (!special && (gray || ignore)) commentClasses.push('downvoted'); // rephide

        return (
            <div className="articles__summary">
                {reblogged_by}
                {summary_header}
                <div
                    className={
                        'articles__content hentry' +
                        (thumb ? ' with-image ' : ' ') +
                        commentClasses.join(' ')
                    }
                    itemScope
                    itemType="http://schema.org/blogPost"
                >
                    {thumb ? (
                        <div className="articles__content-block articles__content-block--img"
                        style={{
                            display: 'flex',
                            justifyContent: 'center'
                            }}>
                            <Link className="articles__link" to={post_url}>
                                {thumb}
                            </Link>
                        </div>
                    ) : null}
                    <div className="articles__content-block articles__content-block--text">
                        {content_title}
                        {content_body}
                        {this.props.blogmode ? null : summary_footer}
                    </div>
                    {this.props.blogmode ? summary_footer : null}
                </div>
            </div>
        );
    }
}

export default connect(
    (state, props) => {
        const { post, hideCategory } = props;
        const content = state.global.get('content').get(post);
        let pending_payout = "0.000 BLURT";
        let total_payout = "0.000 BLURT";
        if (content) {
            pending_payout = content.get('pending_payout_value');
            if (content.get('total_payout_value')){
                total_payout = parsePayoutAmount(content.get('total_payout_value'))
            }
            if (content.get('author_payout_value') && content.get('curator_payout_value')) {
                total_payout = parsePayoutAmount(content.get('author_payout_value')) + parsePayoutAmount(content.get('curator_payout_value'));
            }
        }
        const nsfWPostsList = state.offchain.get('nsfw').toJS().nsfw;

        return {
            post,
            content,
            hideCategory,
            pending_payout: pending_payout ? pending_payout.toString() : pending_payout,
            total_payout: typeof total_payout === 'number' ? total_payout.toString() : total_payout,
            username:
                state.user.getIn(['current', 'username']) ||
                state.offchain.get('account'),
            blogmode:
                state.app.getIn(['user_preferences', 'blogmode']) === undefined
                    ? false
                    : state.app.getIn(['user_preferences', 'blogmode']),
            pricePerBlurt: state.global.getIn(['props', 'price_per_blurt']),
            nsfWPostsList,
        };
    },

    (dispatch) => ({
        dispatchSubmit: (data) => {
            dispatch(userActions.usernamePasswordLogin({ ...data }));
        },
        clearError: () => {
            dispatch(userActions.loginError({ error: null }));
        },
    })
)(PostSummary);
