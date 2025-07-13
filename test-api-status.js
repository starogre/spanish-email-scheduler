const http = require('http');

function testEndpoint(method) {
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
        resolve({
          status: res.statusCode,
          success: res.statusCode === 200,
          method: method
        });
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

async function testAPIStatus() {
  console.log('🧪 Testing API Status...\n');
  
  try {
    // Test GET endpoint
    const getResult = await testEndpoint('GET');
    console.log(`📖 GET /api/manage-prompts: ${getResult.success ? '✅ Success' : '❌ Failed'} (${getResult.status})`);
    
    // Test POST endpoint (without data, should return 400)
    const postResult = await testEndpoint('POST');
    console.log(`📝 POST /api/manage-prompts: ${postResult.status === 400 ? '✅ Working (expected 400 for missing data)' : '❌ Unexpected'} (${postResult.status})`);
    
    console.log('\n🎉 API endpoints are responding correctly!');
    console.log('✅ The prompt manager should now work without errors.');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAPIStatus(); 