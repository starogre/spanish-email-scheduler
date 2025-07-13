const fetch = require('node-fetch');

async function testAPI() {
  console.log('🧪 Testing API Endpoints...\n');
  
  try {
    // Test GET endpoint
    console.log('📖 Testing GET /api/manage-prompts...');
    const getResponse = await fetch('http://localhost:3000/api/manage-prompts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (getResponse.ok) {
      const getData = await getResponse.json();
      console.log('✅ GET request successful');
      console.log('📊 Response:', JSON.stringify(getData, null, 2));
    } else {
      console.log('❌ GET request failed:', getResponse.status, getResponse.statusText);
    }
    
    // Test POST endpoint
    console.log('\n📝 Testing POST /api/manage-prompts...');
    const testPrompts = {
      articlePrompt: {
        system: "Test system prompt",
        user: "Test user prompt"
      },
      conceptsPrompt: {
        system: "Test concepts system",
        user: "Test concepts user"
      },
      topics: ["test topic 1", "test topic 2"]
    };
    
    const postResponse = await fetch('http://localhost:3000/api/manage-prompts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompts: testPrompts })
    });
    
    if (postResponse.ok) {
      const postData = await postResponse.json();
      console.log('✅ POST request successful');
      console.log('📊 Response:', JSON.stringify(postData, null, 2));
    } else {
      const errorText = await postResponse.text();
      console.log('❌ POST request failed:', postResponse.status, postResponse.statusText);
      console.log('Error details:', errorText);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAPI(); 