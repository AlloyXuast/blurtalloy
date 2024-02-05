"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = extractMeta;
var _ExtractContent = _interopRequireDefault(require("app/utils/ExtractContent"));
var _Accessors = require("app/utils/Accessors");
var _CanonicalLinker = require("app/utils/CanonicalLinker.js");
/* global $STM_Config */

var site_desc = 'Blurt is a social media platform where everyone gets paid for creating and curating content. It leverages a robust digital points system (Blurt) for digital rewards.';
function addSiteMeta(metas) {
  metas.push({
    title: 'Blurt'
  });
  metas.push({
    name: 'description',
    content: site_desc
  });
  metas.push({
    property: 'og:type',
    content: 'website'
  });
  metas.push({
    property: 'og:site_name',
    content: 'Blurt'
  });
  metas.push({
    property: 'og:title',
    content: 'Blurt'
  });
  metas.push({
    property: 'og:description',
    content: site_desc
  });
  metas.push({
    property: 'og:image',
    content: "https://".concat($STM_Config.site_domain, "/images/Blurtlogo_v2.png")
  });
  metas.push({
    property: 'fb:app_id',
    content: $STM_Config.fb_app
  });
  metas.push({
    name: 'twitter:card',
    content: 'summary'
  });
  metas.push({
    name: 'twitter:site',
    content: '@blurt'
  });
  metas.push({
    name: 'twitter:title',
    content: '#blurt.blog'
  });
  metas.push({
    name: 'twitter:description',
    site_desc: site_desc
  });
  metas.push({
    name: 'twitter:image',
    content: "https://".concat($STM_Config.site_domain, "/images/Blurtlogo_v2.png")
  });
}
function readProfile(chain_data, account) {
  var profiles = chain_data.profiles;
  if (!chain_data.profiles[account]) return {};
  return profiles[account].metadata.profile;
}
function addAccountMeta(metas, accountname, profile) {
  var name = profile.name,
    about = profile.about,
    profile_image = profile.profile_image;
  name = name || accountname;
  about = about || 'Join thousands on blurt who share, post and earn rewards.';
  profile_image = profile_image || "https://".concat($STM_Config.site_domain, "/images/Blurtlogo_v2.png");

  // Set profile tags
  var title = "@".concat(accountname);
  var desc = "The latest posts from ".concat(name, ". Follow me at @").concat(accountname, ". ").concat(about);

  // Standard meta
  metas.push({
    name: 'description',
    content: desc
  });

  // Twitter card data
  metas.push({
    name: 'twitter:card',
    content: 'summary'
  });
  metas.push({
    name: 'twitter:site',
    content: '@blurt'
  });
  metas.push({
    name: 'twitter:title',
    content: title
  });
  metas.push({
    name: 'twitter:description',
    content: desc
  });
  metas.push({
    name: 'twitter:image',
    content: profile_image
  });
}
function extractMeta(chain_data, rp) {
  var metas = [];
  if (rp.username && rp.slug) {
    // post
    var post = "".concat(rp.username, "/").concat(rp.slug);
    var content = chain_data.content[post];
    // const author = chain_data.accounts[rp.username];
    // const profile = normalizeProfile(author);
    if (content && content.id !== '0.0.0') {
      // API currently returns 'false' data with id 0.0.0 for posts that do not exist
      var d = (0, _ExtractContent["default"])(_Accessors.objAccessor, content, false);
      var url = "https://".concat($STM_Config.site_domain) + d.link;
      var canonicalUrl = (0, _CanonicalLinker.makeCanonicalLink)(d);
      var title = d.title + ' — Blurt';
      var desc = d.desc + ' by ' + d.author;
      var image = d.image_link || "https://".concat($STM_Config.site_domain, "/images/Blurtlogo_v2.png");
      var category = d.category,
        created = d.created;

      // Standard meta
      metas.push({
        title: title
      });
      metas.push({
        canonical: canonicalUrl
      });
      metas.push({
        name: 'description',
        content: desc
      });

      // Open Graph data
      metas.push({
        name: 'og:title',
        content: title
      });
      metas.push({
        name: 'og:type',
        content: 'article'
      });
      metas.push({
        name: 'og:url',
        content: url
      });
      metas.push({
        name: 'og:image',
        content: image || "https://".concat($STM_Config.site_domain, "/images/Blurtlogo_v2.png")
      });
      metas.push({
        name: 'og:description',
        content: desc
      });
      metas.push({
        name: 'og:site_name',
        content: 'Blurt'
      });
      metas.push({
        name: 'fb:app_id',
        content: $STM_Config.fb_app
      });
      metas.push({
        name: 'article:tag',
        content: category
      });
      metas.push({
        name: 'article:published_time',
        content: created
      });

      // Twitter card data
      metas.push({
        name: 'twitter:card',
        content: image ? 'summary_large_image' : 'summary'
      });
      metas.push({
        name: 'twitter:site',
        content: '@blurt'
      });
      metas.push({
        name: 'twitter:title',
        content: title
      });
      metas.push({
        name: 'twitter:description',
        content: desc
      });
      metas.push({
        name: 'twitter:image',
        content: image || "https://".concat($STM_Config.site_domain, "/images/Blurtlogo_v2.png")
      });
    } else {
      addSiteMeta(metas);
    }
  } else if (rp.accountname) {
    var profile = rp.accountname ? readProfile(chain_data, rp.accountname) : null;
    addAccountMeta(metas, rp.accountname, profile);
  } else {
    // site
    addSiteMeta(metas);
  }
  return metas;
}