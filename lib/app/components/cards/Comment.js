"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.sortComments = sortComments;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Author = _interopRequireDefault(require("app/components/elements/Author"));
var _ReplyEditor = _interopRequireDefault(require("app/components/elements/ReplyEditor"));
var _MarkdownViewer = _interopRequireDefault(require("app/components/cards/MarkdownViewer"));
var _shouldComponentUpdate = _interopRequireDefault(require("app/utils/shouldComponentUpdate"));
var _Voting = _interopRequireDefault(require("app/components/elements/Voting"));
var _reactRedux = require("react-redux");
var _reactRouter = require("react-router");
var userActions = _interopRequireWildcard(require("app/redux/UserReducer"));
var _TimeAgoWrapper = _interopRequireDefault(require("app/components/elements/TimeAgoWrapper"));
var _Userpic = _interopRequireDefault(require("app/components/elements/Userpic"));
var transactionActions = _interopRequireWildcard(require("app/redux/TransactionReducer"));
var _counterpart = _interopRequireDefault(require("counterpart"));
var _ParsersAndFormatters = require("app/utils/ParsersAndFormatters");
var _bytebuffer = require("bytebuffer");
var _StateFunctions = require("app/utils/StateFunctions");
var _ImageUserBlockList = _interopRequireDefault(require("app/utils/ImageUserBlockList"));
var _BadActorList = _interopRequireDefault(require("app/utils/BadActorList"));
var _constants = require("shared/constants");
var _ContentEditedWrapper = _interopRequireDefault(require("../elements/ContentEditedWrapper"));
var _Icon = _interopRequireDefault(require("../elements/Icon"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } /* eslint-disable jsx-a11y/click-events-have-key-events */ /* eslint-disable jsx-a11y/no-static-element-interactions */ /* eslint-disable react/jsx-one-expression-per-line */
// returns true if the comment has a 'hide' flag AND has no descendants w/ positive payout
function hideSubtree(cont, c) {
  return cont.getIn([c, 'stats', 'hide']) && !hasPositivePayout(cont, c);
}
function hasPositivePayout(postmap, post_url) {
  var post = postmap.get(post_url);
  if (parseFloat(post.get('net_rshares')) > 0) {
    return true;
  }
  if (post.get('replies').find(function (url) {
    return hasPositivePayout(postmap, url);
  })) {
    return true;
  }
  return false;
}
function sortComments(cont, comments, sort_order) {
  function netNegative(a) {
    return a.get('net_rshares') < 0;
  }
  function totalPayout(a) {
    return (0, _ParsersAndFormatters.parsePayoutAmount)(a.get('pending_payout_value')) + (0, _ParsersAndFormatters.parsePayoutAmount)(a.get('total_payout_value')) + (0, _ParsersAndFormatters.parsePayoutAmount)(a.get('curator_payout_value'));
  }
  function netRshares(a) {
    return _bytebuffer.Long.fromString(String(a.get('net_rshares')));
  }
  function countUpvotes(a) {
    return a.get('active_votes').filter(function (vote) {
      return vote.get('percent') > 0;
    }).size;
  }

  /** sorts replies by upvotes, age, or payout */
  var sort_orders = {
    votes: function votes(a, b) {
      var aactive = countUpvotes(cont.get(a));
      var bactive = countUpvotes(cont.get(b));
      return bactive - aactive;
    },
    "new": function _new(a, b) {
      var acontent = cont.get(a);
      var bcontent = cont.get(b);
      if (netNegative(acontent)) {
        return 1;
      } else if (netNegative(bcontent)) {
        return -1;
      }
      var aactive = Date.parse(acontent.get('created'));
      var bactive = Date.parse(bcontent.get('created'));
      return bactive - aactive;
    },
    trending: function trending(a, b) {
      var acontent = cont.get(a);
      var bcontent = cont.get(b);
      if (netNegative(acontent)) {
        return 1;
      } else if (netNegative(bcontent)) {
        return -1;
      }
      var apayout = totalPayout(acontent);
      var bpayout = totalPayout(bcontent);
      if (apayout !== bpayout) {
        return bpayout - apayout;
      }
      // If SBD payouts were equal, fall back to rshares sorting
      return netRshares(bcontent).compare(netRshares(acontent));
    }
  };
  comments.sort(sort_orders[sort_order]);
}
var CommentImpl = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(CommentImpl, _React$Component);
  function CommentImpl() {
    var _this;
    (0, _classCallCheck2["default"])(this, CommentImpl);
    _this = _callSuper(this, CommentImpl);
    _this.state = {
      collapsed: false,
      hide_body: false,
      highlight: false,
      isShareLinkCopied: false,
      revealNsfw: false
    };
    _this.onRevealNsfw = _this.onRevealNsfw.bind((0, _assertThisInitialized2["default"])(_this));
    _this.revealBody = _this.revealBody.bind((0, _assertThisInitialized2["default"])(_this));
    _this.shouldComponentUpdate = (0, _shouldComponentUpdate["default"])((0, _assertThisInitialized2["default"])(_this), 'Comment');
    _this.onShowReply = function () {
      var showReply = _this.state.showReply;
      _this.setState({
        showReply: !showReply,
        showEdit: false
      });
      _this.saveOnShow(!showReply ? 'reply' : null);
    };
    _this.onShowEdit = function () {
      var showEdit = _this.state.showEdit;
      _this.setState({
        showEdit: !showEdit,
        showReply: false
      });
      _this.saveOnShow(!showEdit ? 'edit' : null);
    };
    _this.saveOnShow = function (type) {
      if (process.env.BROWSER) {
        var cont = _this.props.cont;
        var content = cont.get(_this.props.content);
        var formId = content.get('author') + '/' + content.get('permlink');
        if (type) {
          localStorage.setItem('showEditor-' + formId, JSON.stringify({
            type: type
          }, null, 0));
        } else {
          localStorage.removeItem('showEditor-' + formId);
          localStorage.removeItem('replyEditorData-' + formId + '-reply');
          localStorage.removeItem('replyEditorData-' + formId + '-edit');
        }
      }
    };
    _this.saveOnShow = _this.saveOnShow.bind((0, _assertThisInitialized2["default"])(_this));
    _this.onDeletePost = function () {
      var _assertThisInitialize = (0, _assertThisInitialized2["default"])(_this),
        deletePost = _assertThisInitialize.props.deletePost;
      var content = _this.props.cont.get(_this.props.content);
      deletePost(content.get('author'), content.get('permlink'), _this.props.operation_flat_fee, _this.props.bandwidth_kbytes_fee);
    };
    _this.toggleCollapsed = _this.toggleCollapsed.bind((0, _assertThisInitialized2["default"])(_this));
    return _this;
  }
  (0, _createClass2["default"])(CommentImpl, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.initEditor(this.props);
      this._checkHide(this.props);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (window.location.hash == this.props.anchor_link) {
        this.setState({
          highlight: true
        }); // eslint-disable-line react/no-did-mount-set-state
      }
    }

    /**
     * - `hide` is based on author reputation, and will hide the entire post on initial render.
     * - `hide_body` is true when comment rshares OR author rep is negative.
     *    it hides the comment body (but not the header) until the "reveal comment" link is clicked.
     */
    // eslint-disable-next-line no-underscore-dangle
  }, {
    key: "_checkHide",
    value: function _checkHide(props) {
      var content = props.cont.get(props.content);
      if (content) {
        var hide = hideSubtree(props.cont, props.content);
        var gray = content.getIn(['stats', 'gray']);
        var author = content.get('author');
        var username = this.props.username;
        var notOwn = username !== author;
        if (hide) {
          var onHide = this.props.onHide;
          // console.log('Comment --> onHide')
          if (onHide) onHide();
        }
        this.setState({
          hide: hide,
          hide_body: notOwn && (hide || gray)
        });
      }
    }
  }, {
    key: "toggleCollapsed",
    value: function toggleCollapsed() {
      this.setState({
        collapsed: !this.state.collapsed
      });
    }
  }, {
    key: "onShareLink",
    value: function onShareLink(comment) {
      var _this2 = this;
      var _window = window,
        location = _window.location;
      var url = location.hostname === 'localhost' ? 'http://' + location.hostname + ':' + location.port : 'https://' + location.hostname;
      var commentUrl = url + '/@' + comment;
      if ('clipboard' in navigator) {
        navigator.clipboard.writeText(commentUrl).then(function () {
          _this2.setState({
            isShareLinkCopied: true
          });
          setTimeout(function () {
            _this2.setState({
              isShareLinkCopied: false
            });
          }, 2000);
        });
      } else {
        document.execCommand('copy', true, commentUrl);
        this.setState({
          isShareLinkCopied: true
        });
        setTimeout(function () {
          _this2.setState({
            isShareLinkCopied: false
          });
        }, 2000);
      }
    }
  }, {
    key: "revealBody",
    value: function revealBody() {
      this.setState({
        hide_body: false
      });
    }
  }, {
    key: "initEditor",
    value: function initEditor(props) {
      if (this.state.PostReplyEditor) return;
      var cont = this.props.cont;
      var content = cont.get(props.content);
      if (!content) return;
      var post = content.get('author') + '/' + content.get('permlink');
      var PostReplyEditor = (0, _ReplyEditor["default"])(post + '-reply');
      var PostEditEditor = (0, _ReplyEditor["default"])(post + '-edit');
      if (process.env.BROWSER) {
        var formId = post;
        var showEditor = localStorage.getItem('showEditor-' + formId);
        if (showEditor) {
          showEditor = JSON.parse(showEditor);
          if (showEditor.type === 'reply') {
            this.setState({
              showReply: true
            });
          }
          if (showEditor.type === 'edit') {
            this.setState({
              showEdit: true
            });
          }
        }
      }
      this.setState({
        PostReplyEditor: PostReplyEditor,
        PostEditEditor: PostEditEditor
      });
    }
  }, {
    key: "onRevealNsfw",
    value: function onRevealNsfw(e) {
      e.preventDefault();
      this.setState({
        revealNsfw: true
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var _this$props = this.props,
        cont = _this$props.cont,
        content = _this$props.content,
        authorMutedUsers = _this$props.authorMutedUsers,
        nsfwPref = _this$props.nsfwPref,
        nsfWPostsList = _this$props.nsfWPostsList;
      var _this$state = this.state,
        collapsed = _this$state.collapsed,
        isShareLinkCopied = _this$state.isShareLinkCopied;
      var dis = cont.get(content);
      if (!dis) {
        return /*#__PURE__*/_react["default"].createElement("div", null, (0, _counterpart["default"])('g.loading'), "...");
      }

      // Don't server-side render the comment if it has a certain number of newlines
      if (global.process !== undefined && (dis.get('body').match(/\r?\n/g) || '').length > 25) {
        return /*#__PURE__*/_react["default"].createElement("div", null, (0, _counterpart["default"])('g.loading'), "...");
      }
      var comment = dis.toJS();

      // nsfw check

      var isNsfw = false;
      if (comment.post_id && nsfWPostsList.filter(function (nsfwPost) {
        return nsfwPost.post_id === comment.post_id;
      }).length > 0) {
        isNsfw = true;
      }
      if (isNsfw && nsfwPref === 'hide') return null;
      if (!comment.stats) {
        console.error('Comment -- missing stats object');
        comment.stats = {};
      }
      var gray = comment.stats.gray;
      var authorRepLog10 = (0, _ParsersAndFormatters.repLog10)(comment.author_reputation);
      var author = comment.author,
        json_metadata = comment.json_metadata;
      var hideMuted = authorMutedUsers === undefined || authorMutedUsers.includes(comment.author);
      if (hideMuted) return null;
      var _this$props2 = this.props,
        username = _this$props2.username,
        depth = _this$props2.depth,
        anchor_link = _this$props2.anchor_link,
        showNegativeComments = _this$props2.showNegativeComments,
        ignore_list = _this$props2.ignore_list,
        noImage = _this$props2.noImage;
      var onShowReply = this.onShowReply,
        onShowEdit = this.onShowEdit,
        onDeletePost = this.onDeletePost;
      var post = comment.author + '/' + comment.permlink;
      var _this$state2 = this.state,
        PostReplyEditor = _this$state2.PostReplyEditor,
        PostEditEditor = _this$state2.PostEditEditor,
        showReply = _this$state2.showReply,
        showEdit = _this$state2.showEdit,
        hide = _this$state2.hide,
        hide_body = _this$state2.hide_body;
      var Editor = showReply ? PostReplyEditor : PostEditEditor;
      var rootComment = this.props.rootComment;
      if (!rootComment && depth === 1) {
        rootComment = comment.parent_author + '/' + comment.parent_permlink;
      }
      var comment_link = "/".concat(comment.category, "/@").concat(rootComment, "#@").concat(comment.author, "/").concat(comment.permlink);
      var ignore = ignore_list && ignore_list.has(comment.author);
      if (!showNegativeComments && (hide || ignore)) {
        return null;
      }
      var jsonMetadata = null;
      try {
        if (!showReply) jsonMetadata = JSON.parse(json_metadata);
      } catch (error) {
        // console.error('Invalid json metadata string', json_metadata, 'in post', this.props.content);
      }

      // hide images if author is in blacklist
      var hideImages = _ImageUserBlockList["default"].includes(author);
      var hideLinks = _BadActorList["default"].includes(author);
      var _isPaidout = comment.cashout_time === '1969-12-31T23:59:59'; // TODO: audit after HF19. #1259
      var showEditOption = username === author;
      var showDeleteOption = username === author && (0, _StateFunctions.allowDelete)(comment) && !_isPaidout;
      // const showReplyOption = username !== undefined && comment.depth < 255;
      var showReplyOption = username !== undefined && comment.depth < 255 && !authorMutedUsers.includes(username);
      var showReplyBlockedOption = username !== undefined && comment.depth < 255 && authorMutedUsers.includes(username);
      var body = null;
      var controls = null;
      if (!collapsed && !hide_body) {
        body = !isNsfw ? /*#__PURE__*/_react["default"].createElement(_MarkdownViewer["default"], {
          formId: post + '-viewer',
          text: comment.body,
          noImage: noImage || gray,
          hideImages: hideImages,
          hideLinks: hideLinks,
          jsonMetadata: jsonMetadata
        }) : /*#__PURE__*/_react["default"].createElement("div", null, !this.state.revealNsfw && /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("span", {
          className: "nsfw-flag"
        }, "nsfw"), " \xA0 \xA0", /*#__PURE__*/_react["default"].createElement("span", {
          role: "button",
          onClick: this.onRevealNsfw
        }, /*#__PURE__*/_react["default"].createElement("a", null, (0, _counterpart["default"])('postsummary_jsx.reveal_it'))), ' ', (0, _counterpart["default"])('g.or') + ' ', username ? /*#__PURE__*/_react["default"].createElement("span", null, (0, _counterpart["default"])('postsummary_jsx.adjust_your'), ' ', /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
          to: "/@".concat(username, "/settings")
        }, (0, _counterpart["default"])('postsummary_jsx.display_preferences')), ".") : /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("a", {
          href: _constants.SIGNUP_URL
        }, (0, _counterpart["default"])('postsummary_jsx.create_an_account')), ' ', (0, _counterpart["default"])('postsummary_jsx.to_save_your_preferences'), ".")), this.state.revealNsfw && /*#__PURE__*/_react["default"].createElement(_MarkdownViewer["default"], {
          formId: post + '-viewer',
          text: comment.body,
          noImage: noImage || gray,
          hideImages: hideImages,
          hideLinks: hideLinks,
          jsonMetadata: jsonMetadata
        }));
        var pricePerBlurt = this.props.pricePerBlurt;
        var total_payout = comment.total_payout_value ? (0, _ParsersAndFormatters.parsePayoutAmount)(comment.total_payout_value) : 0;
        if (comment.author_payout_value && comment.curator_payout_value) {
          total_payout = (0, _ParsersAndFormatters.parsePayoutAmount)(comment.author_payout_value) + (0, _ParsersAndFormatters.parsePayoutAmount)(comment.curator_payout_value);
        }
        var totalAmount = (0, _ParsersAndFormatters.parsePayoutAmount)(comment.pending_payout_value) + total_payout;
        var payoutValueInDollar = parseFloat(totalAmount * pricePerBlurt).toFixed(2);
        controls = /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_Voting["default"], {
          post: post
        }), /*#__PURE__*/_react["default"].createElement("span", {
          style: {
            borderRight: '1px solid #eee',
            paddingRight: '1rem'
          }
        }, /*#__PURE__*/_react["default"].createElement("b", {
          style: {
            color: '#F2652D'
          }
        }, "$", payoutValueInDollar)), /*#__PURE__*/_react["default"].createElement("span", {
          className: "Comment__footer__controls"
        }, showReplyOption && /*#__PURE__*/_react["default"].createElement("a", {
          onClick: onShowReply
        }, (0, _counterpart["default"])('g.reply')), ' ', showReplyBlockedOption && /*#__PURE__*/_react["default"].createElement("b", {
          title: "Author of this post has blocked you from commenting"
        }, "Reply Disabled"), showEditOption && /*#__PURE__*/_react["default"].createElement("a", {
          onClick: onShowEdit
        }, (0, _counterpart["default"])('g.edit')), ' ', showDeleteOption && /*#__PURE__*/_react["default"].createElement("a", {
          onClick: onDeletePost
        }, (0, _counterpart["default"])('g.delete'))));
      }
      var replies = null;
      if (!collapsed && comment.children > 0) {
        if (depth > 7) {
          var comment_permlink = "/".concat(comment.category, "/@").concat(comment.author, "/").concat(comment.permlink);
          replies = /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
            to: comment_permlink
          }, "Show ", comment.children, " more", ' ', comment.children == 1 ? 'reply' : 'replies');
        } else {
          replies = comment.replies;
          sortComments(cont, replies, this.props.comments_sort_order);
          // When a comment has hidden replies and is collapsed, the reply count is off
          // console.log("replies:", replies.length, "num_visible:", replies.filter( reply => !cont.get(reply).getIn(['stats', 'hide'])).length)
          replies = replies.map(function (reply, idx) {
            return /*#__PURE__*/_react["default"].createElement(Comment, {
              key: idx,
              authorMutedUsers: authorMutedUsers,
              content: reply,
              cont: cont,
              sort_order: _this3.props.comments_sort_order,
              depth: depth + 1,
              rootComment: rootComment,
              showNegativeComments: showNegativeComments,
              onHide: _this3.props.onHide
            });
          });
        }
      }
      var commentClasses = ['hentry'];
      commentClasses.push('Comment');
      commentClasses.push(this.props.root ? 'root' : 'reply');
      if (collapsed) commentClasses.push('collapsed');
      var innerCommentClass = 'Comment__block';
      if (ignore || gray) {
        innerCommentClass += ' downvoted clearfix';
        if (!hide_body) {
          innerCommentClass += ' revealed';
        }
      }
      if (this.state.highlight) innerCommentClass += ' highlighted';

      // console.log(comment);
      var renderedEditor = null;
      if (showReply || showEdit) {
        renderedEditor = /*#__PURE__*/_react["default"].createElement("div", {
          key: "editor"
        }, /*#__PURE__*/_react["default"].createElement(Editor, (0, _extends2["default"])({}, comment, {
          type: showReply ? 'submit_comment' : 'edit',
          successCallback: function successCallback() {
            _this3.setState({
              showReply: false,
              showEdit: false
            });
            _this3.saveOnShow(null);
          },
          onCancel: function onCancel() {
            _this3.setState({
              showReply: false,
              showEdit: false
            });
            _this3.saveOnShow(null);
          },
          jsonMetadata: jsonMetadata
        })));
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: commentClasses.join(' '),
        id: anchor_link,
        itemScope: true,
        itemType: "http://schema.org/comment"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: innerCommentClass
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "Comment__Userpic show-for-medium"
      }, /*#__PURE__*/_react["default"].createElement(_Userpic["default"], {
        account: comment.author
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: "Comment__header"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "Comment__header_collapse"
      }, /*#__PURE__*/_react["default"].createElement("a", {
        title: (0, _counterpart["default"])('g.collapse_or_expand'),
        onClick: this.toggleCollapsed
      }, collapsed ? '[+]' : '[-]')), /*#__PURE__*/_react["default"].createElement("span", {
        className: "Comment__header-user"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "Comment__Userpic-small"
      }, /*#__PURE__*/_react["default"].createElement(_Userpic["default"], {
        account: comment.author
      })), /*#__PURE__*/_react["default"].createElement(_Author["default"], {
        post: dis,
        author: comment.author,
        authorRepLog10: authorRepLog10,
        showAffiliation: true
      })), "\xA0 \xB7 \xA0", /*#__PURE__*/_react["default"].createElement(_reactRouter.Link, {
        to: comment_link,
        className: "PlainLink"
      }, /*#__PURE__*/_react["default"].createElement(_TimeAgoWrapper["default"], {
        date: comment.created
      })), "\xA0 \xB7 \xA0", isShareLinkCopied && /*#__PURE__*/_react["default"].createElement("b", null, /*#__PURE__*/_react["default"].createElement("a", {
        onClick: function onClick() {
          return _this3.onShareLink(post);
        }
      }, /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
        name: "link"
      }), " Copied !")), ' ', !isShareLinkCopied && /*#__PURE__*/_react["default"].createElement("a", {
        onClick: function onClick() {
          return _this3.onShareLink(post);
        }
      }, /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
        name: "link"
      })), ' ', /*#__PURE__*/_react["default"].createElement(_ContentEditedWrapper["default"], {
        createDate: comment.created,
        updateDate: comment.updated
      }), (collapsed || hide_body) && /*#__PURE__*/_react["default"].createElement(_Voting["default"], {
        post: post,
        showList: false
      }), collapsed && comment.children > 0 && /*#__PURE__*/_react["default"].createElement("span", {
        className: "marginLeft1rem"
      }, (0, _counterpart["default"])('g.reply_count', {
        count: comment.children
      })), !collapsed && hide_body && /*#__PURE__*/_react["default"].createElement("a", {
        className: "marginLeft1rem",
        onClick: this.revealBody
      }, (0, _counterpart["default"])('g.reveal_comment')), !collapsed && !hide_body && (ignore || gray) && /*#__PURE__*/_react["default"].createElement("span", null, "\xA0 \xB7 \xA0", ' ', (0, _counterpart["default"])('g.will_be_hidden_due_to_low_rating'))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "Comment__body entry-content"
      }, showEdit ? renderedEditor : body), /*#__PURE__*/_react["default"].createElement("div", {
        className: "Comment__footer"
      }, controls)), /*#__PURE__*/_react["default"].createElement("div", {
        className: "Comment__replies hfeed"
      }, showReply && renderedEditor, replies));
    }
  }]);
  return CommentImpl;
}(_react["default"].Component);
(0, _defineProperty2["default"])(CommentImpl, "propTypes", {
  // html props
  cont: _propTypes["default"].object.isRequired,
  content: _propTypes["default"].string.isRequired,
  sort_order: _propTypes["default"].oneOf(['votes', 'new', 'trending']).isRequired,
  root: _propTypes["default"].bool,
  showNegativeComments: _propTypes["default"].bool,
  onHide: _propTypes["default"].func,
  noImage: _propTypes["default"].bool,
  authorMutedUsers: _propTypes["default"].array,
  // muted users by author

  // component props (for recursion)
  depth: _propTypes["default"].number,
  // redux props
  username: _propTypes["default"].string,
  rootComment: _propTypes["default"].string,
  anchor_link: _propTypes["default"].string.isRequired,
  deletePost: _propTypes["default"].func.isRequired
});
(0, _defineProperty2["default"])(CommentImpl, "defaultProps", {
  depth: 1
});
var Comment = (0, _reactRedux.connect)(
// mapStateToProps
function (state, ownProps) {
  var content = ownProps.content;
  var username = state.user.getIn(['current', 'username']);
  var ignore_list = username ? state.global.getIn(['follow', 'getFollowingAsync', username, 'ignore_result']) : null;
  var userPreferences = state.app.get('user_preferences').toJS();
  var nsfwPref = userPreferences.nsfwPref || 'warn';
  var nsfWPostsList = state.offchain.get('nsfw').toJS().nsfw;
  return _objectSpread(_objectSpread({}, ownProps), {}, {
    anchor_link: '#@' + content,
    // Using a hash here is not standard but intentional; see issue #124 for details
    username: username,
    ignore_list: ignore_list,
    comments_sort_order: state.app.getIn(['user_preferences', 'defaultCommentsSortOrder'], 'new'),
    operation_flat_fee: state.global.getIn(['props', 'operation_flat_fee']),
    bandwidth_kbytes_fee: state.global.getIn(['props', 'bandwidth_kbytes_fee']),
    pricePerBlurt: state.global.getIn(['props', 'price_per_blurt']),
    nsfWPostsList: nsfWPostsList,
    nsfwPref: nsfwPref
  });
},
// mapDispatchToProps
function (dispatch) {
  return {
    unlock: function unlock() {
      dispatch(userActions.showLogin());
    },
    deletePost: function deletePost(author, permlink, operationFlatFee, bandwidthKbytesFee) {
      var operation = {
        author: author,
        permlink: permlink
      };
      var size = JSON.stringify(operation).replace(/[\[\]\,\"]/g, '').length;
      var bw_fee = Math.max(0.001, (size / 1024 * bandwidthKbytesFee).toFixed(3));
      var fee = (operationFlatFee + bw_fee).toFixed(3);
      dispatch(transactionActions.broadcastOperation({
        type: 'delete_comment',
        operation: operation,
        confirm: (0, _counterpart["default"])('g.operation_cost', {
          fee: fee
        })
      }));
    }
  };
})(CommentImpl);
var _default = exports["default"] = Comment;