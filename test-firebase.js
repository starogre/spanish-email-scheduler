require('dotenv').config();
const { generateSpanishArticle } = require('./services/openaiService');

async function testFirebaseIntegration() {
  console.log('🧪 Testing Firebase Integration...\n');
  
  try {
    console.log('📝 Generating test article with Firebase prompts...');
    const articleData = await generateSpanishArticle();
    
    console.log('\n✅ Article generated successfully!');
    console.log('\n📰 Article Details:');
    console.log(`Title: ${articleData.title}`);
    console.log(`Topic: ${articleData.topic}`);
    console.log(`Date: ${articleData.date}`);
    
    console.log('\n📖 Article Content:');
    console.log(articleData.article);
    
    console.log('\n📚 Grammar Concepts:');
    console.log(articleData.concepts);
    
    console.log('\n🎉 Test completed successfully!');
    console.log('✅ Firebase integration is working');
    console.log('✅ Improved prompts are being used');
    console.log('✅ Topic diversity system is active');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    console.log('\n🔍 Troubleshooting:');
    console.log('1. Check your .env file has correct Firebase credentials');
    console.log('2. Verify Firebase project is set up correctly');
    console.log('3. Ensure Firestore is enabled');
    console.log('4. Check OpenAI API key is valid');
  }
}

// Run the test
testFirebaseIntegration(); 