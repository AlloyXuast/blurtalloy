/* eslint-disable no-restricted-syntax */
import * as config from 'config';
import * as https from 'https';
import * as blurtjs from '@blurtfoundation/blurtjs';
/**
 * Load nsfw posts array
 *
 * @returns {promise} resolves to object of {nsfw:[]}
 */
function loadNSFWPosts() {
    return new Promise((resolve, reject) => {
        const emptyNSFWPosts = {
            nsfw: [],
        };

        if (!config.nsfw_url) {
            resolve(emptyNSFWPosts);
            return;
        }

        const request = https.get(config.nsfw_url, (resp) => {
            let data = '';
            resp.on('data', (chunk) => {
                data += chunk;
            });
            resp.on('end', () => {
                const json = JSON.parse(data);
                console.info('Received nsfw posts payload', json);
                if (json === Object(json)) {
                    resolve(json);
                }
            });
        });

        request.on('error', (e) => {
            console.error('Could not load nsfw posts', e);
            resolve(emptyNSFWPosts);
        });
    });
}

/**
 * [async] Get nsfw posts
 *
 * @returns {object} object of {nsfw:[]}
 */
export default async function nsfwPosts() {
    console.info('Loading nsfw posts');

    const postData = await loadNSFWPosts();
    console.info('Loading nsfw posts', postData);
    const loadedPostData = {
        nsfw: [],
    };

    for (const url of postData.nsfw) {
        const [username, postId] = url.split('@')[1].split('/');
        // eslint-disable-next-line no-await-in-loop
        const post = await blurtjs.api.getContentAsync(username, postId);
        loadedPostData.nsfw.push(post);
    }

    console.info(`Loaded nsfw posts: nsfw: ${loadedPostData.nsfw.length}`);

    return loadedPostData;
}
