"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _ReactForm = _interopRequireDefault(require("app/utils/ReactForm"));
var transactionActions = _interopRequireWildcard(require("app/redux/TransactionReducer"));
var userActions = _interopRequireWildcard(require("app/redux/UserReducer"));
var _MarkdownViewer = _interopRequireDefault(require("app/components/cards/MarkdownViewer"));
var _CategorySelector = _interopRequireWildcard(require("app/components/cards/CategorySelector"));
var _PostCategoryBanner = _interopRequireDefault(require("app/components/elements/PostCategoryBanner"));
var _LoadingIndicator = _interopRequireDefault(require("app/components/elements/LoadingIndicator"));
var _shouldComponentUpdate = _interopRequireDefault(require("app/utils/shouldComponentUpdate"));
var _Tooltip = _interopRequireDefault(require("app/components/elements/Tooltip"));
var _PostCategoryHeader = _interopRequireDefault(require("app/components/elements/PostCategoryHeader"));
var _SanitizeConfig = _interopRequireWildcard(require("app/utils/SanitizeConfig"));
var _sanitizeHtml = _interopRequireDefault(require("sanitize-html"));
var _HtmlReady = _interopRequireDefault(require("shared/HtmlReady"));
var _reactRedux = require("react-redux");
var _immutable = require("immutable");
var _remarkable = require("remarkable");
var _reactDropzone = _interopRequireDefault(require("react-dropzone"));
var _counterpart = _interopRequireDefault(require("counterpart"));
require("emoji-mart/css/emoji-mart.css");
var _emojiMart2 = require("emoji-mart");
var _UserTemplates = require("app/utils/UserTemplates");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0, _defineProperty2["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); } /* eslint-disable react/require-default-props */ /* eslint-disable no-alert */ /* eslint-disable no-restricted-globals */ /* eslint-disable no-void */ /* eslint-disable no-restricted-syntax */ /* eslint-disable react/jsx-props-no-spreading */ /* eslint-disable jsx-a11y/click-events-have-key-events */ /* eslint-disable react/destructuring-assignment */ /* eslint-disable no-shadow */ /* eslint-disable react/static-property-placement */ /* eslint-disable jsx-a11y/no-static-element-interactions */ /* eslint-disable jsx-a11y/anchor-is-valid */ /* eslint-disable jsx-a11y/tabindex-no-positive */ /* eslint-disable react/no-string-refs */ /* eslint-disable no-useless-escape */ /* eslint-disable no-underscore-dangle */ /* eslint-disable arrow-parens */
var MAX_FILE_TO_UPLOAD = 10;
var imagesToUpload = [];
var remarkable = new _remarkable.Remarkable({
  html: true,
  breaks: true
});
var MAX_TAGS = 10;
var RTE_DEFAULT = false;
function allTags(userInput, originalCategory, hashtags) {
  // take space-delimited user input
  var tags = (0, _immutable.OrderedSet)(userInput ? userInput.trim().replace(/#/g, '').split(/ +/) : []);

  // remove original cat, if present
  if (originalCategory && /^[-a-z\d]+$/.test(originalCategory)) tags = tags["delete"](originalCategory);

  // append hashtags from post until limit is reached
  var tagged = (0, _toConsumableArray2["default"])(hashtags);
  while (tags.size < MAX_TAGS && tagged.length > 0) {
    tags = tags.add(tagged.shift());
  }
  return tags;
}
var ReplyEditor = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(ReplyEditor, _React$Component);
  function ReplyEditor(props) {
    var _this;
    (0, _classCallCheck2["default"])(this, ReplyEditor);
    _this = _callSuper(this, ReplyEditor);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "shouldComponentUpdate", (0, _shouldComponentUpdate["default"])((0, _assertThisInitialized2["default"])(_this), 'ReplyEditor'));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onPostDestinationChange", function (category, communityTitle) {
      var tags = _this.state.tags;
      var currentTags = tags.value.split(' ');
      if (/^blurt-[0-9]*$/.test(category) && /^blurt-[0-9]*$/.test(currentTags[0])) {
        currentTags[0] = category;
      } else {
        currentTags.unshift(category);
      }
      tags.props.onChange(currentTags.join(' '));
      _this.setState({
        community: category,
        communityTitle: communityTitle
      });
      console.log(_this.props.category, category, 'category-community-onPostDestinationChange');
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onTitleChange", function (e) {
      var value = e.target.value;
      // TODO block links in title (they do not make good permlinks)
      var hasMarkdown = /(?:\*[\w\s]*\*|\#[\w\s]*\#|_[\w\s]*_|~[\w\s]*~|\]\s*\(|\]\s*\[)/.test(value);
      _this.setState({
        titleWarn: hasMarkdown ? (0, _counterpart["default"])('reply_editor.markdown_not_supported') : ''
      });
      var title = _this.state.title;
      title.props.onChange(e);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onSummaryChange", function (e) {
      var value = e.target.value;
      // TODO block links in title (they do not make good permlinks)
      var hasMarkdown = /(?:\*[\w\s]*\*|\#[\w\s]*\#|_[\w\s]*_|~[\w\s]*~|\]\s*\(|\]\s*\[)/.test(value);
      _this.setState({
        summaryWarn: hasMarkdown ? (0, _counterpart["default"])('reply_editor.markdown_not_supported') : ''
      });
      var summary = _this.state.summary;
      summary.props.onChange(e);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onCancel", function (e) {
      if (e) e.preventDefault();
      var _this$props = _this.props,
        formId = _this$props.formId,
        onCancel = _this$props.onCancel,
        defaultPayoutType = _this$props.defaultPayoutType;
      var _this$state = _this.state,
        replyForm = _this$state.replyForm,
        body = _this$state.body;
      if (!body.value || confirm((0, _counterpart["default"])('reply_editor.are_you_sure_you_want_to_clear_this_form'))) {
        replyForm.resetForm();
        _this.setState({
          rte_value: stateFromHtml(_this.props.richTextEditor)
        });
        _this.setState({
          progress: {}
        });
        _this.props.setPayoutType(formId, defaultPayoutType);
        _this.props.setBeneficiaries(formId, []);
        if (onCancel) onCancel(e);
      }
    });
    // As rte_editor is updated, keep the (invisible) 'body' field in sync.
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onChange", function (rte_value) {
      _this.setState({
        rte_value: rte_value
      });
      var html = stateToHtml(rte_value);
      var body = _this.state.body;
      if (body.value !== html) body.props.onChange(html);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "toggleRte", function (e) {
      e.preventDefault();
      var state = {
        rte: !_this.state.rte
      };
      if (state.rte) {
        var body = _this.state.body;
        state.rte_value = isHtmlTest(body.value) ? stateFromHtml(_this.props.richTextEditor, body.value) : stateFromMarkdown(_this.props.richTextEditor, body.value);
      }
      _this.setState(state);
      localStorage.setItem('replyEditorData-rte', !_this.state.rte);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "showAdvancedSettings", function (e) {
      e.preventDefault();
      _this.props.setPayoutType(_this.props.formId, _this.props.payoutType);
      _this.props.setPostCategory(_this.props.formId, _this.state.community);
      _this.props.showAdvancedSettings(_this.props.formId);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "displayErrorMessage", function (message) {
      _this.setState({
        progress: {
          error: message
        }
      });
      setTimeout(function () {
        _this.setState({
          progress: {}
        });
      }, 6000); // clear message
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onDrop", function (acceptedFiles, rejectedFiles) {
      if (!acceptedFiles.length) {
        if (rejectedFiles.length) {
          _this.displayErrorMessage('Please insert only image files.');
          console.log('onDrop Rejected files: ', rejectedFiles);
        }
        return;
      }
      if (acceptedFiles.length > MAX_FILE_TO_UPLOAD) {
        _this.displayErrorMessage("Please upload up to maximum ".concat(MAX_FILE_TO_UPLOAD, " images."));
        console.log('onDrop too many files to upload');
        return;
      }
      for (var fi = 0; fi < acceptedFiles.length; fi += 1) {
        var acceptedFile = acceptedFiles[fi];
        var imageToUpload = {
          file: acceptedFile,
          temporaryTag: ''
        };
        imagesToUpload.push(imageToUpload);
      }
      _this.insertPlaceHolders();
      _this.uploadNextImage();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onOpenClick", function () {
      _this.dropzone.open();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "addEmoji", function (data) {
      _this.setState({
        showEmojiPicker: false
      });
      var body = _this.state.body;
      var selectionStart = _this.refs.postRef.selectionStart;
      var nativeEmoji = data["native"];

      // Insert the temporary tag where the cursor currently is
      body.props.onChange(body.value.substring(0, selectionStart) + nativeEmoji + body.value.substring(selectionStart, body.value.length));
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "toggleEmojiPicker", function () {
      var showEmojiPicker = _this.state.showEmojiPicker;
      _this.setState({
        showEmojiPicker: !showEmojiPicker
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onPasteCapture", function (e) {
      try {
        if (e.clipboardData) {
          var _iterator = _createForOfIteratorHelper(e.clipboardData.items),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var item = _step.value;
              if (item.kind === 'file' && /^image\//.test(item.type)) {
                var blob = item.getAsFile();
                imagesToUpload.push({
                  file: blob,
                  temporaryTag: ''
                });
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          _this.insertPlaceHolders();
          _this.uploadNextImage();
        } else {
          // http://joelb.me/blog/2011/code-snippet-accessing-clipboard-images-with-javascript/
          // contenteditable element that catches all pasted data
          _this.setState({
            noClipboardData: true
          });
        }
      } catch (error) {
        console.error('Error analyzing clipboard event', error);
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "uploadNextImage", function () {
      if (imagesToUpload.length > 0) {
        var nextImage = imagesToUpload.pop();
        _this.upload(nextImage);
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "insertPlaceHolders", function () {
      var imagesUploadCount = _this.state.imagesUploadCount;
      var body = _this.state.body;
      var selectionStart = _this.refs.postRef.selectionStart;
      var placeholder = '';
      for (var ii = 0; ii < imagesToUpload.length; ii += 1) {
        var imageToUpload = imagesToUpload[ii];
        if (imageToUpload.temporaryTag === '') {
          imagesUploadCount += 1;
          imageToUpload.temporaryTag = "![Uploading image #".concat(imagesUploadCount, "...]()");
          placeholder += "\n".concat(imageToUpload.temporaryTag, "\n");
        }
      }
      _this.setState({
        imagesUploadCount: imagesUploadCount
      });

      // Insert the temporary tag where the cursor currently is
      body.props.onChange(body.value.substring(0, selectionStart) + placeholder + body.value.substring(selectionStart, body.value.length));
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "upload", function (image) {
      var uploadImage = _this.props.uploadImage;
      _this.setState({
        progress: {
          message: (0, _counterpart["default"])('reply_editor.uploading')
        }
      });
      uploadImage(image.file, function (progress) {
        var body = _this.state.body;
        if (progress.url) {
          _this.setState({
            progress: {}
          });
          var url = progress.url;
          var imageMd = "![".concat(image.file.name, "](").concat(url, ")");
          // const { selectionStart, selectionEnd } = this.refs.postRef;
          body.props.onChange(body.value.replace(image.temporaryTag, imageMd));
          _this.uploadNextImage();
        } else if (Object.prototype.hasOwnProperty.call(progress, 'error')) {
          _this.displayErrorMessage(progress.error);
          var _imageMd = "![".concat(image.file.name, "](UPLOAD FAILED)");
          // Remove temporary image MD tag
          body.props.onChange(body.value.replace(image.temporaryTag, _imageMd));
        } else {
          _this.setState({
            progress: progress
          });
        }
      });
    });
    _this.state = {
      progress: {},
      communityTitle: null
    };
    _this.initForm(props);
    return _this;
  }
  (0, _createClass2["default"])(ReplyEditor, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var formId = this.props.formId;
      if (process.env.BROWSER) {
        // Check for rte editor preference
        var rte = this.props.isStory && JSON.parse(localStorage.getItem('replyEditorData-rte') || RTE_DEFAULT);
        var raw = null;

        // Process initial body value (if this is an edit)
        var body = this.state.body;
        if (body.value) {
          raw = body.value;
        }
        var postCommunity;
        // Check for draft data
        var draft = localStorage.getItem('replyEditorData-' + formId);
        if (draft) {
          draft = JSON.parse(draft);
          var _this$state2 = this.state,
            tags = _this$state2.tags,
            title = _this$state2.title,
            summary = _this$state2.summary,
            community = _this$state2.community;
          postCommunity = community;
          if (tags) {
            this.checkTagsCommunity(draft.tags);
            tags.props.onChange(draft.tags);
          }
          if (title) title.props.onChange(draft.title);
          if (summary) summary.props.onChange(draft.summary);
          if (draft.payoutType) {
            this.props.setPayoutType(formId, draft.payoutType);
          }
          if (draft.beneficiaries) {
            this.props.setBeneficiaries(formId, draft.beneficiaries);
          }
          if (draft.community) postCommunity = draft.community;
          raw = draft.body;
        }

        // If we have an initial body, check if it's html or markdown
        if (raw) {
          rte = isHtmlTest(raw);
        }

        // console.log("initial reply body:", raw || '(empty)')
        body.props.onChange(raw);
        this.setState(_objectSpread({
          rte: rte,
          rte_value: rte ? stateFromHtml(this.props.richTextEditor, raw) : null
        }, postCommunity && {
          community: postCommunity
        }));
      }

      // Overwrite category (even if draft loaded) if authoritative category was provided
      if (this.props.category) {
        if (this.state.tags) {
          this.state.tags.props.onChange(this.props.initialValues.tags);
        }
        this.checkTagsCommunity(this.props.category);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      setTimeout(function () {
        if (_this2.props.isStory) _this2.refs.titleRef.focus();else if (_this2.refs.postRef) _this2.refs.postRef.focus();else if (_this2.refs.rte) _this2.refs.rte._focus();
      }, 300);
    }
  }, {
    key: "componentWillUpdate",
    value: function componentWillUpdate(nextProps, nextState) {
      var _this3 = this;
      if (process.env.BROWSER) {
        var ts = this.state;
        var ns = nextState;
        var tp = this.props;
        var np = nextProps;

        // User Templates

        if (typeof nextProps.postTemplateName !== 'undefined' && nextProps.postTemplateName !== null) {
          var formId = tp.formId;
          if (nextProps.postTemplateName.indexOf('create_') === 0) {
            var username = tp.username;
            var body = ns.body,
              title = ns.title,
              summary = ns.summary,
              tags = ns.tags,
              community = ns.community;
            var payoutType = np.payoutType,
              beneficiaries = np.beneficiaries;
            var userTemplates = (0, _UserTemplates.loadUserTemplates)(username);
            var newTemplateName = nextProps.postTemplateName.replace('create_', '');
            var newTemplate = {
              name: nextProps.postTemplateName.replace('create_', ''),
              beneficiaries: beneficiaries,
              payoutType: payoutType,
              markdown: body !== undefined ? body.value : '',
              title: title !== undefined ? title.value : '',
              summary: summary !== undefined ? summary.value : '',
              // altAuthor: altAuthor !== undefined ? altAuthor.value : '',
              tags: tags !== undefined ? tags.value : '',
              community: community ? community : ''
            };
            var updated = false;
            for (var ui = 0; ui < userTemplates.length; ui += 1) {
              if (userTemplates[ui].name === newTemplateName) {
                userTemplates[ui] = newTemplate;
                updated = true;
              }
            }
            if (updated === false) {
              userTemplates.push(newTemplate);
            }
            (0, _UserTemplates.saveUserTemplates)(username, userTemplates);
            this.props.setPostTemplateName(formId, null);
          } else {
            var _userTemplates = (0, _UserTemplates.loadUserTemplates)(nextProps.username);
            for (var ti = 0; ti < _userTemplates.length; ti += 1) {
              var template = _userTemplates[ti];
              if (template.name === nextProps.postTemplateName) {
                this.state.body.props.onChange(template.markdown);
                this.state.title.props.onChange(template.title);
                this.state.summary.props.onChange(template.summary);
                // this.state.altAuthor.props.onChange(template.altAuthor);
                this.state.tags.props.onChange(template.tags);
                this.props.setPayoutType(formId, template.payoutType);
                this.props.setBeneficiaries(formId, template.beneficiaries);
                this.props.setPostTemplateName(formId, null);
                break;
              }
            }
          }
        }

        // Save curent draft to localStorage
        if (ts.body.value !== ns.body.value || ns.summary && ts.summary.value !== ns.summary.value || ns.tags && ts.tags.value !== ns.tags.value || ns.community && ts.community.value !== ns.community.value || np.category !== tp.category || ns.title && ts.title.value !== ns.title.value || np.payoutType !== tp.payoutType || np.beneficiaries !== tp.beneficiaries) {
          // also prevents saving after parent deletes this information
          // eslint-disable-next-line no-unused-vars
          var _formId = np.formId,
            _payoutType = np.payoutType,
            _beneficiaries = np.beneficiaries,
            category = np.category;
          var _tags = ns.tags,
            _title = ns.title,
            _body = ns.body,
            _summary = ns.summary,
            _community = ns.community;
          var data = {
            formId: _formId,
            title: _title ? _title.value : undefined,
            tags: _tags ? _tags.value : undefined,
            body: _body.value,
            payoutType: _payoutType,
            beneficiaries: _beneficiaries,
            community: _community,
            category: _community,
            summary: _summary ? _summary.value : undefined
          };
          clearTimeout(saveEditorTimeout);
          saveEditorTimeout = setTimeout(function () {
            // console.log('save formId', formId, body.value)
            localStorage.setItem('replyEditorData-' + _formId, JSON.stringify(data, null, 0));
            _this3.showDraftSaved();
          }, 500);
        }
        if (ns.tags && ts.tags && ts.tags.value !== ns.tags.value) {
          this.checkTagsCommunity(ns.tags.value);
        }
      }
    }
  }, {
    key: "checkTagsCommunity",
    value: function checkTagsCommunity(tagsInput) {
      var community = null;
      if (tagsInput) {
        var primary = tagsInput.split(' ')[0];
        if (primary.substring(0, 6) === 'blurt-') {
          community = primary;
        }
      }
      this.setState({
        community: community
      });
      console.log(this.props.category, community, 'category-community-checkTagsCommunity');
    }
  }, {
    key: "initForm",
    value: function initForm(props) {
      var isStory = props.isStory,
        type = props.type,
        fields = props.fields;
      var isEdit = type === 'edit';
      var maxKb = isStory ? 65 : 16;
      var markdownRegex = /(?:\*[\w\s]*\*|#[\w\s]*#|_[\w\s]*_|~[\w\s]*~|]\s*\(|]\s*\[)/;
      var htmlTagRegex = /<\/?[\w\s="/.':;#-/?]+>/gi;
      (0, _ReactForm["default"])({
        fields: fields,
        instance: this,
        name: 'replyForm',
        initialValues: props.initialValues,
        validation: function validation(values) {
          return {
            title: isStory && (!values.title || values.title.trim() === '' ? (0, _counterpart["default"])('g.required') : values.title.length > 255 ? (0, _counterpart["default"])('reply_editor.shorten_title') : null),
            tags: isStory && (0, _CategorySelector.validateCategory)(values.tags, !isEdit),
            body: !values.body ? (0, _counterpart["default"])('g.required') : values.body.length > maxKb * 1024 ? (0, _counterpart["default"])('reply_editor.exceeds_maximum_length', {
              maxKb: maxKb
            }) : null,
            summary: isStory && (values.summary.length > 140 ? (0, _counterpart["default"])('reply_editor.shorten_summary') : markdownRegex.test(values.summary) ? (0, _counterpart["default"])('reply_editor.markdown_not_supported') : htmlTagRegex.test(values.summary) ? (0, _counterpart["default"])('reply_editor.html_not_supported') : null)
          };
        }
      });
    }
  }, {
    key: "showDraftSaved",
    value: function showDraftSaved() {
      try {
        // this.refs = React.createRef();
        var draft = this.refs.draft;
        draft.className = 'ReplyEditor__draft';
        void draft.offsetWidth; // reset animation
        draft.className = 'ReplyEditor__draft ReplyEditor__draft-saved';
      } catch (err) {
        // do nothing
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;
      var originalPost = {
        category: this.state.community,
        body: this.props.body
      };
      var onCancel = this.onCancel,
        onTitleChange = this.onTitleChange,
        onSummaryChange = this.onSummaryChange;
      var summary = this.state.summary;
      var _this$state3 = this.state,
        title = _this$state3.title,
        tags = _this$state3.tags,
        body = _this$state3.body,
        community = _this$state3.community,
        communityTitle = _this$state3.communityTitle;
      var _this$props2 = this.props,
        reply = _this$props2.reply,
        username = _this$props2.username,
        isStory = _this$props2.isStory,
        formId = _this$props2.formId,
        noImage = _this$props2.noImage,
        author = _this$props2.author,
        permlink = _this$props2.permlink,
        parent_author = _this$props2.parent_author,
        parent_permlink = _this$props2.parent_permlink,
        type = _this$props2.type,
        jsonMetadata = _this$props2.jsonMetadata,
        state = _this$props2.state,
        successCallback = _this$props2.successCallback,
        defaultPayoutType = _this$props2.defaultPayoutType,
        payoutType = _this$props2.payoutType,
        beneficiaries = _this$props2.beneficiaries;
      var _this$state$replyForm = this.state.replyForm,
        submitting = _this$state$replyForm.submitting,
        valid = _this$state$replyForm.valid,
        handleSubmit = _this$state$replyForm.handleSubmit;
      var _this$state4 = this.state,
        postError = _this$state4.postError,
        titleWarn = _this$state4.titleWarn,
        rte = _this$state4.rte,
        summaryWarn = _this$state4.summaryWarn;
      var _this$state5 = this.state,
        progress = _this$state5.progress,
        noClipboardData = _this$state5.noClipboardData;
      var disabled = submitting || !valid;
      var loading = submitting || this.state.loading;
      var errorCallback = function errorCallback(estr) {
        _this4.setState({
          postError: estr,
          loading: false
        });
      };
      var successCallbackWrapper = function successCallbackWrapper() {
        _this4.props.setPayoutType(formId, defaultPayoutType);
        _this4.props.setBeneficiaries(formId, []);
        // clear draft
        var replyForm = _this4.state.replyForm;
        localStorage.removeItem('replyEditorData-' + formId);
        replyForm.resetForm();
        // eslint-disable-next-line react/no-access-state-in-setstate
        var bodyUpdate = _objectSpread({}, _this4.state.body);
        bodyUpdate.value = '';
        _this4.setState({
          body: bodyUpdate,
          title: '',
          loading: false,
          summary: ''
        });
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        if (successCallback) successCallback(args);
      };
      var isEdit = type === 'edit';
      var isHtml = rte || isHtmlTest(body.value);
      var replyParams = {
        author: author,
        permlink: permlink,
        parent_author: parent_author,
        parent_permlink: parent_permlink,
        type: type,
        state: state,
        originalPost: originalPost,
        isHtml: isHtml,
        isStory: isStory,
        jsonMetadata: jsonMetadata,
        payoutType: payoutType,
        beneficiaries: beneficiaries,
        successCallback: successCallbackWrapper,
        errorCallback: errorCallback
      };
      var postLabel = username ? /*#__PURE__*/_react["default"].createElement(_Tooltip["default"], {
        t: (0, _counterpart["default"])('g.post_as_user', {
          username: username
        })
      }, (0, _counterpart["default"])('g.post')) : (0, _counterpart["default"])('g.post');
      var hasTitleError = title && title.touched && title.error;
      var titleError = null;
      // The Required title error (triggered onBlur) can shift the form making it hard to click on things..
      if (hasTitleError && (title.error !== (0, _counterpart["default"])('g.required') || body.value !== '') || titleWarn) {
        titleError = /*#__PURE__*/_react["default"].createElement("div", {
          className: hasTitleError ? 'error' : 'warning'
        }, hasTitleError ? title.error : titleWarn, "\xA0");
      }
      var hasSummaryError = summary && summary.touched && summary.error;
      var summaryError = null;
      // The Required title error (triggered onBlur) can shift the form making it hard to click on things..
      if (hasSummaryError && (summary.error !== (0, _counterpart["default"])('g.required') || body.value !== '') || summaryWarn) {
        summaryError = /*#__PURE__*/_react["default"].createElement("div", {
          className: hasSummaryError ? 'error' : 'warning'
        }, hasSummaryError ? summary.error : summaryWarn, "\xA0");
      }

      // TODO: remove all references to these vframe classes. Removed from css and no longer needed.
      var vframe_class = isStory ? 'vframe' : '';
      var vframe_section_class = isStory ? 'vframe__section' : '';
      var vframe_section_shrink_class = isStory ? 'vframe__section--shrink' : '';
      var RichTextEditor = this.props.richTextEditor;

      // Cover Image Selection Code
      var selectedCoverImage = '';
      if (jsonMetadata && jsonMetadata.image) {
        var jsonMetadataImages = jsonMetadata.image;
        if (jsonMetadataImages && jsonMetadataImages.length > 0) {
          // eslint-disable-next-line prefer-destructuring
          selectedCoverImage = jsonMetadataImages[0];
        }
      }
      if (!summary && jsonMetadata && jsonMetadata.description) {
        summary = jsonMetadata.description;
      }
      var onSelectCoverImage = function onSelectCoverImage(event) {
        var target = event.target;
        var postImages = document.getElementsByClassName('ReplyEditor__options__image_selector__image_container');
        for (var pi = 0; pi < postImages.length; pi += 1) {
          var postImage = postImages[pi];
          postImage.classList.remove('selected');
        }
        target.classList.add('selected');
        selectedCoverImage = target.style.backgroundImage.slice(4, -1).replace(/"/g, '');
      };
      var rtags;
      {
        var html = isHtml ? body : remarkable.render(body.value);
        rtags = (0, _HtmlReady["default"])(html, {
          mutate: false
        });
      }
      var categoryValue = community && /^blurt-[0-9]*$/.test(community) ? 1 : 0;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "ReplyEditor row"
      }, isStory && !isEdit && username && /*#__PURE__*/_react["default"].createElement(_PostCategoryHeader["default"], {
        communityName: community,
        communityTitle: communityTitle,
        username: username
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: "column small-12"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        ref: "draft",
        className: "ReplyEditor__draft ReplyEditor__draft-hide"
      }, (0, _counterpart["default"])('reply_editor.draft_saved')), /*#__PURE__*/_react["default"].createElement("form", {
        className: vframe_class,
        onSubmit: handleSubmit(function (_ref) {
          var data = _ref.data;
          var startLoadingIndicator = function startLoadingIndicator() {
            return _this4.setState({
              loading: true,
              postError: undefined
            });
          };
          reply(_objectSpread(_objectSpread(_objectSpread({}, data), replyParams), {}, {
            startLoadingIndicator: startLoadingIndicator,
            selectedCoverImage: selectedCoverImage
          }));
        }),
        onChange: function onChange() {
          _this4.setState({
            postError: null
          });
        }
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: vframe_section_shrink_class
      }, isStory && /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("input", (0, _extends2["default"])({
        type: "text",
        className: "ReplyEditor__title",
        onChange: onTitleChange,
        disabled: loading,
        placeholder: (0, _counterpart["default"])('reply_editor.title'),
        autoComplete: "off",
        ref: "titleRef",
        tabIndex: 1
      }, title.props)), /*#__PURE__*/_react["default"].createElement("div", {
        className: "float-right secondary",
        style: {
          marginRight: '1rem'
        }
      }, rte && /*#__PURE__*/_react["default"].createElement("a", {
        href: "#",
        onClick: this.toggleRte
      }, body.value ? 'Raw HTML' : 'Markdown'), !rte && (isHtml || !body.value) && /*#__PURE__*/_react["default"].createElement("a", {
        href: "#",
        onClick: this.toggleRte
      }, (0, _counterpart["default"])('reply_editor.editor'))), titleError)), /*#__PURE__*/_react["default"].createElement("div", {
        className: 'ReplyEditor__body ' + (rte ? "rte ".concat(vframe_section_class) : vframe_section_shrink_class)
      }, process.env.BROWSER && rte ? /*#__PURE__*/_react["default"].createElement(RichTextEditor, {
        ref: "rte",
        readOnly: loading,
        value: this.state.rte_value,
        onChange: this.onChange,
        onBlur: body.onBlur,
        tabIndex: 2
      }) : /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement(_reactDropzone["default"], {
        onDrop: this.onDrop,
        className: type === 'submit_story' ? 'dropzone' : 'none',
        disableClick: true,
        multiple: true,
        accept: "image/*",
        ref: function ref(node) {
          _this4.dropzone = node;
        }
      }, /*#__PURE__*/_react["default"].createElement("textarea", (0, _extends2["default"])({}, body.props, {
        ref: "postRef",
        onPasteCapture: this.onPasteCapture,
        className: type === 'submit_story' ? 'upload-enabled' : '',
        disabled: loading,
        rows: isStory ? 10 : 6,
        placeholder: isStory ? (0, _counterpart["default"])('g.write_your_story') : (0, _counterpart["default"])('g.reply'),
        autoComplete: "off",
        tabIndex: 2
      }))), /*#__PURE__*/_react["default"].createElement("p", {
        className: "drag-and-drop"
      }, /*#__PURE__*/_react["default"].createElement("a", {
        type: "button",
        onClick: this.toggleEmojiPicker
      }, /*#__PURE__*/_react["default"].createElement(_emojiMart2.Emoji, {
        emoji: {
          id: 'smiley',
          skin: 2
        },
        size: 28
      })), "\xA0 |", (0, _counterpart["default"])('reply_editor.insert_images_by_dragging_dropping'), noClipboardData ? '' : (0, _counterpart["default"])('reply_editor.pasting_from_the_clipboard'), (0, _counterpart["default"])('reply_editor.or_by'), ' ', /*#__PURE__*/_react["default"].createElement("a", {
        onClick: this.onOpenClick
      }, (0, _counterpart["default"])('reply_editor.selecting_them')), "."), progress.message && /*#__PURE__*/_react["default"].createElement("div", {
        className: "info"
      }, progress.message), progress.error && /*#__PURE__*/_react["default"].createElement("div", {
        className: "error"
      }, (0, _counterpart["default"])('reply_editor.image_upload'), " :", ' ', progress.error))), /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement("div", {
        className: vframe_section_shrink_class
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "text-center"
      }, this.state.showEmojiPicker && /*#__PURE__*/_react["default"].createElement(_emojiMart2.Picker, {
        onSelect: this.addEmoji
      }))), /*#__PURE__*/_react["default"].createElement("div", {
        className: vframe_section_shrink_class
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "error"
      }, body.touched && body.error && body.error !== 'Required' && body.error)), /*#__PURE__*/_react["default"].createElement("div", {
        className: vframe_section_shrink_class,
        style: {
          marginTop: '0.5rem'
        }
      }, isStory && /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("input", (0, _extends2["default"])({}, summary.props, {
        type: "text",
        className: "ReplyEditor__summary",
        onChange: onSummaryChange,
        disabled: loading,
        placeholder: (0, _counterpart["default"])('reply_editor.summary'),
        autoComplete: "off",
        ref: "summaryRef",
        tabIndex: 0
      }))), summaryError), /*#__PURE__*/_react["default"].createElement("div", {
        className: vframe_section_shrink_class,
        style: {
          marginTop: '0.5rem'
        }
      }, isStory && /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement(_CategorySelector["default"], (0, _extends2["default"])({}, tags.props, {
        onChange: tags.props.onChange,
        disabled: loading,
        isEdit: isEdit,
        tabIndex: 0
      })), (tags.touched || tags.value) && /*#__PURE__*/_react["default"].createElement("div", {
        className: "error"
      }, tags.error, ' '))), isStory && /*#__PURE__*/_react["default"].createElement("div", null, Array.from(rtags.images).length > 0 && /*#__PURE__*/_react["default"].createElement("div", {
        className: "ReplyEditor__options__cover_image_selector"
      }, /*#__PURE__*/_react["default"].createElement("h5", null, (0, _counterpart["default"])('reply_editor.select_cover_image'), ":"), /*#__PURE__*/_react["default"].createElement("div", {
        className: "ReplyEditor__options__image_selector"
      }, Array.from(rtags.images).map(function (image) {
        return (
          /*#__PURE__*/
          // eslint-disable-next-line jsx-a11y/no-static-element-interactions
          _react["default"].createElement("div", {
            key: image,
            className: (0, _classnames["default"])('ReplyEditor__options__image_selector__image_container', {
              selected: image === selectedCoverImage
            }),
            style: {
              backgroundImage: "url(".concat(image, ")")
            },
            onClick: onSelectCoverImage
          })
        );
      })))), /*#__PURE__*/_react["default"].createElement("div", {
        className: vframe_section_shrink_class
      }, isStory && !isEdit && /*#__PURE__*/_react["default"].createElement("div", {
        className: "ReplyEditor__options"
      }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", null, (0, _counterpart["default"])('g.rewards'), ': ', this.props.payoutType == '0%' && (0, _counterpart["default"])('reply_editor.decline_payout'), this.props.payoutType == '100%' && (0, _counterpart["default"])('reply_editor.power_up_100'), this.props.payoutType == '75%' && (0, _counterpart["default"])('reply_editor.power_up_25_75')), categoryValue !== 0 && /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("span", null, "3% beneficiary will be automatically added to @".concat(community))), /*#__PURE__*/_react["default"].createElement("div", null, beneficiaries && beneficiaries.length + categoryValue > 0 && /*#__PURE__*/_react["default"].createElement("span", null, (0, _counterpart["default"])('g.beneficiaries'), ': ', (0, _counterpart["default"])('reply_editor.beneficiaries_set', {
        count: beneficiaries.length + categoryValue
      }))), /*#__PURE__*/_react["default"].createElement("a", {
        href: "#",
        onClick: this.showAdvancedSettings
      }, (0, _counterpart["default"])('reply_editor.advanced_settings')), ' ', /*#__PURE__*/_react["default"].createElement("br", null), "\xA0"))), /*#__PURE__*/_react["default"].createElement("div", {
        className: vframe_section_shrink_class
      }, postError && /*#__PURE__*/_react["default"].createElement("div", {
        className: "error"
      }, postError)), /*#__PURE__*/_react["default"].createElement("div", {
        className: "".concat(vframe_section_shrink_class, " EditFooter")
      }, isStory && !isEdit && username && /*#__PURE__*/_react["default"].createElement(_PostCategoryBanner["default"], {
        category: community,
        username: username,
        onChange: this.onPostDestinationChange
      }), !loading && /*#__PURE__*/_react["default"].createElement("button", {
        type: "submit",
        className: "button",
        disabled: disabled,
        tabIndex: 4
      }, isEdit ? (0, _counterpart["default"])('reply_editor.update_post') : postLabel), loading && /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("br", null), /*#__PURE__*/_react["default"].createElement(_LoadingIndicator["default"], {
        type: "circle"
      })), !loading && this.props.onCancel && /*#__PURE__*/_react["default"].createElement("button", {
        type: "button",
        className: "secondary hollow button no-border",
        tabIndex: 5,
        onClick: onCancel
      }, (0, _counterpart["default"])('g.cancel')), !loading && !this.props.onCancel && /*#__PURE__*/_react["default"].createElement("button", {
        type: "button",
        className: "button hollow no-border",
        tabIndex: 5,
        disabled: submitting,
        onClick: onCancel
      }, (0, _counterpart["default"])('g.clear')), !isStory && !isEdit && this.props.payoutType != '100%' && /*#__PURE__*/_react["default"].createElement("div", {
        className: "ReplyEditor__options float-right text-right"
      }, (0, _counterpart["default"])('g.rewards'), ': ', this.props.payoutType == '0%' && (0, _counterpart["default"])('reply_editor.decline_payout'), '. ', /*#__PURE__*/_react["default"].createElement("a", {
        href: '/@' + username + '/settings'
      }, "Update settings")))), !loading && !rte && body.value && /*#__PURE__*/_react["default"].createElement("div", {
        className: 'Preview ' + vframe_section_shrink_class
      }, !isHtml && /*#__PURE__*/_react["default"].createElement("div", {
        className: "float-right"
      }, /*#__PURE__*/_react["default"].createElement("a", {
        target: "_blank",
        href: "https://guides.github.com/features/mastering-markdown/",
        rel: "noopener noreferrer"
      }, (0, _counterpart["default"])('reply_editor.markdown_styling_guide'))), /*#__PURE__*/_react["default"].createElement("h6", null, (0, _counterpart["default"])('g.preview')), /*#__PURE__*/_react["default"].createElement(_MarkdownViewer["default"], {
        text: body.value,
        jsonMetadata: jsonMetadata,
        large: isStory,
        noImage: noImage
      }))));
    }
  }]);
  return ReplyEditor;
}(_react["default"].Component);
(0, _defineProperty2["default"])(ReplyEditor, "propTypes", {
  // html component attributes
  formId: _propTypes["default"].string.isRequired,
  // unique form id for each editor
  type: _propTypes["default"].oneOf(['submit_story', 'submit_comment', 'edit']),
  successCallback: _propTypes["default"].func,
  // indicator that the editor is done and can be hidden
  onCancel: _propTypes["default"].func,
  // hide editor when cancel button clicked
  author: _propTypes["default"].string,
  // empty or string for top-level post
  permlink: _propTypes["default"].string,
  // new or existing category (default calculated from title)
  parent_author: _propTypes["default"].string,
  // empty or string for top-level post
  parent_permlink: _propTypes["default"].string,
  // new or existing category
  // eslint-disable-next-line react/forbid-prop-types
  jsonMetadata: _propTypes["default"].object,
  // An existing comment has its own meta data
  category: _propTypes["default"].string,
  // initial value
  title: _propTypes["default"].string,
  // initial value
  body: _propTypes["default"].string,
  // initial value
  richTextEditor: _propTypes["default"].func,
  defaultPayoutType: _propTypes["default"].string,
  payoutType: _propTypes["default"].string,
  summary: _propTypes["default"].string,
  postTemplateName: _propTypes["default"].string,
  isStory: _propTypes["default"].bool,
  community: _propTypes["default"].string
});
(0, _defineProperty2["default"])(ReplyEditor, "defaultProps", {
  isStory: false,
  author: '',
  parent_author: '',
  parent_permlink: '',
  type: 'submit_comment',
  community: 'blog'
});
var saveEditorTimeout;

// removes <html></html> wrapper if exists
function stripHtmlWrapper(text) {
  var m = text.match(/<html>\n*([\S\s]+?)?\n*<\/html>/m);
  return m && m.length === 2 ? m[1] : text;
}

// See also MarkdownViewer render
var isHtmlTest = function isHtmlTest(text) {
  return /^<html>/.test(text);
};
function stateToHtml(state) {
  var html = state.toString('html');
  if (html === '<p></p>') html = '';
  if (html === '<p><br></p>') html = '';
  if (html == '') return '';
  return "<html>\n".concat(html, "\n</html>");
}
function stateFromHtml(RichTextEditor) {
  var html = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  if (!RichTextEditor) return null;
  if (html) html = stripHtmlWrapper(html);
  if (html && html.trim() == '') html = null;
  return html ? RichTextEditor.createValueFromString(html, 'html') : RichTextEditor.createEmptyValue();
}
function stateFromMarkdown(RichTextEditor, markdown) {
  var html;
  if (markdown && markdown.trim() !== '') {
    html = remarkable.render(markdown);
    html = (0, _HtmlReady["default"])(html).html; // TODO: option to disable youtube conversion, @-links, img proxy
    //html = htmlclean(html) // normalize whitespace
    console.log('markdown converted to:', html);
  }
  return stateFromHtml(RichTextEditor, html);
}
var richTextEditor = process.env.BROWSER ? require('react-rte-image')["default"] : null;
var _default = exports["default"] = function _default(formId) {
  return (0, _reactRedux.connect)(
  // mapStateToProps
  function (state, ownProps) {
    var username = state.user.getIn(['current', 'username']);
    var fields = ['body'];
    var type = ownProps.type,
      parent_author = ownProps.parent_author,
      jsonMetadata = ownProps.jsonMetadata;
    var isEdit = type === 'edit';
    var isStory = /submit_story/.test(type) || isEdit && parent_author === '';
    if (isStory) {
      fields.push('title');
      fields.push('tags');
      fields.push('summary');
    }
    var category = ownProps.category,
      title = ownProps.title,
      body = ownProps.body,
      summary = ownProps.summary;
    if (/submit_/.test(type)) {
      title = '';
      body = '';
    }
    var query = state.routing.locationBeforeTransitions.query;
    if (query && query.category) {
      category = query.category;
    }
    var tags = category;
    if (isStory && jsonMetadata && jsonMetadata.tags) {
      tags = (0, _immutable.OrderedSet)([category].concat((0, _toConsumableArray2["default"])(jsonMetadata.tags))).join(' ');
    }
    var isNSFWCommunity = false;
    isNSFWCommunity = state.global.getIn(['community', category, 'is_nsfw']);
    if (isNSFWCommunity) {
      tags = "".concat(tags, " nsfw");
    }
    if (isStory && jsonMetadata && jsonMetadata.description) {
      summary = jsonMetadata.description;
    }
    var defaultPayoutType = state.app.getIn(['user_preferences', isStory ? 'defaultBlogPayout' : 'defaultCommentPayout'], '75%');
    var payoutType = state.user.getIn(['current', 'post', formId, 'payoutType']);
    if (!payoutType) {
      payoutType = defaultPayoutType;
    }
    var beneficiaries = state.user.getIn(['current', 'post', formId, 'beneficiaries']);
    beneficiaries = beneficiaries ? beneficiaries.toJS() : [];
    var postTemplateName = state.user.getIn(['current', 'post', formId, 'postTemplateName']);
    var ret = _objectSpread(_objectSpread({}, ownProps), {}, {
      category: category,
      fields: fields,
      isStory: isStory,
      username: username,
      defaultPayoutType: defaultPayoutType,
      payoutType: payoutType,
      initialValues: {
        title: title,
        body: body,
        tags: tags,
        summary: summary
      },
      state: state,
      formId: formId,
      richTextEditor: richTextEditor,
      beneficiaries: beneficiaries,
      postTemplateName: postTemplateName
    });
    return ret;
  },
  // mapDispatchToProps
  function (dispatch) {
    return {
      uploadImage: function uploadImage(file, progress) {
        return dispatch(userActions.uploadImage({
          file: file,
          progress: progress
        }));
      },
      showAdvancedSettings: function showAdvancedSettings(formId) {
        return dispatch(userActions.showPostAdvancedSettings({
          formId: formId
        }));
      },
      setPayoutType: function setPayoutType(formId, payoutType) {
        return dispatch(userActions.set({
          key: ['current', 'post', formId, 'payoutType'],
          value: payoutType
        }));
      },
      setBeneficiaries: function setBeneficiaries(formId, beneficiaries) {
        return dispatch(userActions.set({
          key: ['current', 'post', formId, 'beneficiaries'],
          value: (0, _immutable.fromJS)(beneficiaries)
        }));
      },
      setPostTemplateName: function setPostTemplateName(formId, postTemplateName) {
        return dispatch(userActions.set({
          key: ['current', 'post', formId, 'postTemplateName'],
          value: postTemplateName
        }));
      },
      setPostCategory: function setPostCategory(formId, category) {
        dispatch(userActions.set({
          key: ['current', 'post', formId, 'category'],
          value: category
        }));
      },
      reply: function reply(_ref2) {
        var tags = _ref2.tags,
          title = _ref2.title,
          summary = _ref2.summary,
          body = _ref2.body,
          author = _ref2.author,
          permlink = _ref2.permlink,
          parent_author = _ref2.parent_author,
          parent_permlink = _ref2.parent_permlink,
          isHtml = _ref2.isHtml,
          isStory = _ref2.isStory,
          type = _ref2.type,
          originalPost = _ref2.originalPost,
          payoutType = _ref2.payoutType,
          state = _ref2.state,
          jsonMetadata = _ref2.jsonMetadata,
          _ref2$beneficiaries = _ref2.beneficiaries,
          beneficiaries = _ref2$beneficiaries === void 0 ? [] : _ref2$beneficiaries,
          successCallback = _ref2.successCallback,
          errorCallback = _ref2.errorCallback,
          startLoadingIndicator = _ref2.startLoadingIndicator,
          selectedCoverImage = _ref2.selectedCoverImage;
        // const post = state.global.getIn(['content', author + '/' + permlink])
        var username = state.user.getIn(['current', 'username']);
        var isEdit = type === 'edit';
        var isNew = /^submit_/.test(type);

        // Wire up the current and parent props for either an Edit or a Submit (new post)
        //'submit_story', 'submit_comment', 'edit'
        var linkProps = isNew ? {
          // submit new
          parent_author: author,
          parent_permlink: permlink,
          author: username
          // permlink,  assigned in TransactionSaga
        } // edit existing
        : isEdit ? {
          author: author,
          permlink: permlink,
          parent_author: parent_author,
          parent_permlink: parent_permlink
        } : null;
        if (!linkProps) throw new Error('Unknown type: ' + type);

        // If this is an HTML post, it MUST begin and end with the tag
        if (isHtml && !body.match(/^<html>[\s\S]*<\/html>$/)) {
          errorCallback('HTML posts must begin with <html> and end with </html>');
          return;
        }
        var rtags;
        {
          var html = isHtml ? body : remarkable.render(body);
          rtags = (0, _HtmlReady["default"])(html, {
            mutate: false
          });
        }
        _SanitizeConfig.allowedTags.forEach(function (tag) {
          rtags.htmltags["delete"](tag);
        });
        if (isHtml) rtags.htmltags["delete"]('html'); // html tag allowed only in HTML mode
        if (rtags.htmltags.size) {
          errorCallback('Please remove the following HTML elements from your post: ' + Array.apply(void 0, (0, _toConsumableArray2["default"])(rtags.htmltags)).map(function (tag) {
            return "<".concat(tag, ">");
          }).join(', '));
          return;
        }
        var formCategories = allTags(tags, originalPost.category, rtags.hashtags);
        var rootCategory = originalPost && originalPost.category ? originalPost.category : formCategories.first();

        // merge
        var meta = isEdit ? jsonMetadata : {};
        if (formCategories.size) meta.tags = formCategories.toJS();else delete meta.tags;
        if (rtags.usertags.size) meta.users = Array.from(rtags.usertags);else delete meta.users;
        if (rtags.images.size) {
          var moveToFirst = function moveToFirst(array, first) {
            array.sort(function (x, y) {
              return x === first ? -1 : y === first ? 1 : 0;
            });
          };
          meta.image = Array.from(rtags.images);

          // If a cover image has been manually selected,
          // move it to the first element of the image array.
          if (selectedCoverImage) {
            moveToFirst(meta.image, selectedCoverImage);
          }
        } else delete meta.image;
        if (rtags.links.size) meta.links = Array.from(rtags.links);else delete meta.links;
        meta.app = 'blurt.blog/1.0';
        if (isStory) {
          meta.format = isHtml ? 'html' : 'markdown';
          if (summary) {
            meta.description = summary;
          }
        }

        // if(Object.keys(json_metadata.steem).length === 0) json_metadata = {}// keep json_metadata minimal
        var sanitizeErrors = [];
        (0, _sanitizeHtml["default"])(body, (0, _SanitizeConfig["default"])({
          sanitizeErrors: sanitizeErrors
        }));
        if (sanitizeErrors.length) {
          errorCallback(sanitizeErrors.join('.  '));
          return;
        }
        if (meta.tags && meta.tags.length > MAX_TAGS) {
          var includingCategory = isEdit ? (0, _counterpart["default"])('reply_editor.including_the_category', {
            rootCategory: rootCategory
          }) : '';
          errorCallback((0, _counterpart["default"])('reply_editor.use_limited_amount_of_tags', {
            tagsLength: meta.tags.length,
            includingCategory: includingCategory
          }));
          return;
        }
        startLoadingIndicator();
        var originalBody = isEdit ? originalPost.body : null;
        var __config = {
          originalBody: originalBody
        };
        console.log('config', __config);
        // Avoid changing payout option during edits #735
        if (!isEdit && isStory) {
          if (!__config.comment_options) {
            __config.comment_options = {
              author: username,
              permlink: permlink
            };
          }
          if (!__config.comment_options.extensions) {
            __config.comment_options.extensions = [];
          }
          switch (payoutType) {
            case '0%':
              // decline payout
              __config.comment_options = {
                max_accepted_payout: '0.000 BLURT'
              };
              break;
            case '100%':
              __config.comment_options.extensions.push([1, {
                percent_blurt: 0
              }]);
              break;
            case '75%':
              // default
              // __config.comment_options.extensions.push(
              //     [
              //         1,
              //         {
              //             percent_blurt: 10000
              //         }
              //     ]
              // );
              break;
            default: // dd//
          }
          if (beneficiaries && beneficiaries.length > 0) {
            if (!__config.comment_options.extensions) {
              __config.comment_options.extensions = [];
            }
            if (/^blurt-[0-9]*$/.test(rootCategory)) {
              var idx = beneficiaries.findIndex(function (bnf) {
                return bnf.username === rootCategory;
              });
              if (idx === -1 && beneficiaries.length < 8) {
                var sumPercent = beneficiaries.reduce(function (total, bnf) {
                  return parseInt(total) + parseInt(bnf.percent);
                }, 0);
                if (sumPercent > 97) {
                  var difference = sumPercent - 97;
                  beneficiaries.push({
                    username: rootCategory,
                    percent: '3'
                  });
                  var _beneficiaries$reduce = beneficiaries.reduce(function (accumulator, object, index) {
                      if (parseInt(object.percent) > accumulator.highestPercent) {
                        return {
                          idxAux: index,
                          highestPercent: parseInt(object.percent)
                        };
                      }
                      return accumulator;
                    }, {
                      idxAux: -1,
                      highestPercent: -1
                    }),
                    idxAux = _beneficiaries$reduce.idxAux,
                    highestPercent = _beneficiaries$reduce.highestPercent;
                  beneficiaries[idxAux] = {
                    percent: highestPercent - difference,
                    username: beneficiaries[idxAux].username
                  };
                } else {
                  beneficiaries.push({
                    username: rootCategory,
                    percent: '3'
                  });
                }
              } else if (idx !== -1) {
                if (idx < beneficiaries.length - 1 && parseInt(beneficiaries[idx].percent) < 3) {
                  beneficiaries[idx] = {
                    username: rootCategory,
                    percent: '3'
                  };
                }
              }
            }
            var beneficiariesList = [0, {
              beneficiaries: beneficiaries.sort(function (a, b) {
                return a.username < b.username ? -1 : a.username > b.username ? 1 : 0;
              }).map(function (elt) {
                return {
                  account: elt.username,
                  weight: parseInt(elt.percent) * 100
                };
              })
            }];
            __config.comment_options.extensions.splice(0, 0, beneficiariesList);
            __config.comment_options.extensions.join();
          } else {
            if (!__config.comment_options) {
              __config.comment_options = {};
            }
            if (/^blurt-[0-9]*$/.test(rootCategory)) {
              __config.comment_options.extensions.push([0, {
                beneficiaries: [{
                  account: rootCategory,
                  weight: 300
                }]
              }]);
            }
            var account = state.global.getIn(['accounts', username]);
            var referrer = '';
            if (account.get('json_metadata') !== undefined && account.get('json_metadata') !== '') {
              var accountCreatedDaysAgo = (new Date().getTime() - new Date("".concat(account.get('created'), "Z")).getTime()) / 1000 / 60 / 60 / 24;
              if (accountCreatedDaysAgo < 30) {
                referrer = JSON.parse(account.get('json_metadata')).referral;
              }
            }
            if (referrer) {
              __config.comment_options.extensions.push([0, {
                beneficiaries: [{
                  account: referrer,
                  weight: 300
                }]
              }]);
            }
          }
        }
        var operation = _objectSpread(_objectSpread({}, linkProps), {}, {
          category: rootCategory,
          title: title,
          body: body,
          json_metadata: meta,
          __config: __config
        });
        var operationFlatFee = state.global.getIn(['props', 'operation_flat_fee']);
        var bandwidthKbytesFee = state.global.getIn(['props', 'bandwidth_kbytes_fee']);
        var size = JSON.stringify(operation).replace(/[\[\]\,\"]/g, '').length;
        var bw_fee = Math.max(0.001, (size / 1024 * bandwidthKbytesFee).toFixed(3));
        var fee = (operationFlatFee + bw_fee).toFixed(3);
        dispatch(transactionActions.broadcastOperation({
          type: 'comment',
          confirm: (0, _counterpart["default"])('g.operation_cost', {
            fee: fee
          }),
          operation: operation,
          errorCallback: errorCallback,
          successCallback: successCallback
        }));
      }
    };
  })(ReplyEditor);
};