require('dotenv').config();

console.log('🔍 Environment Variables Debug\n');

console.log('📋 Firebase Variables:');
console.log('FIREBASE_PROJECT_ID:', process.env.FIREBASE_PROJECT_ID ? `"${process.env.FIREBASE_PROJECT_ID}"` : '❌ NOT SET');
console.log('FIREBASE_CLIENT_EMAIL:', process.env.FIREBASE_CLIENT_EMAIL ? `"${process.env.FIREBASE_CLIENT_EMAIL}"` : '❌ NOT SET');
console.log('FIREBASE_PRIVATE_KEY:', process.env.FIREBASE_PRIVATE_KEY ? `"${process.env.FIREBASE_PRIVATE_KEY.substring(0, 50)}..."` : '❌ NOT SET');

if (process.env.FIREBASE_PRIVATE_KEY) {
  console.log('\n🔑 Private Key Analysis:');
  console.log('Length:', process.env.FIREBASE_PRIVATE_KEY.length);
  console.log('Starts with:', process.env.FIREBASE_PRIVATE_KEY.substring(0, 30));
  console.log('Contains BEGIN:', process.env.FIREBASE_PRIVATE_KEY.includes('-----BEGIN PRIVATE KEY-----'));
  console.log('Contains END:', process.env.FIREBASE_PRIVATE_KEY.includes('-----END PRIVATE KEY-----'));
  console.log('Contains \\n:', process.env.FIREBASE_PRIVATE_KEY.includes('\\n'));
}

console.log('\n📋 Other Variables:');
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? '✅ Set' : '❌ NOT SET');
console.log('MAILGUN_API_KEY:', process.env.MAILGUN_API_KEY ? '✅ Set' : '❌ NOT SET');

console.log('\n🔧 Testing Firebase initialization...');

try {
  const admin = require('firebase-admin');
  
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      })
    });
  }
  
  console.log('✅ Firebase initialized successfully!');
  console.log('✅ Project ID being used:', process.env.FIREBASE_PROJECT_ID);
  
} catch (error) {
  console.error('❌ Firebase initialization failed:', error.message);
  
  if (error.message.includes('project_id')) {
    console.log('\n🔍 The error suggests FIREBASE_PROJECT_ID is not being read correctly.');
    console.log('Please check your .env file and ensure:');
    console.log('1. The file is named exactly ".env" (with the dot)');
    console.log('2. The variable is named exactly "FIREBASE_PROJECT_ID"');
    console.log('3. There are no spaces around the equals sign');
    console.log('4. The value is not wrapped in quotes');
  }
} 