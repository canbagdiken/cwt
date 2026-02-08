function injectScript(fileName, callback) {
    const script = document.createElement('script');
    script.src = chrome.runtime.getURL(fileName);
    script.onload = () => {
        script.remove();
        if (callback) callback();
    };
    (document.head || document.documentElement).appendChild(script);
}

function init() {
    injectScript('UZIP.js', () => {
        injectScript('wppconnect-wa.js', () => {
            injectScript('exporter.js', () => {
                injectScript('inject.js');
            });
        });
    });
}

init();

window.addEventListener("message", (e) => {
    if (e.data.type === "WACB_FROM_WEB_RESOURCE") {
        chrome.runtime.sendMessage(e.data.message).catch(() => {});
    }
});
chrome.runtime.onMessage.addListener((m) => {
    window.postMessage({ type: "WACB_FROM_CONTENT_SCRIPT", message: m }, "*");
});