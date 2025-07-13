require('dotenv').config();
const admin = require('firebase-admin');

console.log('🧪 Testing Firebase Connection...\n');

// Check environment variables
console.log('📋 Environment Variables Check:');
console.log('FIREBASE_PROJECT_ID:', process.env.FIREBASE_PROJECT_ID ? '✅ Set' : '❌ Missing');
console.log('FIREBASE_CLIENT_EMAIL:', process.env.FIREBASE_CLIENT_EMAIL ? '✅ Set' : '❌ Missing');
console.log('FIREBASE_PRIVATE_KEY:', process.env.FIREBASE_PRIVATE_KEY ? '✅ Set' : '❌ Missing');

if (process.env.FIREBASE_PRIVATE_KEY) {
  console.log('Private key length:', process.env.FIREBASE_PRIVATE_KEY.length);
  console.log('Private key starts with:', process.env.FIREBASE_PRIVATE_KEY.substring(0, 50) + '...');
}

console.log('\n🔧 Attempting Firebase initialization...');

try {
  // Initialize Firebase
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
  
  // Test Firestore connection
  const db = admin.firestore();
  console.log('✅ Firestore connection established!');
  
  // Test a simple read operation
  console.log('\n📖 Testing Firestore read operation...');
  const testDoc = await db.collection('test').doc('connection').get();
  console.log('✅ Firestore read operation successful!');
  
  console.log('\n🎉 Firebase connection test completed successfully!');
  console.log('✅ All Firebase services are working correctly');
  
} catch (error) {
  console.error('\n❌ Firebase connection failed:', error.message);
  
  if (error.message.includes('project_id')) {
    console.log('\n🔍 Troubleshooting:');
    console.log('1. Check that FIREBASE_PROJECT_ID is set correctly');
    console.log('2. Verify the project ID matches your Firebase project');
  } else if (error.message.includes('private key')) {
    console.log('\n🔍 Troubleshooting:');
    console.log('1. Check that FIREBASE_PRIVATE_KEY is properly formatted');
    console.log('2. Make sure newlines are escaped with \\n');
    console.log('3. Ensure the key is wrapped in quotes');
  } else if (error.message.includes('DECODER')) {
    console.log('\n🔍 Troubleshooting:');
    console.log('1. The private key format is incorrect');
    console.log('2. Try copying the private key again from Firebase console');
    console.log('3. Make sure to include the BEGIN and END markers');
  }
} 