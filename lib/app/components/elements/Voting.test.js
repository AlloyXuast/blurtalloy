"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _react = _interopRequireDefault(require("react"));
var _reactIntl = require("react-intl");
var _reactRedux = require("react-redux");
var _redux = require("redux");
var _enzyme = require("enzyme");
var _enzymeAdapterReact = _interopRequireDefault(require("enzyme-adapter-react-15"));
var _immutable = require("immutable");
var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));
var _RootReducer = _interopRequireDefault(require("app/redux/RootReducer"));
var _Voting = _interopRequireDefault(require("./Voting"));
var _reduxMockStore = _interopRequireDefault(require("redux-mock-store"));
var _mockLocalStorage = _interopRequireDefault(require("mock-local-storage"));
global.window = {};
window.localStorage = global.localStorage;
(0, _enzyme.configure)({
  adapter: new _enzymeAdapterReact["default"]()
});
var mockGlobal = (0, _immutable.Map)({
  props: (0, _immutable.Map)({
    sbd_print_rate: 99
  }),
  feed_price: (0, _immutable.Map)({
    base: '5 SBD',
    quote: '10 BLURT'
  }),
  content: (0, _immutable.Map)({
    test: (0, _immutable.Map)({
      author: 'Jane Doe',
      permlink: 'zip',
      active_votes: (0, _immutable.Map)({}),
      stats: {
        total_votes: 1
      },
      max_accepted_payout: '999999 SBD',
      pending_payout_value: '10 SBD',
      cashout_time: '2018-03-30T10:00:00Z',
      pending_payout_sbd: 99
    })
  })
});
var mockUser = (0, _immutable.Map)({
  current: (0, _immutable.Map)({
    username: 'Janice'
  })
});
var voteTestObj = (0, _immutable.fromJS)({
  stats: {
    total_votes: 1
  },
  max_accepted_payout: '999999 SBD',
  pending_payout_value: '10 SBD',
  cashout_time: '2018-03-30T10:00:00Z'
});
describe('Voting', function () {
  it('should render flag if user is logged in and flag prop is true.', function () {
    var mockStore = (0, _reduxMockStore["default"])()({
      global: mockGlobal,
      offchain: {},
      user: mockUser,
      transaction: {},
      discussion: {},
      routing: {},
      app: {}
    });
    var wrapped = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_Voting["default"], {
      post: "test",
      flag: true,
      vote: function vote(w, p) {},
      post_obj: voteTestObj,
      price_per_blurt: 1,
      sbd_print_rate: 10000,
      store: mockStore
    })).dive();
    expect(wrapped.find('.Voting').length).toEqual(1);
  });
  it('should change state.weight and state.showWeight as expected when flag is clicked', function () {
    var mockStore = (0, _reduxMockStore["default"])()({
      global: mockGlobal,
      offchain: {},
      user: mockUser,
      transaction: {},
      discussion: {},
      routing: {},
      app: {}
    });
    var wrapped = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_Voting["default"], {
      post: "test",
      flag: true,
      vote: function vote(w, p) {},
      post_obj: voteTestObj,
      price_per_blurt: 1,
      sbd_print_rate: 10000,
      store: mockStore
    })).dive();
    wrapped.setState({
      weight: 666,
      showWeight: false
    });
    expect(wrapped.state().weight).toEqual(666);
    expect(wrapped.state().showWeight).toEqual(false);
  });
  it('should not dispatch an action when flag is clicked and myVote is 0.', function () {
    var mockStore = (0, _reduxMockStore["default"])()({
      global: mockGlobal,
      offchain: {},
      user: mockUser,
      transaction: {},
      discussion: {},
      routing: {},
      app: {}
    });
    var wrapped = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_Voting["default"], {
      post: "test",
      flag: true,
      vote: function vote(w, p) {},
      post_obj: voteTestObj,
      price_per_blurt: 1,
      sbd_print_rate: 10000,
      store: mockStore
    })).dive();
    wrapped.setState({
      myVote: 0
    });
    expect(mockStore.getActions()).toEqual([]);
  });
  it('should render upvote and should not render flag if user is logged in and flag prop is false.', function () {
    var mockStore = (0, _reduxMockStore["default"])()({
      global: mockGlobal,
      offchain: {},
      user: mockUser,
      transaction: {},
      discussion: {},
      routing: {},
      app: {}
    });
    var wrapped = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_Voting["default"], {
      post: "test",
      flag: false,
      vote: function vote(w, p) {},
      post_obj: voteTestObj,
      price_per_blurt: 1,
      sbd_print_rate: 10000,
      store: mockStore
    })).dive();
    expect(wrapped.find('.flag').length).toEqual(0);
    expect(wrapped.find('.upvote').length).toEqual(1);
  });
  it('should dispatch an action with payload when upvote button is clicked.', function () {
    var mockStore = (0, _reduxMockStore["default"])()({
      global: mockGlobal,
      offchain: {},
      user: mockUser,
      transaction: {},
      discussion: {},
      routing: {},
      app: {}
    });
    var wrapped = (0, _enzyme.shallow)( /*#__PURE__*/_react["default"].createElement(_Voting["default"], {
      post: "test",
      flag: false,
      vote: function vote(w, p) {},
      post_obj: voteTestObj,
      price_per_blurt: 1,
      sbd_print_rate: 10000,
      store: mockStore
    })).dive();
    wrapped.find('#upvote_button').simulate('click');
    expect(mockStore.getActions()[0].type).toEqual('transaction/BROADCAST_OPERATION');
    expect(mockStore.getActions()[0].payload.operation.weight).toEqual(10000);
    expect(mockStore.getActions()[0].payload.operation.voter).toEqual('Janice');
  });
  it('should omit liquid steem if print rate is 10000', function () {
    var store = (0, _redux.createStore)(_RootReducer["default"]);
    var post_obj = (0, _immutable.fromJS)({
      stats: {
        total_votes: 1
      },
      max_accepted_payout: '999999 SBD',
      pending_payout_value: '10 SBD',
      cashout_time: '2018-03-30T10:00:00Z'
    });
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_reactRedux.Provider, {
      store: store
    }, /*#__PURE__*/_react["default"].createElement(_reactIntl.IntlProvider, {
      locale: "en"
    }, /*#__PURE__*/_react["default"].createElement(_Voting["default"], {
      post: "Test post",
      vote: function vote(w, p) {},
      post_obj: post_obj,
      price_per_blurt: 1,
      sbd_print_rate: 10000
    }))));
    expect(JSON.stringify(component.toJSON())).toContain('5.00 SBD, 5.00 SP');
  });
  it('should show liquid steem if print rate is < 10000', function () {
    var post_obj = (0, _immutable.fromJS)({
      stats: {
        total_votes: 1
      },
      max_accepted_payout: '999999 SBD',
      pending_payout_value: '10 SBD',
      cashout_time: '2018-03-30T10:00:00Z'
    });
    var store = (0, _redux.createStore)(_RootReducer["default"]);
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_reactRedux.Provider, {
      store: store
    }, /*#__PURE__*/_react["default"].createElement(_reactIntl.IntlProvider, {
      locale: "en"
    }, /*#__PURE__*/_react["default"].createElement(_Voting["default"], {
      post: "Test post",
      vote: function vote(w, p) {},
      post_obj: post_obj,
      price_per_blurt: 1,
      sbd_print_rate: 5000
    }))));
    expect(JSON.stringify(component.toJSON())).toContain('2.50 SBD, 2.50 BLURT, 5.00 SP');
  });
});