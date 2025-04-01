var express = require('express');
var router = express.Router();

// Basic CORS - Allow all origins
router.get('/allow-all', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.send('This endpoint allows all origins');
});

// Specific origin CORS
router.get('/specific-origin', function (req, res) {
  res.header('Access-Control-Allow-Origin', 'https://sidanmor.com');
  res.send('This endpoint allows only https://sidanmor.com');
});

// CORS with methods
router.get('/allow-methods', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, DELETE');
  res.send('This endpoint allows specific HTTP methods');
});

router.put('/allow-methods', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'POST, DELETE');
  res.send('This endpoint allows specific HTTP methods');
});

// CORS with credentials
router.get('/with-credentials', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.send('This endpoint allows credentials');
});

// CORS with custom headers
router.get('/custom-headers', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.send('This endpoint allows custom headers');
});

// CORS with max age
router.get('/max-age', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Max-Age', '86400'); // 24 hours
  res.send('This endpoint sets max age for preflight');
});

// CORS Preflight Requests
router.options('/preflight', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Max-Age', '86400');
  res.sendStatus(200);
});

router.post('/preflight', function (req, res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.send('This endpoint handles preflight requests');
});

module.exports = router;
