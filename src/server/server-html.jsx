import React from 'react';
import * as config from 'config';

const window = require("global/window")

const document = {};

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
                {/* <script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-63ZBEY1EVG"
                />
                 */}
                {/* <script async>
                    {typeof window !== "undefined" && (function () {
                        const host = 'www.themoneytizer.com';
                        const element = document.createElement('script');
                        const firstScript = document.getElementsByTagName('script')[0];
                        const url = 'https://cmp.quantcast.com'
                            .concat('/choice/', '6Fv0cGNfc_bw8', '/', host, '/choice.js');
                        let uspTries = 0;
                        const uspTriesLimit = 3;
                        element.async = true;
                        element.type = 'text/javascript';
                        element.src = url;

                        firstScript.parentNode.insertBefore(element, firstScript);

                        function makeStub() {
                            const TCF_LOCATOR_NAME = '__tcfapiLocator';
                            const queue = [];
                            let win = window;
                            let cmpFrame;

                            function addFrame() {
                                const doc = win.document;
                                const otherCMP = !!(win.frames[TCF_LOCATOR_NAME]);

                                if (!otherCMP) {
                                    if (doc.body) {
                                        const iframe = doc.createElement('iframe');

                                        iframe.style.cssText = 'display:none';
                                        iframe.name = TCF_LOCATOR_NAME;
                                        doc.body.appendChild(iframe);
                                    } else {
                                        setTimeout(addFrame, 5);
                                    }
                                }
                                return !otherCMP;
                            }

                            function tcfAPIHandler() {
                                let gdprApplies;
                                const args = arguments;

                                if (!args.length) {
                                    return queue;
                                } if (args[0] === 'setGdprApplies') {
                                    if (
                                        args.length > 3
                                        && args[2] === 2
                                        && typeof args[3] === 'boolean'
                                    ) {
                                        gdprApplies = args[3];
                                        if (typeof args[2] === 'function') {
                                            args[2]('set', true);
                                        }
                                    }
                                } else if (args[0] === 'ping') {
                                    const retr = {
                                        gdprApplies,
                                        cmpLoaded: false,
                                        cmpStatus: 'stub'
                                    };

                                    if (typeof args[2] === 'function') {
                                        args[2](retr);
                                    }
                                } else {
                                    if (args[0] === 'init' && typeof args[3] === 'object') {
                                        args[3] = { ...args[3], tag_version: 'V2' };
                                    }
                                    queue.push(args);
                                }
                            }

                            function postMessageEventHandler(event) {
                                const msgIsString = typeof event.data === 'string';
                                let json = {};

                                try {
                                    if (msgIsString) {
                                        json = JSON.parse(event.data);
                                    } else {
                                        json = event.data;
                                    }
                                } catch (ignore) { }

                                const payload = json.__tcfapiCall;

                                if (payload) {
                                    window.__tcfapi(
                                        payload.command,
                                        payload.version,
                                        (retValue, success) => {
                                            let returnMsg = {
                                                __tcfapiReturn: {
                                                    returnValue: retValue,
                                                    success,
                                                    callId: payload.callId
                                                }
                                            };
                                            if (msgIsString) {
                                                returnMsg = JSON.stringify(returnMsg);
                                            }
                                            if (event && event.source && event.source.postMessage) {
                                                event.source.postMessage(returnMsg, '*');
                                            }
                                        },
                                        payload.parameter
                                    );
                                }
                            }

                            while (win) {
                                try {
                                    if (win.frames[TCF_LOCATOR_NAME]) {
                                        cmpFrame = win;
                                        break;
                                    }
                                } catch (ignore) { }

                                if (win === window.top) {
                                    break;
                                }
                                win = win.parent;
                            }
                            if (!cmpFrame) {
                                addFrame();
                                win.__tcfapi = tcfAPIHandler;
                                win.addEventListener('message', postMessageEventHandler, false);
                            }
                        }

                        makeStub();

                        var uspStubFunction = function () {
                            const arg = arguments;
                            if (typeof window.__uspapi !== uspStubFunction) {
                                setTimeout(() => {
                                    if (typeof window.__uspapi !== 'undefined') {
                                        window.__uspapi.apply(window.__uspapi, arg);
                                    }
                                }, 500);
                            }
                        };

                        const checkIfUspIsReady = function () {
                            uspTries++;
                            if (window.__uspapi === uspStubFunction && uspTries < uspTriesLimit) {
                                console.warn('USP is not accessible');
                            } else {
                                clearInterval(uspInterval);
                            }
                        };

                        if (typeof window.__uspapi === 'undefined') {
                            window.__uspapi = uspStubFunction;
                            var uspInterval = setInterval(checkIfUspIsReady, 6000);
                        }
                    }())}
                </script> */}
                <script content="window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-63ZBEY1EVG');" />
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                {meta
                    && meta.map((m) => {
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
                <link rel="manifest" href="/static/manifest.json" />
                <link rel="icon" type="image/x-icon" href="/favicon.ico?v=2" />
                <link

                    sizes="57x57"
                    href="/images/favicons/apple-touch-icon-57x57.png"
                    type="image/png"
                />
                <link

                    sizes="114x114"
                    href="/images/favicons/apple-touch-icon-114x114.png"
                    type="image/png"
                />
                <link

                    sizes="72x72"
                    href="/images/favicons/apple-touch-icon-72x72.png"
                    type="image/png"
                />
                <link

                    sizes="144x144"
                    href="/images/favicons/apple-touch-icon-144x144.png"
                    type="image/png"
                />
                <link

                    sizes="60x60"
                    href="/images/favicons/apple-touch-icon-60x60.png"
                    type="image/png"
                />
                <link

                    sizes="120x120"
                    href="/images/favicons/apple-touch-icon-120x120.png"
                    type="image/png"
                />
                <link

                    sizes="76x76"
                    href="/images/favicons/apple-touch-icon-76x76.png"
                    type="image/png"
                />
                <link

                    sizes="152x152"
                    href="/images/favicons/apple-touch-icon-152x152.png"
                    type="image/png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    href="/images/favicons/favicon-196x196.png"
                    sizes="196x196"
                />
                <link
                    rel="icon"
                    type="image/png"
                    href="/images/favicons/favicon-96x96.png"
                    sizes="96x96"
                />
                <link
                    rel="icon"
                    type="image/png"
                    href="/images/favicons/favicon-32x32.png"
                    sizes="32x32"
                />
                <link
                    rel="icon"
                    type="image/png"
                    href="/images/favicons/favicon-16x16.png"
                    sizes="16x16"
                />
                <link
                    rel="icon"
                    type="image/png"
                    href="/images/favicons/favicon-128.png"
                    sizes="128x128"
                />
                <meta name="application-name" content="Blurt" />
                <meta name="msapplication-TileColor" content="#FFFFFF" />
                <meta
                    name="msapplication-TileImage"
                    content="/images/favicons/mstile-144x144.png"
                />
                <meta
                    name="msapplication-square70x70logo"
                    content="/images/favicons/mstile-70x70.png"
                />
                <meta
                    name="msapplication-square150x150logo"
                    content="/images/favicons/mstile-150x150.png"
                />
                <meta
                    name="msapplication-wide310x150logo"
                    content="/images/favicons/mstile-310x150.png"
                />
                <meta
                    name="msapplication-square310x310logo"
                    content="/images/favicons/mstile-310x310.png"
                />
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
