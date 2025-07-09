require('dotenv').config();
const cron = require('node-cron');
const { generateSpanishArticle } = require('./services/openaiService');
const { sendEmail } = require('./services/emailService');

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

console.log('🎯 Scheduler is running. Press Ctrl+C to stop.'); 