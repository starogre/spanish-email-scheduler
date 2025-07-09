require('dotenv').config();
const { generateSpanishArticle } = require('./services/openaiService');

async function testArticleGeneration() {
  console.log('🧪 Testing Spanish Article Generation...\n');
  
  try {
    // Test article generation
    const articleData = await generateSpanishArticle();
    
    console.log('✅ Article generated successfully!\n');
    console.log('📰 Title:', articleData.title);
    console.log('📚 Topic:', articleData.topic);
    console.log('📅 Date:', articleData.date);
    console.log('\n📖 Article:');
    console.log(articleData.article);
    console.log('\n📚 Grammar Concepts:');
    console.log(articleData.concepts);
    
  } catch (error) {
    console.error('❌ Error generating article:', error.message);
    
    if (error.message.includes('API key')) {
      console.log('\n💡 Make sure you have set your OPENAI_API_KEY in the .env file');
    }
  }
}

// Run the test
testArticleGeneration(); 