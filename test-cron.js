require('dotenv').config();
const cron = require('./api/cron');

// Simulate a request object
const mockReq = {
  headers: {
    authorization: `Bearer ${process.env.CRON_SECRET}`
  }
};

const mockRes = {
  status: (code) => ({
    json: (data) => {
      console.log(`Status: ${code}`);
      console.log('Response:', JSON.stringify(data, null, 2));
    },
    end: (message) => {
      console.log(`Status: ${code}`);
      console.log('Response:', message);
    }
  })
};

console.log('🧪 Testing cron job...');
console.log('📧 This will generate and send a Spanish article email...');

// Run the cron job
cron(mockReq, mockRes); 