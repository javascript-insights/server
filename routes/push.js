var express = require('express');
var router = express.Router();

const webpush = require('../utils/webpush');

// Route to subscribe a user to push notifications
router.post('/subscribe', (req, res) => {
  const subscription = req.body;
  // Save subscription to database or in-memory store
  // For demonstration, we will just log it
  console.log('User subscribed:', subscription);
  res.status(201).json({});
});

// Route to send a push notification
router.post('/send', (req, res) => {
  const { title, message } = req.body;
  const subscription = req.body.subscription; // Assume subscription is sent in the body

  webpush.sendNotification(subscription, JSON.stringify({ title, message }))
    .then(() => res.status(200).json({ success: true }))
    .catch(err => {
      console.error('Error sending notification:', err);
      res.sendStatus(500);
    });
});

module.exports = router;