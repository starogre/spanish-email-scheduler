import admin from 'firebase-admin';

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
    }),
  });
}

const db = admin.firestore();

export default async function handler(req, res) {
  // Disable caching for this endpoint
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  const authHeader = req.headers.authorization || '';
  const match = authHeader.match(/^Bearer (.+)$/);
  if (!match) return res.status(401).json({ success: false, error: 'No token' });

  try {
    const decoded = await admin.auth().verifyIdToken(match[1]);
    // Fetch user role from Firestore
    const userDoc = await db.collection('users').doc(decoded.uid).get();
    const userData = userDoc.exists ? userDoc.data() : {};
    const role = userData.role || 'user';

    res.status(200).json({ success: true, user: { uid: decoded.uid, email: decoded.email, role } });
  } catch (e) {
    res.status(401).json({ success: false, error: 'Invalid token' });
  }
} 