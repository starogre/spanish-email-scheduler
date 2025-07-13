const express = require('express');
const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.path}`);
  next();
});

// Test endpoints
app.get('/test', (req, res) => {
  console.log('✅ GET /test hit');
  res.json({ message: 'GET works!' });
});

app.post('/test', (req, res) => {
  console.log('✅ POST /test hit');
  console.log('Body:', req.body);
  res.json({ message: 'POST works!', body: req.body });
});

app.listen(PORT, () => {
  console.log(`🚀 Test server running on port ${PORT}`);
}); 