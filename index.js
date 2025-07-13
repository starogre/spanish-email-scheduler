require('dotenv').config();
const cron = require('node-cron');
const express = require('express');
const path = require('path');
const fs = require('fs');
const { generateSpanishArticle } = require('./services/openaiService');
const { sendEmail } = require('./services/emailService');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('.'));

// API Routes
app.use('/api/manage-prompts', require('./api/manage-prompts'));

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

console.log('🎯 Scheduler is running. Press Ctrl+C to stop.'); 