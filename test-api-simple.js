const http = require('http');

function makeRequest(method, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/manage-prompts',
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => {
        body += chunk;
      });
      res.on('end', () => {
        try {
          const response = JSON.parse(body);
          resolve({ status: res.statusCode, data: response });
        } catch (e) {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function testAPI() {
  console.log('🧪 Testing API Endpoints...\n');
  
  try {
    // Test GET endpoint
    console.log('📖 Testing GET /api/manage-prompts...');
    const getResult = await makeRequest('GET');
    console.log('Status:', getResult.status);
    console.log('Response:', JSON.stringify(getResult.data, null, 2));
    
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
    
    const postResult = await makeRequest('POST', { prompts: testPrompts });
    console.log('Status:', postResult.status);
    console.log('Response:', JSON.stringify(postResult.data, null, 2));
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAPI(); 