require('dotenv').config();
const cron = require('node-cron');
const express = require('express');
const path = require('path');
const fs = require('fs');
const admin = require('firebase-admin');
const { generateSpanishArticle } = require('./services/openaiService');
const { sendEmail } = require('./services/emailService');

// Initialize Firebase FIRST
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
  }),
});

const db = admin.firestore();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// API Routes (BEFORE static middleware)
app.use('/api/manage-prompts', require('./api/manage-prompts'));
app.use('/api/auth', require('./api/auth'));

// Simple test route
app.get('/test', (req, res) => {
  console.log('🧪 Test route hit!');
  res.json({ message: 'Test route works!' });
});

// Serve the prompt manager (protected route)
app.get('/prompt-manager', (req, res) => {
  console.log('📝 Prompt manager route hit!');
  res.sendFile(path.join(__dirname, 'prompt-manager.html'));
});

// Serve the public homepage
app.get('/', (req, res) => {
  console.log('🏠 Homepage route hit!');
  res.sendFile(path.join(__dirname, 'public-homepage.html'));
});

// Serve the privacy policy
app.get('/privacy-policy', (req, res) => {
  res.sendFile(path.join(__dirname, 'privacy-policy.html'));
});

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

// Serve the user login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'firebase-login.html'));
});

// Serve user dashboard (protected route)
app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, 'user-dashboard.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Static middleware (AFTER all routes) - TEMPORARILY DISABLED
// app.use(express.static('.'));

console.log('🚀 Spanish Email Scheduler Starting...');

// Function to generate and send the daily Spanish article
async function sendDailySpanishArticle() {
  try {
    console.log('📝 Generating Spanish article...');
    
    // Generate the article and grammar concepts
    const articleData = await generateSpanishArticle();
    
    console.log('📧 Sending email...');
    
    // Send the email
    await sendEmail(articleData);
    
    console.log('✅ Daily Spanish article sent successfully!');
  } catch (error) {
    console.error('❌ Error sending daily Spanish article:', error);
  }
}

// Schedule the daily email (default: 9:00 AM)
const scheduleTime = process.env.SCHEDULE_TIME || '09:00';
const [hour, minute] = scheduleTime.split(':');

console.log(`⏰ Scheduling daily Spanish article for ${scheduleTime}`);

// Schedule the job to run daily at the specified time
cron.schedule(`${minute} ${hour} * * *`, sendDailySpanishArticle, {
  timezone: process.env.TIMEZONE || 'America/New_York'
});

// Send an immediate test email if running in development
if (process.env.NODE_ENV === 'development') {
  console.log('🧪 Development mode: Sending test email...');
  sendDailySpanishArticle();
}

// Start the server
app.listen(PORT, () => {
  console.log(`🌐 Server running on port ${PORT}`);
  console.log(`🏠 Homepage available at: http://localhost:${PORT}/`);
  console.log(`📝 Prompt Manager available at: http://localhost:${PORT}/prompt-manager`);
});

// Add error handling middleware AFTER all routes
app.use((error, req, res, next) => {
  console.error('🚨 Server error:', error);
  res.status(500).json({ success: false, error: error.message });
});

console.log('🎯 Scheduler is running. Press Ctrl+C to stop.'); 