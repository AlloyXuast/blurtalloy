(function () {
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
}());