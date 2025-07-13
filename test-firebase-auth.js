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

async function testFirebaseAuth() {
  console.log('🧪 Testing Firebase Auth Configuration...\n');

  try {
    // Test 1: Check if we can access Firebase Auth
    console.log('1️⃣ Testing Firebase Auth access...');
    const auth = admin.auth();
    console.log('✅ Firebase Auth initialized successfully');

    // Test 2: Check if we can list users (this will fail if Auth is not enabled)
    console.log('\n2️⃣ Testing user listing...');
    try {
      const listUsersResult = await auth.listUsers(1);
      console.log('✅ Firebase Auth is enabled and working');
      console.log(`   Found ${listUsersResult.users.length} users`);
    } catch (error) {
      if (error.code === 'auth/operation-not-allowed') {
        console.log('❌ Firebase Auth is not enabled in your project');
        console.log('   Go to Firebase Console > Authentication > Sign-in method');
        console.log('   Enable "Email/Password" provider');
      } else {
        console.log('❌ Firebase Auth error:', error.message);
      }
    }

    // Test 3: Check Firestore connection
    console.log('\n3️⃣ Testing Firestore connection...');
    const db = admin.firestore();
    const testDoc = await db.collection('test').doc('connection').get();
    console.log('✅ Firestore connection working');

    // Test 4: Check environment variables
    console.log('\n4️⃣ Checking environment variables...');
    const requiredVars = ['FIREBASE_PROJECT_ID', 'FIREBASE_CLIENT_EMAIL', 'FIREBASE_PRIVATE_KEY'];
    let allVarsPresent = true;
    
    requiredVars.forEach(varName => {
      if (process.env[varName]) {
        console.log(`   ✅ ${varName}: Set`);
      } else {
        console.log(`   ❌ ${varName}: Missing`);
        allVarsPresent = false;
      }
    });

    if (!allVarsPresent) {
      console.log('\n⚠️  Missing environment variables. Check your .env file.');
    } else {
      console.log('\n✅ All required environment variables are set');
    }

    // Test 5: Check if admin user exists
    console.log('\n5️⃣ Checking for admin user...');
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    try {
      const userRecord = await auth.getUserByEmail(adminEmail);
      console.log(`✅ Admin user found: ${userRecord.email} (${userRecord.uid})`);
      
      // Check Firestore document
      const userRef = db.collection('users').doc(userRecord.uid);
      const userDoc = await userRef.get();
      
      if (userDoc.exists) {
        const userData = userDoc.data();
        console.log(`   Role: ${userData.role}`);
        console.log(`   Name: ${userData.name}`);
      } else {
        console.log('   ⚠️  User document not found in Firestore');
      }
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        console.log(`❌ Admin user not found: ${adminEmail}`);
        console.log('   Run: node create-admin-user.js');
      } else {
        console.log('❌ Error checking admin user:', error.message);
      }
    }

  } catch (error) {
    console.error('❌ Firebase initialization error:', error.message);
    
    if (error.code === 'app/duplicate-app') {
      console.log('   Firebase app already initialized');
    } else if (error.code === 'app/invalid-credential') {
      console.log('   Invalid Firebase credentials');
      console.log('   Check your service account key and environment variables');
    }
  }

  console.log('\n🎯 Firebase Auth test completed!');
  process.exit(0);
}

// Run the test
testFirebaseAuth(); 