// const domains = [
//     'peypaisecurity.com',
//     'kinrnightx.monster',
//     'jarolovexr.click',
// ];

/**
 * Does this URL look like a phishing attempt?
 *
 * @param {string} questionableUrl
 * @returns {boolean}
 */
// eslint-disable-next-line import/prefer-default-export
export const looksPhishy = (questionableUrl) => {
    const domains2 = [
        'peypaisecurity.com',
        'kinrnightx.monster',
        'jarolovexr.click',
        'najirchat.cfd',
    ];

    const domains = $STM_Config.phishing_domains
        ? $STM_Config.phishing_domains
        : domains2;

    // eslint-disable-next-line no-restricted-syntax
    for (const domain of domains) {
        if (questionableUrl.toLocaleLowerCase().indexOf(domain) > -1) {
            return true;
        }
    }

    return false;
};

export const looksPhishyDomain = (domains, questionableUrl) => {
    const domains2 = $STM_Config.phishing_domains
        ? $STM_Config.phishing_domains
        : domains;
    // eslint-disable-next-line no-restricted-syntax
    for (const domain of domains2) {
        if (questionableUrl.toLocaleLowerCase().indexOf(domain) > -1) {
            return true;
        }
    }

    return false;
};
