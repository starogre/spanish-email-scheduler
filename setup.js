const fs = require('fs');
const path = require('path');

console.log('🇪🇸 Spanish Email Scheduler Setup\n');

// Check if .env file exists
const envPath = path.join(__dirname, '.env');
const envExists = fs.existsSync(envPath);

if (!envExists) {
  console.log('📝 Creating .env file from template...');
  
  // Copy from env.example if it exists
  const examplePath = path.join(__dirname, 'env.example');
  if (fs.existsSync(examplePath)) {
    fs.copyFileSync(examplePath, envPath);
    console.log('✅ .env file created from template');
  } else {
    // Create basic .env file
    const envContent = `# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Mailgun Configuration
MAILGUN_API_KEY=your_mailgun_api_key_here
MAILGUN_DOMAIN=your_mailgun_domain_here

# Email Configuration
RECIPIENT_EMAIL=your_email@example.com
SENDER_EMAIL=noreply@yourdomain.com

# App Configuration
SCHEDULE_TIME=09:00
TIMEZONE=America/New_York
`;
    fs.writeFileSync(envPath, envContent);
    console.log('✅ .env file created');
  }
} else {
  console.log('✅ .env file already exists');
}

console.log('\n📋 Next Steps:');
console.log('1. Edit the .env file with your actual API keys and email addresses');
console.log('2. Get your OpenAI API key from: https://platform.openai.com/api-keys');
console.log('3. Get your Mailgun API key from: https://app.mailgun.com/app/account/security/api_keys');
console.log('4. Test the setup with: node test.js');
console.log('5. Run the scheduler with: npm start');
console.log('\n📚 For detailed instructions, see README.md'); 