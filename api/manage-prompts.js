console.log('[manage-prompts] API file loaded');

// Use the already initialized Firebase from the main app
const admin = require('firebase-admin');
const db = admin.firestore();

console.log('[manage-prompts] Firebase module imported successfully');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  console.log(`[manage-prompts] Handling ${req.method} request`);

  try {
    if (req.method === 'GET') {
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
    } else if (req.method === 'POST') {
      console.log('[manage-prompts] Saving prompts...');
      const { prompts } = req.body;
      console.log('[manage-prompts] Received prompts:', prompts);
      if (!prompts) {
        return res.status(400).json({ success: false, error: 'Prompts data is required' });
      }
      await db.collection('config').doc('prompts').set(prompts, { merge: true });
      console.log('[manage-prompts] Prompts saved successfully');
      res.status(200).json({ success: true, message: 'Prompts updated successfully' });
    } else {
      res.status(405).json({ success: false, error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('[manage-prompts] Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}; 