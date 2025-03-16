var express = require('express');
var router = express.Router();

// Cookie routes with various options
router.get('/', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', 'true');

  // Standard cookie
  res.cookie('standardCookie', 'value1', {
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/'
  });

  // Cross-origin cookie
  res.cookie('corsCookie', 'value2', {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: false,
    secure: true,
    sameSite: 'none',
    path: '/',
    credentials: true
  });

  // Session cookie (expires when browser closes)
  res.cookie('sessionCookie', 'value3', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  });

  res.json({ message: 'Cookies set' });
});

router.get('/read', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.json({ cookies: req.cookies });
});

router.post('/set', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', 'true');

  const { name, value, options } = req.body;

  if (options.crossOrigin) {
    // Cross-origin settings
    res.cookie(name, value, {
      ...options,
      httpOnly: false,
      sameSite: 'none',
      secure: true,
      credentials: true
    });
  } else {
    // Same-origin settings
    res.cookie(name, value, {
      ...options,
      httpOnly: options.httpOnly ?? true,
      sameSite: options.sameSite ?? 'lax',
      secure: options.secure ?? process.env.NODE_ENV === 'production'
    });
  }

  res.json({ message: 'Cookie set' });
});

router.delete('/clear/:name', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', 'true');

  // Clear with cross-origin options
  res.clearCookie(req.params.name, {
    path: '/',
    sameSite: 'none',
    secure: true
  });
  res.json({ message: 'Cookie cleared' });
});

// Add OPTIONS handler for preflight requests
router.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});

module.exports = router;
