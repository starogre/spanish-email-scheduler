const { getPrompts, updatePrompts, getRecentTopics } = require('../services/firebaseService');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    switch (req.method) {
      case 'GET':
        // Get current prompts and recent topics
        const prompts = await getPrompts();
        const recentTopics = await getRecentTopics();
        
        res.status(200).json({
          success: true,
          data: {
            prompts,
            recentTopics,
            lastUpdated: new Date().toISOString()
          }
        });
        break;

      case 'POST':
        // Update prompts
        const { prompts: newPrompts } = req.body;
        
        if (!newPrompts) {
          return res.status(400).json({
            success: false,
            error: 'Prompts data is required'
          });
        }

        await updatePrompts(newPrompts);
        
        res.status(200).json({
          success: true,
          message: 'Prompts updated successfully',
          data: {
            lastUpdated: new Date().toISOString()
          }
        });
        break;

      default:
        res.status(405).json({
          success: false,
          error: 'Method not allowed'
        });
    }
  } catch (error) {
    console.error('Error in manage-prompts API:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: error.message
    });
  }
}; 