var MY_NTFY_TOPIC = "wenmiaop_chat_9527";
var lastMsgId = 0;

function sendMobileNotification(title, msg) {
    if (!MY_NTFY_TOPIC || MY_NTFY_TOPIC === "wenmiaop_chat_9527") return;
    var bodyText = msg ? (msg.length > 80 ? msg.substring(0, 80) + '...' : msg) : '[新消息]';
    fetch('https://ntfy.sh/' + MY_NTFY_TOPIC, {
        method: 'POST',
        headers: {
            'Title': title,
            'Click': 'https://12wenmiaop.github.io/chat/',
            'Priority': 'high'
        },
        body: bodyText
    }).catch(function(e) {});
}

window.addEventListener('load', function() {
    setTimeout(function() {
        if (typeof window._registerPartnerMessageListener === 'function') {
            window._registerPartnerMessageListener(function(message) {
                if (message && message.id && message.id !== lastMsgId) {
                    lastMsgId = message.id;
                    var partnerName = (typeof settings !== 'undefined' && settings.partnerName) ? settings.partnerName : '对方';
                    var text = message.text || '[图片/表情]';
                    sendMobileNotification(partnerName + ' 发来消息', text);
                }
            });
        }
    }, 2000);
});
