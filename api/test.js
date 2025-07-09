const { generateSpanishArticle } = require('../services/openaiService');
const { sendEmail } = require('../services/emailService');

module.exports = async (req, res) => {
  try {
    console.log('🧪 Test mode: Generating Spanish article...');
    
    // Generate the article and grammar concepts
    const articleData = await generateSpanishArticle();
    
    console.log('📧 Test mode: Sending email...');
    
    // Send the email
    await sendEmail(articleData);
    
    console.log('✅ Test email sent successfully!');
    
    res.status(200).json({ 
      success: true, 
      message: 'Test Spanish email sent successfully',
      title: articleData.title,
      article: articleData.article.substring(0, 100) + '...'
    });
    
  } catch (error) {
    console.error('❌ Error sending test email:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}; 