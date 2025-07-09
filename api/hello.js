module.exports = async (req, res) => {
  res.status(200).json({ 
    message: 'Hello from Vercel!',
    timestamp: new Date().toISOString(),
    env: {
      hasOpenAI: !!process.env.OPENAI_API_KEY,
      hasMailgun: !!process.env.MAILGUN_API_KEY,
      hasCronSecret: !!process.env.CRON_SECRET
    }
  });
}; 