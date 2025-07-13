require('dotenv').config();
const admin = require('firebase-admin');

// Initialize Firebase Admin (lazy load to avoid multiple initializations)
let db;
function getFirestore() {
  if (!db) {
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY,
        }),
      });
    }
    db = admin.firestore();
  }
  return db;
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { email, difficultyLevel, name } = req.body;

    // Validate required fields
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email is required' });
    }

    if (!difficultyLevel || !['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].includes(difficultyLevel)) {
      return res.status(400).json({ error: 'Valid difficulty level is required' });
    }

    const firestore = getFirestore();

    // Check if user already exists
    const existingUser = await firestore
      .collection('users')
      .where('email', '==', email.toLowerCase())
      .get();

    if (!existingUser.empty) {
      return res.status(409).json({ 
        error: 'User with this email already exists',
        message: 'You are already registered for daily Spanish emails!' 
      });
    }

    // Create new user
    const userData = {
      email: email.toLowerCase(),
      difficultyLevel,
      name: name || email.split('@')[0], // Use email prefix as name if not provided
      isActive: true,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      lastEmailSent: null,
      emailCount: 0
    };

    const userRef = await firestore.collection('users').add(userData);

    console.log(`✅ New user registered: ${email} (${difficultyLevel})`);

    return res.status(201).json({
      success: true,
      message: 'Successfully registered for daily Spanish emails!',
      userId: userRef.id,
      user: {
        email: userData.email,
        difficultyLevel: userData.difficultyLevel,
        name: userData.name
      }
    });

  } catch (error) {
    console.error('❌ Error registering user:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to register user. Please try again.',
      details: error.message
    });
  }
} 