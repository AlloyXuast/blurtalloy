"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _typeof = require("@babel/runtime/helpers/typeof");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serializeHtml = exports.getDemoState = exports.deserializeHtml = exports["default"] = void 0;
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));
var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));
var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));
var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _react = _interopRequireDefault(require("react"));
var _slate = _interopRequireWildcard(require("slate"));
var _reactPortal = _interopRequireDefault(require("react-portal"));
var _selectionPosition = _interopRequireDefault(require("selection-position"));
var _Icon = _interopRequireDefault(require("app/components/elements/Icon"));
var _server = _interopRequireDefault(require("react-dom/server"));
var _Helpers = require("app/utils/SlateEditor/Helpers");
var _DemoState = _interopRequireDefault(require("app/utils/SlateEditor/DemoState"));
var _Schema = require("app/utils/SlateEditor/Schema");
var _slateInsertBlockOnEnter = _interopRequireDefault(require("slate-insert-block-on-enter"));
var _slateTrailingBlock = _interopRequireDefault(require("slate-trailing-block"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _callSuper(t, o, e) { return o = (0, _getPrototypeOf2["default"])(o), (0, _possibleConstructorReturn2["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0, _getPrototypeOf2["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var serializer = new _slate.Html({
  rules: _Schema.HtmlRules
});
var serializeHtml = exports.serializeHtml = function serializeHtml(state) {
  return serializer.serialize(state, {
    render: false
  }).map(function (el) {
    return _server["default"].renderToStaticMarkup(el);
  }).join('\n');
};
var deserializeHtml = exports.deserializeHtml = function deserializeHtml(html) {
  return serializer.deserialize(html);
};
var getDemoState = exports.getDemoState = function getDemoState() {
  return _slate.Raw.deserialize(_DemoState["default"], {
    terse: true
  });
};
var DEFAULT_NODE = 'paragraph';
var plugins = [];
if (process.env.BROWSER) {
  //import InsertImages from 'slate-drop-or-paste-images'
  var InsertImages = require('slate-drop-or-paste-images')["default"];
  plugins.push(InsertImages({
    extensions: ['jpeg', 'png', 'gif'],
    applyTransform: function applyTransform(transform, file) {
      return transform.insertInline({
        type: 'image',
        isVoid: true,
        data: {
          file: file
        }
      });
    }
  }));
  plugins.push((0, _slateInsertBlockOnEnter["default"])({
    kind: 'block',
    type: DEFAULT_NODE,
    nodes: [{
      kind: 'text',
      text: '',
      ranges: []
    }]
  }));
  plugins.push((0, _slateTrailingBlock["default"])({
    type: DEFAULT_NODE
  }));
}
var SlateEditor = exports["default"] = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(SlateEditor, _React$Component);
  function SlateEditor(_props) {
    var _this;
    (0, _classCallCheck2["default"])(this, SlateEditor);
    _this = _callSuper(this, SlateEditor, [_props]);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "reset", function () {
      _this.setState({
        state: _this.props.initialState
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "componentDidMount", function () {
      _this.updateMenu();
      _this.updateSidebar();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "componentDidUpdate", function () {
      _this.updateMenu();
      _this.updateSidebar();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onChange", function (state) {
      //this.setState({ state })
      _this.props.onChange(state);
    });
    // When the portal opens, cache the menu element.
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onMenuOpen", function (portal) {
      _this.setState({
        menu: portal.firstChild
      });
    });
    // When the portal opens, cache the menu element.
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onSidebarOpen", function (portal) {
      _this.setState({
        sidebar: portal.firstChild
      });
    });
    // Check if the current selection has a mark with `type` in it.
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "hasMark", function (type) {
      var state = _this.state.state;
      if (!state.isExpanded) return;
      return state.marks.some(function (mark) {
        return mark.type == type;
      });
    });
    // Check if the current selection has a block with `type` in it.
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "hasBlock", function (type) {
      var state = _this.state.state;
      var document = state.document;
      return state.blocks.some(function (node) {
        return node.type == type || !!document.getClosest(node, function (parent) {
          return parent.type == type;
        });
      });
    });
    // Check if the current selection has an inline of `type`.
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "hasInline", function (type) {
      var state = _this.state.state;
      return state.inlines.some(function (inline) {
        return inline.type == type;
      });
    });
    // When a mark button is clicked, toggle the current mark.
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onClickMark", function (e, type) {
      e.preventDefault();
      var state = _this.state.state;
      state = state.transform().toggleMark(type).apply();
      _this.setState({
        state: state
      });
    });
    // Toggle block type
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onClickBlock", function (e, type) {
      e.preventDefault();
      var state = _this.state.state;
      var transform = state.transform();
      var _state = state,
        document = _state.document;

      // Handle everything but list buttons.
      if (type != 'bulleted-list' && type != 'numbered-list') {
        var isActive = _this.hasBlock(type);
        var isList = _this.hasBlock('list-item');
        if (isList) {
          transform = transform.setBlock(isActive ? DEFAULT_NODE : type).unwrapBlock('bulleted-list').unwrapBlock('numbered-list');
        } else {
          transform = transform.setBlock(isActive ? DEFAULT_NODE : type);
        }
      } else {
        // Handle the extra wrapping required for list buttons.
        var _isList = _this.hasBlock('list-item');
        var isType = state.blocks.some(function (block) {
          return !!document.getClosest(block, function (parent) {
            return parent.type == type;
          });
        });
        if (_isList && isType) {
          transform = transform.setBlock(DEFAULT_NODE).unwrapBlock('bulleted-list').unwrapBlock('numbered-list');
        } else if (_isList) {
          transform = transform.unwrapBlock(type == 'bulleted-list' ? 'numbered-list' : 'bulleted-list').wrapBlock(type);
        } else {
          transform = transform.setBlock('list-item').wrapBlock(type);
        }
      }
      state = transform.apply();
      _this.setState({
        state: state
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onClickLink", function (e) {
      e.preventDefault();
      var state = _this.state.state;
      var hasLinks = _this.hasInline('link');
      if (hasLinks) {
        state = state.transform().unwrapInline('link').apply();
      } else if (state.isExpanded) {
        var href = window.prompt('Enter the URL of the link:', 'http://blurt.blog');
        if (href) {
          state = state.transform().wrapInline({
            type: 'link',
            data: {
              href: href
            }
          }).collapseToEnd().apply();
        }
      } else {
        var _href = window.prompt('Enter the URL of the link:');
        var text = window.prompt('Enter the text for the link:');
        state = state.transform().insertText(text).extendBackward(text.length).wrapInline({
          type: 'link',
          data: {
            href: _href
          }
        }).collapseToEnd().apply();
      }
      _this.setState({
        state: state
      });
    });
    // Markdown-style quick formatting
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onKeyDown", function (e, data, state) {
      if (data.isMod) return _this.onModKeyDown(e, data, state);
      switch (data.key) {
        case 'space':
          return _this.onSpace(e, state);
        case 'backspace':
          return _this.onBackspace(e, state);
        case 'enter':
          return data.isShift ? _this.onShiftEnter(e, state) : _this.onEnter(e, state);
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onModKeyDown", function (e, data, state) {
      var mark;
      switch (data.key) {
        case 'b':
          mark = 'bold';
          break;
        case 'i':
          mark = 'italic';
          break;
        case 'u':
          mark = 'underline';
          break;
        case 'k':
          return _this.onClickLink(e);
      }
      if (!mark) return;
      state = state.transform().toggleMark(mark).apply();
      e.preventDefault();
      return state;
    });
    // If space was entered, check if it was a markdown sequence
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onSpace", function (e, state) {
      if (state.isExpanded) return;
      var _state2 = state,
        selection = _state2.selection;
      var _state3 = state,
        startText = _state3.startText,
        startBlock = _state3.startBlock,
        startOffset = _state3.startOffset;
      var chars = startBlock.text.slice(0, startOffset); //.replace(/\s*/g, '')
      var type = (0, _Schema.getMarkdownType)(chars);
      if (!type) return;
      if (type == 'list-item' && startBlock.type == 'list-item') return;
      e.preventDefault();
      var transform = state.transform().setBlock(type);
      if (type == 'list-item' && chars != '1.') transform = transform.wrapBlock('bulleted-list');
      if (type == 'list-item' && chars == '1.') transform = transform.wrapBlock('numbered-list');
      state = transform.extendToStartOf(startBlock)["delete"]().apply();
      return state;
    });
    // On backspace, if at the start of a non-paragraph, convert it back into a paragraph node.
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onBackspace", function (e, state) {
      if (state.isExpanded) return;
      if (state.startOffset != 0) return;
      var _state4 = state,
        startBlock = _state4.startBlock;
      if (startBlock.type == 'paragraph') return;
      e.preventDefault();
      var transform = state.transform().setBlock('paragraph');
      if (startBlock.type == 'list-item') transform = transform.unwrapBlock('bulleted-list').unwrapBlock('numbered-list');
      state = transform.apply();
      return state;
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onShiftEnter", function (e, state) {
      if (state.isExpanded) return;
      var startBlock = state.startBlock,
        startOffset = state.startOffset,
        endOffset = state.endOffset;

      // Allow soft returns for certain block types
      if (startBlock.type == 'paragraph' || startBlock.type == 'code-block' || startBlock.type == 'block-quote') {
        var transform = state.transform();
        if (state.isExpanded) transform = transform["delete"]();
        transform = transform.insertText('\n');
        return transform.apply();
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onEnter", function (e, state) {
      if (state.isExpanded) return;
      var startBlock = state.startBlock,
        startOffset = state.startOffset,
        endOffset = state.endOffset;

      // On return, if at the end of a node type that should not be extended, create a new paragraph below it.
      if (startOffset == 0 && startBlock.length == 0) return _this.onBackspace(e, state); //empty block
      if (endOffset != startBlock.length) return; //not at end of block

      if (startBlock.type != 'heading-one' && startBlock.type != 'heading-two' && startBlock.type != 'heading-three' && startBlock.type != 'heading-four' && startBlock.type != 'block-quote' && startBlock.type != 'code-block') return;
      e.preventDefault();
      return state.transform().splitBlock().setBlock('paragraph').apply();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onPaste", function (e, data, state) {
      console.log('** onPaste:', data.type, data.html);
      if (data.type != 'html') return;
      var _serializer$deseriali = serializer.deserialize(data.html),
        document = _serializer$deseriali.document;
      return state.transform().insertFragment(document).apply();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "renderSidebar", function () {
      var state = _this.state.state;
      var isOpen = state.isExpanded && state.isFocused;
      return /*#__PURE__*/_react["default"].createElement(_reactPortal["default"], {
        isOpened: true,
        onOpen: _this.onSidebarOpen
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "SlateEditor__sidebar"
      }, _this.renderAddBlockButton({
        type: 'image',
        label: /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
          name: "photo"
        }),
        handler: _this.onClickInsertImage
      }), _this.renderAddBlockButton({
        type: 'video',
        label: /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
          name: "video"
        }),
        handler: _this.onClickInsertVideo
      }), _this.renderAddBlockButton({
        type: 'hrule',
        label: /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
          name: "line"
        }),
        handler: _this.onClickInsertHr
      })));
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onClickInsertImage", function (e) {
      e.preventDefault();
      var state = _this.state.state;
      var src = window.prompt('Enter the URL of the image:', '');
      if (!src) return;
      state = state.transform().insertInline({
        type: 'image',
        isVoid: true,
        data: {
          src: src
        }
      })
      //.insertBlock({type: 'paragraph', isVoid: false, nodes: [Slate.Text.create()]})
      .focus().collapseToEndOfNextBlock().apply();
      _this.setState({
        state: state
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onClickInsertVideo", function (e, type) {
      e.preventDefault();
      var state = _this.state.state;
      state = state.transform().insertBlock({
        type: 'embed',
        isVoid: true,
        data: {
          src: ''
        }
      })
      //.insertBlock({type: 'paragraph', isVoid: false})
      .apply();
      _this.setState({
        state: state
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onClickInsertHr", function (e, type) {
      e.preventDefault();
      var state = _this.state.state;
      state = state.transform().insertBlock({
        type: 'hr',
        isVoid: true
      }).insertBlock({
        type: 'paragraph',
        isVoid: false
      }).apply();
      _this.setState({
        state: state
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "renderAddBlockButton", function (props) {
      var type = props.type,
        label = props.label,
        handler = props.handler;
      var onMouseDown = function onMouseDown(e) {
        return handler(e);
      };
      return /*#__PURE__*/_react["default"].createElement("span", {
        key: type,
        className: "SlateEditor__sidebar-button",
        onMouseDown: onMouseDown
      }, label);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "renderMenu", function () {
      var state = _this.state.state;
      var isOpen = state.isExpanded && state.isFocused;
      return /*#__PURE__*/_react["default"].createElement(_reactPortal["default"], {
        isOpened: true,
        onOpen: _this.onMenuOpen
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "SlateEditor__menu SlateEditor__menu"
      }, _Schema.schema.toolbarMarks.map(_this.renderMarkButton), _this.renderInlineButton({
        type: 'link',
        label: /*#__PURE__*/_react["default"].createElement(_Icon["default"], {
          name: "link"
        })
      }), _this.renderBlockButton({
        type: 'block-quote',
        label: /*#__PURE__*/_react["default"].createElement("span", null, "\u201C")
      }), _this.renderBlockButton({
        type: 'heading-one',
        label: 'H1'
      }), _this.renderBlockButton({
        type: 'heading-two',
        label: 'H2'
      }), _this.renderBlockButton({
        type: 'code-block',
        label: '<>'
      })));
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "renderMarkButton", function (props) {
      var type = props.type,
        label = props.label;
      var isActive = _this.hasMark(type);
      var onMouseDown = function onMouseDown(e) {
        return _this.onClickMark(e, type);
      };
      return /*#__PURE__*/_react["default"].createElement("span", {
        key: type,
        className: 'SlateEditor__menu-button SlateEditor__menu-button-' + type,
        onMouseDown: onMouseDown,
        "data-active": isActive
      }, /*#__PURE__*/_react["default"].createElement("span", null, label));
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "renderBlockButton", function (props) {
      var type = props.type,
        label = props.label;
      var isActive = _this.hasBlock(type);
      var onMouseDown = function onMouseDown(e) {
        return _this.onClickBlock(e, type);
      };
      return /*#__PURE__*/_react["default"].createElement("span", {
        key: type,
        className: 'SlateEditor__menu-button SlateEditor__menu-button-' + type,
        onMouseDown: onMouseDown,
        "data-active": isActive
      }, /*#__PURE__*/_react["default"].createElement("span", null, label));
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "renderInlineButton", function (props) {
      var type = props.type,
        label = props.label;
      var isActive = _this.hasInline(type);
      var onMouseDown = function onMouseDown(e) {
        return _this.onClickLink(e, type);
      };
      return /*#__PURE__*/_react["default"].createElement("span", {
        key: type,
        className: 'SlateEditor__menu-button SlateEditor__menu-button-' + type,
        onMouseDown: onMouseDown,
        "data-active": isActive
      }, /*#__PURE__*/_react["default"].createElement("span", null, label));
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "renderEditor", function () {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "SlateEditor Markdown"
      }, /*#__PURE__*/_react["default"].createElement(_slate.Editor, {
        schema: _Schema.schema,
        placeholder: _this.props.placeholder || 'Enter some text...',
        plugins: plugins,
        state: _this.state.state,
        onChange: _this.onChange,
        onKeyDown: _this.onKeyDown,
        onPaste: _this.onPaste
      }));
    });
    // move sidebar to float left of current blank paragraph
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "updateSidebar", function () {
      var _this$state = _this.state,
        sidebar = _this$state.sidebar,
        state = _this$state.state;
      if (!sidebar) return;
      var rect = (0, _Helpers.getCollapsedClientRect)();
      if (state.isBlurred || state.isExpanded || !rect) {
        sidebar.removeAttribute('style');
        return;
      }
      sidebar.style.top = "".concat(rect.top + window.scrollY, "px");
      sidebar.style.left = "".concat(rect.left + window.scrollX - sidebar.offsetWidth, "px");
    });
    // move menu to center above current selection
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "updateMenu", function () {
      var _this$state2 = _this.state,
        menu = _this$state2.menu,
        state = _this$state2.state;
      if (!menu) return;
      if (state.isBlurred || state.isCollapsed) {
        menu.removeAttribute('style');
        return;
      }
      var rect = (0, _selectionPosition["default"])();
      menu.style.top = "".concat(rect.top + window.scrollY - menu.offsetHeight, "px");
      menu.style.left = "".concat(rect.left + window.scrollX - menu.offsetWidth / 2 + rect.width / 2, "px");
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "render", function () {
      var state = _this.state.state;
      return /*#__PURE__*/_react["default"].createElement("div", null, _this.renderMenu(), _this.renderSidebar(), _this.renderEditor());
    });
    _this.state = {
      state: _props.initialState
    };
    return _this;
  }
  return (0, _createClass2["default"])(SlateEditor);
}(_react["default"].Component);