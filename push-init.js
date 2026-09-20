var MY_NTFY_TOPIC = "wenmiaop_chat_9527";

function sendMobileNotification(msg) {
    if (!MY_NTFY_TOPIC) return;
    fetch('https://ntfy.sh/' + MY_NTFY_TOPIC, {
        method: 'POST',
        body: msg
    }).catch(function(e){});
}

window.addEventListener('load', function() {
    setTimeout(function() {
        sendMobileNotification("测试成功！网页已连接。");
    }, 3000);
});

var lastText = "";
window.addEventListener('load', function() {
    setTimeout(function() {
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(m) {
                m.addedNodes.forEach(function(node) {
                    var text = (node.innerText || node.textContent || "").trim();
                    if (text.length > 1 && text.length < 200 && text !== lastText) {
                        lastText = text;
                        sendMobileNotification("【新消息】 " + text);
                    }
                });
            });
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }, 5000);
});
