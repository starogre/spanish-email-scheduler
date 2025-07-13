require('dotenv').config();
const express = require('express');
const path = require('path');
const admin = require('firebase-admin');

// Initialize Firebase for local development
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
    }),
  });
}

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// API Routes
app.use('/api/manage-prompts', require('./api/manage-prompts'));
app.use('/api/auth', require('./api/auth'));

// Serve Firebase config for client-side
app.get('/api/firebase-config', (req, res) => {
  res.json({
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Serve static files from public directory
app.use(express.static('public'));

// Catch-all route for SPA (if needed)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('🚨 Server error:', error);
  res.status(500).json({ success: false, error: error.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🌐 Local development server running on port ${PORT}`);
  console.log(`🏠 Homepage available at: http://localhost:${PORT}/`);
  console.log(`📝 Prompt Manager available at: http://localhost:${PORT}/prompt-manager`);
  console.log(`🔐 Login available at: http://localhost:${PORT}/login`);
  console.log(`📊 Dashboard available at: http://localhost:${PORT}/dashboard`);
});

console.log('🎯 Local development server is running. Press Ctrl+C to stop.'); 