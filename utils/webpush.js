const webpush = require('web-push');
require('dotenv').config();

// Generate VAPID keys using: npx web-push generate-vapid-keys
// These should ideally come from environment variables
const vapidKeys = {
    publicKey: process.env.VAPID_PUBLIC_KEY || 'BDd3_hVL9fZi9Ybo2UUzA284WG5FZR30_95YeZJsiApwXKpNcF1rRPF3foIiBHXRdJI2Qhumhf6_LFTeZaNndIo',
    privateKey: process.env.VAPID_PRIVATE_KEY || 'rUhjUql5h8pBR0Kv_n8yRkh_HJGmrjN3UkWkUfcPfmg',
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
    getPublicKey: () => vapidKeys.publicKey
};