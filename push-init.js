if ("Notification" in window) {
    if (Notification.permission !== "granted") {
        Notification.requestPermission();
    }
}

function showNativeNotification(title, bodyText) {
    if (!("Notification" in window) || Notification.permission !== "granted") return;
    
    var text = bodyText ? (bodyText.length > 60 ? bodyText.substring(0, 60) + '...' : bodyText) : '[新消息]';
    
    var notification = new Notification(title, {
        body: text,
        tag: 'chat-message',
        requireInteraction: true
    });

    notification.onclick = function() {
        window.focus();
        notification.close();
    };
}

window.addEventListener('load', function() {
    setTimeout(function() {
        if (typeof window._registerPartnerMessageListener === 'function') {
            window._registerPartnerMessageListener(function(message) {
                if (message && message.id) {
                    var partnerName = (typeof settings !== 'undefined' && settings.partnerName) ? settings.partnerName : '对方';
                    var text = message.text || '[图片/表情]';
                    
                    showNativeNotification(partnerName + ' 发来消息', text);
                }
            });
        }
    }, 2000);
});
