"use strict";

var _typeof = require("@babel/runtime/helpers/typeof");
var _ResolveRoute = _interopRequireWildcard(require("./ResolveRoute"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
jest.mock('./utils/GDPRUserList');
describe('routeRegex', function () {
  it('should produce the desired regex patterns', function () {
    var test_cases = [['UserFeed', /^\/(@[\w.\d-]+)\/feed\/?$/], ['UserProfile', /^\/(@[\w.\d-]+)(?:\/(blog|posts|comments|transfers|curation-rewards|author-rewards|permissions|created|recent-replies|notifications|feed|password|followed|followers|settings|info|communities))?\/?$/], ['UserProfile3', /^\/(@[\w\.\d-]+)\/[\w\.\d-]+/], ['CategoryFilters', /^\/(hot|trending|promoted|payout|payout_comments|created)\/?$/gi], ['PostNoCategory', /^\/(@[\w\.\d-]+)\/([\w\d-]+)/], ['Post', /^\/([\w\d\-\/]+)\/(\@[\w\d\.-]+)\/([\w\d-]+)\/?($|\?)/], ['PostJson', /^\/([\w\d\-\/]+)\/(\@[\w\d\.-]+)\/([\w\d-]+)(\.json)$/], ['UserJson', /^\/(@[\w\.\d-]+)(\.json)$/], ['UserNameJson', /^.*(?=(\.json))/]];
    test_cases.forEach(function (r) {
      expect(_ResolveRoute.routeRegex[r[0]]).toEqual(r[1]);
    });
  });
});
describe('resolveRoute', function () {
  var test_cases = [['/', {
    page: 'PostsIndex',
    params: ['hot']
  }], ['/trending', {
    page: 'PostsIndex',
    params: ['trending', undefined]
  }], ['/trending/cat', {
    page: 'PostsIndex',
    params: ['trending', 'cat']
  }], ['/trending/Dog', {
    page: 'PostsIndex',
    params: ['trending', 'Dog']
  }], ['/about.html', {
    page: 'About'
  }], ['/dapps', {
    page: 'Dapps'
  }], ['/faq.html', {
    page: 'Faq'
  }], ['/login.html', {
    page: 'Login'
  }], ['/privacy.html', {
    page: 'Privacy'
  }], ['/support.html', {
    page: 'Support'
  }], ['/tos.html', {
    page: 'Tos'
  }], ['/submit.html', {
    page: 'SubmitPost'
  }], ['/@maitland/feed', {
    page: 'PostsIndex',
    params: ['home', '@maitland']
  }], ['/@gdpr/feed', {
    page: 'NotFound'
  }], ['/@maitland/blog', {
    page: 'UserProfile',
    params: ['@maitland', 'blog']
  }], ['/@maitland/communities', {
    page: 'UserProfile',
    params: ['@maitland', 'communities']
  }], ['/@gdpr/blog', {
    page: 'NotFound'
  }], ['/@cool/nice345', {
    page: 'PostNoCategory',
    params: ['@cool', 'nice345']
  }], ['/@gdpr/nice345', {
    page: 'NotFound'
  }], ['/ceasar/@salad/circa90', {
    page: 'Post',
    params: ['ceasar', '@salad', 'circa90', '']
  }], ['/taggy/@gdpr/nice345', {
    page: 'NotFound'
  }], ['/roles/blurt-1683810', {
    page: 'CommunityRoles',
    params: ['blurt-1683810']
  }]];
  test_cases.forEach(function (r) {
    it("should resolve the route for the ".concat(r[1].page, " page"), function () {
      expect((0, _ResolveRoute["default"])(r[0])).toEqual(r[1]);
    });
  });
  it('should resolve xss test route in development environment', function () {
    expect((0, _ResolveRoute["default"])('/xss/test')).toEqual({
      page: 'NotFound'
    });
    process.env.NODE_ENV = 'development';
    expect((0, _ResolveRoute["default"])('/xss/test')).toEqual({
      page: 'XSSTest'
    });
    delete process.env.NODE_ENV;
  });
  it('should resolve benchmark route in development environment', function () {
    expect((0, _ResolveRoute["default"])('/benchmark')).toEqual({
      page: 'NotFound'
    });
    process.env.OFFLINE_SSR_TEST = true;
    expect((0, _ResolveRoute["default"])('/benchmark')).toEqual({
      page: 'Benchmark'
    });
    delete process.env.OFFLINE_SSR_TEST;
  });
  it('should resolve an unknown route to NotFound', function () {
    expect((0, _ResolveRoute["default"])('/randomness')).toEqual({
      page: 'NotFound'
    });
  });
});