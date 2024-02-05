/* global $STM_Config */
import extractContent from 'app/utils/ExtractContent';
import { objAccessor } from 'app/utils/Accessors';
import { makeCanonicalLink } from 'app/utils/CanonicalLinker.js';

const site_desc = 'Blurt is a social media platform where everyone gets paid for creating and curating content. It leverages a robust digital points system (Blurt) for digital rewards.';

function addSiteMeta(metas) {
    metas.push({ title: 'Blurt' });
    metas.push({ name: 'description', content: site_desc });
    metas.push({ property: 'og:type', content: 'website' });
    metas.push({ property: 'og:site_name', content: 'Blurt' });
    metas.push({ property: 'og:title', content: 'Blurt' });
    metas.push({ property: 'og:description', content: site_desc });
    metas.push({
        property: 'og:image',
        content: `https://${$STM_Config.site_domain}/images/Blurtlogo_v2.png`,
    });
    metas.push({ property: 'fb:app_id', content: $STM_Config.fb_app });
    metas.push({ name: 'twitter:card', content: 'summary' });
    metas.push({ name: 'twitter:site', content: '@blurt' });
    metas.push({ name: 'twitter:title', content: '#blurt.blog' });
    metas.push({ name: 'twitter:description', site_desc });
    metas.push({
        name: 'twitter:image',
        content: `https://${$STM_Config.site_domain}/images/Blurtlogo_v2.png`,
    });
}

function readProfile(chain_data, account) {
    const {profiles} = chain_data;
    if (!chain_data.profiles[account]) return {};
    return profiles[account].metadata.profile;
}

function addAccountMeta(metas, accountname, profile) {
    let { name, about, profile_image } = profile;

    name = name || accountname;
    about = about || 'Join thousands on blurt who share, post and earn rewards.';
    profile_image = profile_image || `https://${$STM_Config.site_domain}/images/Blurtlogo_v2.png`;

    // Set profile tags
    const title = `@${accountname}`;
    const desc = `The latest posts from ${name}. Follow me at @${accountname}. ${about}`;

    // Standard meta
    metas.push({ name: 'description', content: desc });

    // Twitter card data
    metas.push({ name: 'twitter:card', content: 'summary' });
    metas.push({ name: 'twitter:site', content: '@blurt' });
    metas.push({ name: 'twitter:title', content: title });
    metas.push({ name: 'twitter:description', content: desc });
    metas.push({ name: 'twitter:image', content: profile_image });
}

export default function extractMeta(chain_data, rp) {
    const metas = [];
    if (rp.username && rp.slug) {
        // post
        const post = `${rp.username}/${rp.slug}`;
        const content = chain_data.content[post];
        // const author = chain_data.accounts[rp.username];
        // const profile = normalizeProfile(author);
        if (content && content.id !== '0.0.0') {
            // API currently returns 'false' data with id 0.0.0 for posts that do not exist
            const d = extractContent(objAccessor, content, false);
            const url = `https://${$STM_Config.site_domain}` + d.link;
            const canonicalUrl = makeCanonicalLink(d);
            const title = d.title + ' — Blurt';
            const desc = d.desc + ' by ' + d.author;
            const image = d.image_link || `https://${$STM_Config.site_domain}/images/Blurtlogo_v2.png`;
            const { category, created } = d;

            // Standard meta
            metas.push({ title });
            metas.push({ canonical: canonicalUrl });
            metas.push({ name: 'description', content: desc });

            // Open Graph data
            metas.push({ name: 'og:title', content: title });
            metas.push({ name: 'og:type', content: 'article' });
            metas.push({ name: 'og:url', content: url });
            metas.push({
                name: 'og:image',
                content: image || `https://${$STM_Config.site_domain}/images/Blurtlogo_v2.png`,
            });
            metas.push({ name: 'og:description', content: desc });
            metas.push({ name: 'og:site_name', content: 'Blurt' });
            metas.push({ name: 'fb:app_id', content: $STM_Config.fb_app });
            metas.push({ name: 'article:tag', content: category });
            metas.push({
                name: 'article:published_time',
                content: created,
            });

            // Twitter card data
            metas.push({
                name: 'twitter:card',
                content: image ? 'summary_large_image' : 'summary',
            });
            metas.push({ name: 'twitter:site', content: '@blurt' });
            metas.push({ name: 'twitter:title', content: title });
            metas.push({ name: 'twitter:description', content: desc });
            metas.push({
                name: 'twitter:image',
                content: image || `https://${$STM_Config.site_domain}/images/Blurtlogo_v2.png`,
            });
        } else {
            addSiteMeta(metas);
        }
    } else if (rp.accountname) {
        const profile = rp.accountname ? readProfile(chain_data, rp.accountname) : null;
        addAccountMeta(metas, rp.accountname, profile)
    } else {
        // site
        addSiteMeta(metas);
    }
    return metas;
}