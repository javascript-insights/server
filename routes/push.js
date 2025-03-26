var express = require('express');
var router = express.Router();

const webpush = require('../utils/webpush');

// Store subscriptions in memory (in a production app, use a database)
const subscriptions = [];

// Route to get VAPID public key
router.get('/vapidPublicKey', (req, res) => {
  res.json({ publicKey: webpush.getPublicKey() });
});

// Route to subscribe a user to push notifications
router.post('/subscribe', (req, res) => {
  const subscription = req.body;
  
  // Store the subscription
  subscriptions.push(subscription);
  console.log('User subscribed:', subscription);
  
  res.status(201).json({ message: 'Subscription successful' });
});

// Route to send a push notification to all subscribers
router.post('/send', (req, res) => {
  const { title = 'New Notification', message = 'Hello from the server!' } = req.body;
  
  // For testing, if a specific subscription is provided, use it
  if (req.body.subscription) {
    webpush.sendPushNotification(req.body.subscription, JSON.stringify({ 
      title, 
      message,
      icon: '/static/favicon.png' 
    }))
    .then(() => res.status(200).json({ success: true, message: 'Notification sent to single subscriber' }))
    .catch(err => {
      console.error('Error sending notification:', err);
      res.status(500).json({ error: err.message });
    });
    return;
  }
  
  // Send to all subscriptions
  if (subscriptions.length === 0) {
    return res.status(404).json({ message: 'No subscribers available' });
  }
  
  const notifications = subscriptions.map(subscription => {
    return webpush.sendPushNotification(subscription, JSON.stringify({
      title,
      message,
      icon: '/static/favicon.png'
    }));
  });
  
  Promise.all(notifications)
    .then(() => res.status(200).json({ 
      success: true, 
      message: `Notification sent to ${subscriptions.length} subscribers` 
    }))
    .catch(err => {
      console.error('Error sending notifications:', err);
      res.status(500).json({ error: err.message });
    });
});

// New routes for cache demonstration

// Route to provide a cacheable resource
router.get('/cache-demo-resource', (req, res) => {
  // Set cache headers to make this resource cacheable
  res.set('Cache-Control', 'max-age=60'); // Cacheable for 60 seconds
  res.json({
    data: 'This is cacheable data',
    timestamp: new Date().toISOString()
  });
});

// Route to provide a non-cacheable resource
router.get('/no-cache-resource', (req, res) => {
  // Set headers to prevent caching
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.json({
    data: 'This data should not be cached',
    timestamp: new Date().toISOString()
  });
});

// Route to create a test cache entry (for demonstration)
router.post('/create-cache', async (req, res) => {
  const { cacheName, url, data } = req.body;
  
  // This route simulates creating a cache entry
  // In a real application, caches are managed client-side
  res.status(200).json({ 
    success: true, 
    message: `Simulated creating cache '${cacheName}' with entry for ${url}`,
    details: 'Actual cache creation happens in the browser'
  });
});

// Route to clear server-side data (for demonstration purposes)
router.post('/clear-demo-data', (req, res) => {
  // In a real app, this could clear server-side resources
  res.status(200).json({ 
    success: true, 
    message: 'Server-side demo data cleared',
    note: 'Browser caches must be cleared via the browser Application panel'
  });
});

module.exports = router;