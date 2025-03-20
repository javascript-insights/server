const webpush = require('web-push');
require('dotenv').config();

const vapidKeys = {
    publicKey: 'YOUR_PUBLIC_VAPID_KEY',
    privateKey: 'YOUR_PRIVATE_VAPID_KEY',
};

webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

const sendPushNotification = (subscription, payload) => {
    return webpush.sendNotification(subscription, payload)
        .catch(error => {
            console.error('Error sending notification, reason: ', error);
        });
};

module.exports = {
    sendPushNotification,
};