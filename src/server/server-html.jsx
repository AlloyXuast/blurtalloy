import * as config from 'config';
import React from 'react';

export default function ServerHTML({
    body,
    assets,
    locale,
    title,
    meta,
    shouldSeeAds,
    adClient,
    gptEnabled,
    gptBannedTags,
    gptBidding,
    shouldSeeCookieConsent,
    cookieConsentApiKey,
}) {
    let page_title = title;
    return (
        <html lang="en">
            <head>
                <script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-63ZBEY1EVG"
                />
                <script content="window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-63ZBEY1EVG');" />
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                {meta &&
                    meta.map((m) => {
                        if (m.title) {
                            page_title = m.title;
                            return null;
                        }
                        if (m.canonical) {
                            return (
                                <link
                                    key="canonical"
                                    rel="canonical"
                                    href={m.canonical}
                                />
                            );
                        }
                        if (m.name && m.content) {
                            return (
                                <meta
                                    key={m.name}
                                    name={m.name}
                                    content={m.content}
                                />
                            );
                        }
                        if (m.property && m.content) {
                            return (
                                <meta
                                    key={m.property}
                                    property={m.property}
                                    content={m.content}
                                />
                            );
                        }
                        return null;
                    })}
                <link rel="apple-touch-icon" sizes="180x180" href="/images/favicons/apple-touch-icon.png?v=4" />
                <link rel="icon" type="image/png" sizes="32x32" href="/images/favicons/favicon-32x32.png?v=4" />
                <link rel="icon" type="image/png" sizes="192x192" href="/images/favicons/android-chrome-192x192.png?v=4" />
                <link rel="icon" type="image/png" sizes="16x16" href="/images/favicons/favicon-16x16.png?v=4" />
                <link rel="manifest" href="/images/favicons/site.webmanifest?v=4" />
                <link rel="mask-icon" href="/images/favicons/safari-pinned-tab.svg?v=4" color="#da532c" />
                <link rel="shortcut icon" href="/images/favicons/favicon.ico?v=4" />
                <meta name="apple-mobile-web-app-title" content="Blurt Blog" />
                <meta name="application-name" content="Blurt Blog" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="msapplication-TileImage" content="/images/favicons/mstile-144x144.png?v=4" />
                <meta name="msapplication-config" content="/images/favicons/browserconfig.xml?v=4" />
                <meta name="theme-color" content="#da532c" />
                <link
                    href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600"
                    rel="stylesheet"
                    type="text/css"
                />
                <link
                    href="https://fonts.googleapis.com/css?family=Source+Serif+Pro:400,600"
                    rel="stylesheet"
                    type="text/css"
                />
                {/* <link
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,700"
                    rel="stylesheet"
                    type="text/css"
                />
                <link
                    href="https://fonts.googleapis.com/css?family=Nunito:400,600"
                    rel="stylesheet"
                    type="text/css"
                /> */}
                {assets.style.map((href, idx) => (
                    <link
                        href={href}
                        key={idx}
                        rel="stylesheet"
                        type="text/css"
                    />
                ))}
                {/* {gptEnabled ? ( */}
                {/*    <script */}
                {/*        dangerouslySetInnerHTML={{ */}
                {/*            __html: ` */}
                {/*            (function() { */}
                {/*              var bsa_optimize = document.createElement('script'); */}
                {/*              bsa_optimize.type = 'text/javascript'; */}
                {/*              bsa_optimize.async = true; */}
                {/*              bsa_optimize.src = 'https://cdn-s2s.buysellads.net/pub/steemit.js?' + (new Date() - new Date() % 3600000); */}
                {/*              (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(bsa_optimize); */}
                {/*            })(); */}
                {/*        `, */}
                {/*        }} */}
                {/*    /> */}
                {/* ) : null} */}
                {shouldSeeCookieConsent ? (
                    <script
                        id="Cookiebot"
                        src="https://consent.cookiebot.com/uc.js"
                        data-cbid={cookieConsentApiKey}
                        type="text/javascript"
                        async
                    />
                ) : null}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                        window.twttr = (function(d, s, id) {
                            var js, fjs = d.getElementsByTagName(s)[0],
                            t = window.twttr || {};
                            if (d.getElementById(id)) return t;
                            js = d.createElement(s);
                            js.id = id;
                            js.src = "https://platform.twitter.com/widgets.js";
                            fjs.parentNode.insertBefore(js, fjs);

                            t._e = [];
                            t.ready = function(f) {
                            t._e.push(f);
                        };

                            return t;
                        }(document, "script", "twitter-wjs"));
                        `,
                    }}
                />

                <title>{page_title}</title>
            </head>
            <body>
                <div id="content" dangerouslySetInnerHTML={{ __html: body }} />
                {assets.script.map((href, idx) => (
                    <script key={idx} src={href} />
                ))}
            </body>
        </html>
    );
}
