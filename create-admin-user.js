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

const db = admin.firestore();

async function createAdminUser() {
  try {
    console.log('🔧 Creating admin user with Firebase Auth...');
    
    // Get admin details from environment
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123456';
    const adminName = process.env.ADMIN_NAME || 'Admin User';
    
    console.log(`📧 Admin Email: ${adminEmail}`);
    console.log(`👤 Admin Name: ${adminName}`);
    
    // Check if user already exists in Firebase Auth
    try {
      const userRecord = await admin.auth().getUserByEmail(adminEmail);
      console.log('⚠️  Admin user already exists in Firebase Auth!');
      console.log(`   User ID: ${userRecord.uid}`);
      
      // Check if user exists in Firestore
      const userRef = db.collection('users').doc(userRecord.uid);
      const userDoc = await userRef.get();
      
      if (userDoc.exists) {
        const userData = userDoc.data();
        console.log(`   Role: ${userData.role}`);
        
        // Update role to admin if not already
        if (userData.role !== 'admin') {
          await userRef.update({
            role: 'admin',
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
          });
          console.log('✅ Updated existing user to admin role');
        } else {
          console.log('✅ User is already an admin');
        }
      } else {
        // Create user document in Firestore
        await userRef.set({
          email: adminEmail,
          name: adminName,
          role: 'admin',
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          lastLogin: admin.firestore.FieldValue.serverTimestamp()
        });
        console.log('✅ Created admin user document in Firestore');
      }
      
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        console.log('📝 Creating new admin user...');
        
        // Create user in Firebase Auth
        const userRecord = await admin.auth().createUser({
          email: adminEmail,
          password: adminPassword,
          displayName: adminName
        });
        
        console.log('✅ Admin user created in Firebase Auth!');
        console.log(`   User ID: ${userRecord.uid}`);
        
        // Create user document in Firestore
        const userRef = db.collection('users').doc(userRecord.uid);
        await userRef.set({
          email: adminEmail,
          name: adminName,
          role: 'admin',
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          lastLogin: admin.firestore.FieldValue.serverTimestamp()
        });
        
        console.log('✅ Admin user document created in Firestore!');
        console.log(`   Email: ${adminEmail}`);
        console.log(`   Password: ${adminPassword}`);
        console.log(`   Role: admin`);
        console.log('');
        console.log('🔐 You can now log in at: http://localhost:3000/login');
        console.log('⚠️  Please change the password after first login!');
      } else {
        throw error;
      }
    }

  } catch (error) {
    console.error('❌ Error creating admin user:', error);
  } finally {
    process.exit(0);
  }
}

// Run the script
createAdminUser(); 