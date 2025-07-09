const https = require('https');

const options = {
  hostname: 'spanish-email-scheduler-ddurlh07o-jon-schubbes-projects.vercel.app',
  port: 443,
  path: '/api/cron',
  method: 'GET',
  headers: {
    'Authorization': 'Bearer my-secret-key-123'
  }
};

console.log('🧪 Testing Vercel endpoint...');

const req = https.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response:', data);
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.end(); 