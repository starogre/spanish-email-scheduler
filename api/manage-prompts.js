const admin = require('firebase-admin');

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

async function authenticateToken(req) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) throw { status: 401, message: 'Access token required' };
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    throw { status: 403, message: 'Invalid or expired token' };
  }
}

async function requireAdmin(uid) {
  const userRef = db.collection('users').doc(uid);
  const userDoc = await userRef.get();
  if (!userDoc.exists) throw { status: 403, message: 'User not found in database' };
  const userData = userDoc.data();
  if (userData.role !== 'admin') throw { status: 403, message: 'Admin access required' };
  return userData;
}

module.exports = async (req, res) => {
  try {
    const decoded = await authenticateToken(req);
    await requireAdmin(decoded.uid);

    if (req.method === 'GET') {
      const promptsDoc = await db.collection('config').doc('prompts').get();
      const prompts = promptsDoc.exists ? promptsDoc.data() : {};
      res.status(200).json({
        success: true,
        data: {
          prompts,
          recentTopics: [],
          lastUpdated: new Date().toISOString()
        }
      });
    } else if (req.method === 'POST') {
      const { prompts } = req.body;
      if (!prompts) {
        return res.status(400).json({ success: false, error: 'Prompts data is required' });
      }
      await db.collection('config').doc('prompts').set(prompts, { merge: true });
      res.status(200).json({ success: true, message: 'Prompts updated successfully' });
    } else {
      res.status(405).json({ success: false, error: 'Method not allowed' });
    }
  } catch (error) {
    const status = error.status || 500;
    const message = error.message || 'Internal server error';
    res.status(status).json({ success: false, error: message });
  }
}; 