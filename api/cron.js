const { generateSpanishArticle } = require('../services/openaiService');
const { sendEmail } = require('../services/emailService');

module.exports = async (req, res) => {
  // Check for cron secret authorization
  if (req.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).end('Unauthorized');
  }

  try {
    console.log('📝 Generating Spanish article...');
    
    // Generate the article and grammar concepts
    const articleData = await generateSpanishArticle();
    
    console.log('📧 Sending email...');
    
    // Send the email
    await sendEmail(articleData);
    
    console.log('✅ Daily Spanish article sent successfully!');
    
    res.status(200).json({ 
      success: true, 
      message: 'Spanish email sent successfully',
      title: articleData.title 
    });
    
  } catch (error) {
    console.error('❌ Error sending daily Spanish article:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}; 