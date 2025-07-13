require('dotenv').config();
const cron = require('node-cron');
const express = require('express');
const path = require('path');
const fs = require('fs');
const admin = require('firebase-admin');

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

// Simple test POST endpoint
app.post('/test-post', (req, res) => {
  console.log('📥 Test POST endpoint hit!');
  console.log('Body:', req.body);
  res.json({ success: true, message: 'Test POST works!', body: req.body });
});

// Static middleware (AFTER API routes)
app.use(express.static('.'));

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

// Serve the prompt manager
app.get('/prompt-manager', (req, res) => {
  res.sendFile(path.join(__dirname, 'prompt-manager.html'));
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🌐 Server running on port ${PORT}`);
  console.log(`📝 Prompt Manager available at: http://localhost:${PORT}/prompt-manager`);
});

// Add error handling middleware AFTER all routes
app.use((error, req, res, next) => {
  console.error('🚨 Server error:', error);
  res.status(500).json({ success: false, error: error.message });
});

console.log('🎯 Scheduler is running. Press Ctrl+C to stop.'); 