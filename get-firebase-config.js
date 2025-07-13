require('dotenv').config();
const admin = require('firebase-admin');

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
  }),
});

console.log('🔧 Firebase Configuration for Client-Side Setup\n');

console.log('Your Firebase Project ID:', process.env.FIREBASE_PROJECT_ID);
console.log('Your Firebase Project Domain:', `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`);

console.log('\n📝 Update the firebaseConfig in firebase-login.html with:');
console.log('```javascript');
console.log('const firebaseConfig = {');
console.log(`    apiKey: "YOUR_API_KEY", // Get this from Firebase Console > Project Settings > General > Web API Key`);
console.log(`    authDomain: "${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com",`);
console.log(`    projectId: "${process.env.FIREBASE_PROJECT_ID}",`);
console.log(`    storageBucket: "${process.env.FIREBASE_PROJECT_ID}.appspot.com",`);
console.log('    messagingSenderId: "YOUR_SENDER_ID", // Get this from Firebase Console > Project Settings > General');
console.log('    appId: "YOUR_APP_ID" // Get this from Firebase Console > Project Settings > General');
console.log('};');
console.log('```');

console.log('\n🔗 Steps to get the missing values:');
console.log('1. Go to Firebase Console: https://console.firebase.google.com/');
console.log(`2. Select your project: ${process.env.FIREBASE_PROJECT_ID}`);
console.log('3. Go to Project Settings (gear icon) > General');
console.log('4. Scroll down to "Your apps" section');
console.log('5. If no web app exists, click the web icon (</>) to add one');
console.log('6. Copy the apiKey, messagingSenderId, and appId values');
console.log('7. Update the firebaseConfig in firebase-login.html');

process.exit(0); 