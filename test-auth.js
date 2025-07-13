const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';

async function testAuth() {
  console.log('🧪 Testing Authentication System...\n');

  try {
    // Test 1: Register a new user
    console.log('1️⃣ Testing user registration...');
    const registerResponse = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'testpass123',
        name: 'Test User'
      })
    });

    const registerData = await registerResponse.json();
    console.log('Registration result:', registerData.success ? '✅ Success' : '❌ Failed');
    if (!registerData.success) {
      console.log('   Error:', registerData.error);
    }

    // Test 2: Login with the user
    console.log('\n2️⃣ Testing user login...');
    const loginResponse = await fetch(`${BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'testpass123'
      })
    });

    const loginData = await loginResponse.json();
    console.log('Login result:', loginData.success ? '✅ Success' : '❌ Failed');
    
    if (loginData.success) {
      console.log('   Token received:', loginData.token ? '✅' : '❌');
      console.log('   User role:', loginData.user.role);
      
      const token = loginData.token;

      // Test 3: Get user profile
      console.log('\n3️⃣ Testing profile retrieval...');
      const profileResponse = await fetch(`${BASE_URL}/api/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const profileData = await profileResponse.json();
      console.log('Profile result:', profileData.success ? '✅ Success' : '❌ Failed');
      if (profileData.success) {
        console.log('   User name:', profileData.user.name);
        console.log('   User role:', profileData.user.role);
      }

      // Test 4: Test prompt manager access (should fail for regular user)
      console.log('\n4️⃣ Testing prompt manager access (should fail for regular user)...');
      const promptsResponse = await fetch(`${BASE_URL}/api/manage-prompts`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const promptsData = await promptsResponse.json();
      console.log('Prompt manager access:', promptsData.success ? '❌ Should have failed' : '✅ Correctly denied');
      if (!promptsData.success) {
        console.log('   Error:', promptsData.error);
      }

    } else {
      console.log('   Error:', loginData.error);
    }

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }

  console.log('\n🎯 Authentication system test completed!');
}

// Run the test
testAuth(); 