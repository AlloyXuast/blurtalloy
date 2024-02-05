"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = resolveRoute;
exports.routeRegex = void 0;
var _GDPRUserList = _interopRequireDefault(require("./utils/GDPRUserList"));
var reg = function reg(pattern) {
  pattern = pattern.replace('<account>', '(@[\\w\\.\\d-]+)').replace('<account-tab>', '(blog|posts|comments|transfers|curation-rewards|author-rewards|permissions|created|recent-replies|notifications|feed|password|followed|followers|settings|info|communities)').replace('<sort>', '(hot|trending|promoted|payout|muted|payout_comments|created)').replace('<tag>', '([\\w\\W\\d-]{1,32})').replace('<permlink>', '([\\w\\d-]+)').replace('/', '\\/');
  return new RegExp('^\\/' + pattern + '$');
};
var routeRegex = exports.routeRegex = {
  CommunityRoles: reg('roles/<tag>'),
  UserFeed: reg('<account>/feed/?'),
  UserProfile: reg('<account>(?:/<account-tab>)?/?'),
  Post: reg('<tag>/<account>/<permlink>/?'),
  PostNoCategory: reg('<account>/<permlink>'),
  CategoryFilters: reg('<sort>(?:/<tag>)?/?'),
  UserJson: reg('<account>(\\.json)'),
  PostJson: reg('<tag>/<account>/<permlink>(\\.json)'),
  UserProfile3: /^\/(@[\w\.\d-]+)\/[\w\.\d-]+/,
  UserNameJson: /^.*(?=(\.json))/
};
function resolveRoute(path) {
  // index
  if (path === '/') return {
    page: 'PostsIndex',
    params: ['hot']
  };

  // static
  if (path === '/welcome') return {
    page: 'Welcome'
  };
  if (path === '/faq.html') return {
    page: 'Faq'
  };
  if (path === '/about.html') return {
    page: 'About'
  };
  if (path === '/support.html') return {
    page: 'Support'
  };
  if (path === '/privacy.html') return {
    page: 'Privacy'
  };
  if (path === '/tos.html') return {
    page: 'Tos'
  };

  // general functions
  if (path === '/login.html') return {
    page: 'Login'
  };
  if (path === '/submit.html') return {
    page: 'SubmitPost'
  };
  if (path === '/communities') return {
    page: 'Communities'
  };
  if (path === '/tags') return {
    page: 'Tags'
  };

  // wallet
  if (path === '/change_password') return {
    page: 'ChangePassword'
  };
  if (path === '/recover_account_step_1') return {
    page: 'RecoverAccountStep1'
  };
  if (path === '/~witnesses') return {
    page: 'Witnesses'
  };

  // others
  if (path === '/dapps') return {
    page: 'Dapps'
  };

  // /roles/blurt-123
  var match = path.match(routeRegex.CommunityRoles);
  if (match) return {
    page: 'CommunityRoles',
    params: [match[1]]
  };

  // /@user/feed
  match = path.match(routeRegex.UserFeed);
  if (match) {
    return _GDPRUserList["default"].includes(match[1].substring(1)) ? {
      page: 'NotFound'
    } : {
      page: 'PostsIndex',
      params: ['home', match[1]]
    };
  }

  // /@user, /@user/blog, /@user/settings
  match = path.match(routeRegex.UserProfile);
  if (match) {
    return _GDPRUserList["default"].includes(match[1].substring(1)) ? {
      page: 'NotFound'
    } : {
      page: 'UserProfile',
      params: match.slice(1)
    };
  }

  // /@user/permlink (redirects to /category/@user/permlink)
  match = path.match(routeRegex.PostNoCategory);
  if (match) return _GDPRUserList["default"].includes(match[1].substring(1)) ? {
    page: 'NotFound'
  } : {
    page: 'PostNoCategory',
    params: match.slice(1)
  };

  // /category/@user/permlink
  match = path.match(routeRegex.Post);
  if (match) {
    return _GDPRUserList["default"].includes(match[2].substring(1)) ? {
      page: 'NotFound'
    } : {
      page: 'Post',
      params: match.slice(1)
    };
  }

  // /trending, /trending/category
  match = path.match(routeRegex.CategoryFilters);
  if (match) return {
    page: 'PostsIndex',
    params: match.slice(1)
  };

  // developer
  if (path === '/xss/test' && process.env.NODE_ENV === 'development') return {
    page: 'XSSTest'
  };
  if (path === '/benchmark' && process.env.OFFLINE_SSR_TEST) return {
    page: 'Benchmark'
  };
  return {
    page: 'NotFound'
  };
}