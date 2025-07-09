# 🇪🇸 Spanish Email Scheduler

A Node.js application that automatically sends daily Spanish news articles to help you learn Spanish at A2-B1 level. Each email includes a fake news article and grammar concepts with explanations.

## ✨ Features

- **Daily Spanish News Articles**: AI-generated fake news articles at A2-B1 CEFR level
- **Grammar Learning**: Key concepts extracted and explained from each article
- **Beautiful Email Formatting**: Professional HTML emails with responsive design
- **Flexible Scheduling**: Customizable daily schedule
- **Multiple Topics**: Articles cover various interesting subjects
- **Educational Focus**: Designed specifically for language learning

## 🛠️ Tech Stack

- **Node.js** - Runtime environment
- **OpenAI API** - Article and grammar concept generation
- **Mailgun** - Email delivery service
- **node-cron** - Task scheduling
- **dotenv** - Environment variable management

## 📋 Prerequisites

Before you begin, you'll need:

1. **OpenAI API Key** - Get one at [OpenAI Platform](https://platform.openai.com/api-keys)
2. **Mailgun Account** - Sign up at [Mailgun](https://www.mailgun.com/)
   - API Key
   - Domain (or use sandbox domain for testing)
3. **Node.js** (v14 or higher)

## 🚀 Setup Instructions

### 1. Clone and Install Dependencies

```bash
# Install dependencies
npm install
```

### 2. Environment Configuration

Copy the environment template and configure your settings:

```bash
# Copy the environment template
cp env.example .env
```

Edit the `.env` file with your actual values:

```env
# OpenAI API Configuration
OPENAI_API_KEY=sk-your-openai-api-key-here

# Mailgun Configuration
MAILGUN_API_KEY=key-your-mailgun-api-key-here
MAILGUN_DOMAIN=your-domain.com

# Email Configuration
RECIPIENT_EMAIL=your-email@example.com
SENDER_EMAIL=noreply@yourdomain.com

# App Configuration
SCHEDULE_TIME=09:00
TIMEZONE=America/New_York
```

### 3. Mailgun Setup

1. **Create a Mailgun Account**:
   - Go to [Mailgun](https://www.mailgun.com/) and sign up
   - Verify your domain or use the sandbox domain for testing

2. **Get Your API Key**:
   - In Mailgun dashboard, go to Settings → API Keys
   - Copy your private API key

3. **Domain Configuration**:
   - For testing: Use the sandbox domain provided by Mailgun
   - For production: Add and verify your own domain

### 4. Test the Application

```bash
# Run in development mode (sends immediate test email)
NODE_ENV=development npm start
```

### 5. Production Deployment

#### Option A: Vercel (Recommended - Free)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Go to your project → Settings → Environment Variables
```

**Vercel automatically handles the cron scheduling** - no need to run a continuous server!

#### Option B: Railway (Easy - $5/month)

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up

# Set environment variables
railway variables set OPENAI_API_KEY=your-key
railway variables set MAILGUN_API_KEY=your-key
# ... set other variables
```

#### Option C: DigitalOcean Droplet (More Control - $6/month)

```bash
# SSH into your droplet
ssh root@your-server-ip

# Clone your repository
git clone https://github.com/yourusername/spanish-email-scheduler.git
cd spanish-email-scheduler

# Run deployment script
chmod +x deploy.sh
./deploy.sh

# Set environment variables
nano .env
# Add your API keys and email settings
```

#### Option D: Local Server (with PM2)

```bash
# Install PM2 globally
npm install -g pm2

# Start the application
pm2 start index.js --name "spanish-email-scheduler"

# Set up PM2 to start on boot
pm2 startup
pm2 save
```

## 📧 Email Format

Each email includes:

- **Header**: Date and Spanish flag emoji
- **Topic**: The article's subject area
- **Article**: A2-B1 level fake news article (max 200 words)
- **Grammar Concepts**: 4 key learning points with explanations and examples
- **Responsive Design**: Works on desktop and mobile

## ⏰ Scheduling

The app uses cron scheduling with these options:

- **Default**: Daily at 9:00 AM
- **Custom**: Set `SCHEDULE_TIME` in environment variables
- **Timezone**: Configure with `TIMEZONE` variable

### Cron Format
```
minute hour day month day-of-week
```

Examples:
- `0 9 * * *` - Daily at 9:00 AM
- `0 18 * * 1-5` - Weekdays at 6:00 PM
- `30 7 * * 0` - Sundays at 7:30 AM

## 🔧 Configuration Options

| Variable | Description | Default |
|----------|-------------|---------|
| `SCHEDULE_TIME` | Daily email time (HH:MM) | `09:00` |
| `TIMEZONE` | Timezone for scheduling | `America/New_York` |
| `NODE_ENV` | Environment mode | `production` |

## 📚 Learning Features

### Article Topics
- Technology & Innovation
- Environment & Sustainability
- Culture & Entertainment
- Sports & Health
- Travel & Tourism
- Food & Gastronomy
- Education & Learning
- Business & Economy
- Art & Music
- Science & Discoveries

### Grammar Concepts
Each article includes 4 key learning points:
- Vocabulary usage
- Grammar structures
- Common expressions
- Cultural context

## 🐛 Troubleshooting

### Common Issues

1. **Email not sending**:
   - Check Mailgun API key and domain
   - Verify sender email is authorized
   - Check Mailgun logs

2. **OpenAI API errors**:
   - Verify API key is correct
   - Check API usage limits
   - Ensure sufficient credits

3. **Scheduling issues**:
   - Verify timezone setting
   - Check cron format
   - Ensure server time is correct

### Debug Mode

```bash
# Run with debug logging
DEBUG=* npm start
```

## 📝 API Usage

### OpenAI API
- **Model**: GPT-3.5-turbo
- **Tokens**: ~400 per article + ~500 per concepts
- **Estimated Cost**: ~$0.01-0.02 per email

### Mailgun API
- **Free Tier**: 5,000 emails/month
- **Rate Limit**: 10 emails/second

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

If you encounter issues:

1. Check the troubleshooting section
2. Review environment configuration
3. Check API service status
4. Open an issue on GitHub

---

**¡Feliz aprendizaje! 🇪🇸** 