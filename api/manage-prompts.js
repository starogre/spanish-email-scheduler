const express = require('express');
const admin = require('firebase-admin');

const router = express.Router();
const db = admin.firestore();

// Middleware to verify Firebase Auth token
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, error: 'Access token required' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(403).json({ success: false, error: 'Invalid or expired token' });
  }
};

// Middleware to check if user is admin (check Firestore user document)
const requireAdmin = async (req, res, next) => {
  try {
    const userRef = db.collection('users').doc(req.user.uid);
    const userDoc = await userRef.get();
    
    if (!userDoc.exists) {
      return res.status(403).json({ success: false, error: 'User not found in database' });
    }
    
    const userData = userDoc.data();
    if (userData.role !== 'admin') {
      return res.status(403).json({ success: false, error: 'Admin access required' });
    }
    
    req.userData = userData;
    next();
  } catch (error) {
    console.error('Admin check error:', error);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

console.log('[manage-prompts] API file loaded with authentication');

// Apply authentication to all routes
router.use(authenticateToken);
router.use(requireAdmin);

// GET - Retrieve prompts
router.get('/', async (req, res) => {
  try {
    console.log('[manage-prompts] Getting prompts...');
    const promptsDoc = await db.collection('config').doc('prompts').get();
    const prompts = promptsDoc.exists ? promptsDoc.data() : {};
    console.log('[manage-prompts] Got prompts:', prompts);
    
    res.status(200).json({ 
      success: true, 
      data: {
        prompts,
        recentTopics: [],
        lastUpdated: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('[manage-prompts] Error getting prompts:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// POST - Save prompts
router.post('/', async (req, res) => {
  try {
    console.log('[manage-prompts] Saving prompts...');
    const { prompts } = req.body;
    console.log('[manage-prompts] Received prompts:', prompts);
    
    if (!prompts) {
      return res.status(400).json({ success: false, error: 'Prompts data is required' });
    }
    
    await db.collection('config').doc('prompts').set(prompts, { merge: true });
    console.log('[manage-prompts] Prompts saved successfully');
    
    res.status(200).json({ success: true, message: 'Prompts updated successfully' });
  } catch (error) {
    console.error('[manage-prompts] Error saving prompts:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router; 