const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
});

function createEmailHTML(articleData) {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tu Artículo de Español del Día</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .container {
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            border-bottom: 3px solid #e74c3c;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            color: #e74c3c;
            margin: 0;
            font-size: 28px;
        }
        .date {
            color: #7f8c8d;
            font-size: 14px;
            margin-top: 5px;
        }
        .topic {
            background-color: #3498db;
            color: white;
            padding: 8px 15px;
            border-radius: 20px;
            display: inline-block;
            font-size: 14px;
            margin-bottom: 20px;
        }
        .article {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #3498db;
            margin-bottom: 30px;
        }
        .article h2 {
            color: #2c3e50;
            margin-top: 0;
            font-size: 22px;
        }
        .concepts {
            background-color: #fff3cd;
            padding: 20px;
            border-radius: 8px;
            border-left: 4px solid #ffc107;
        }
        .concepts h3 {
            color: #856404;
            margin-top: 0;
            font-size: 20px;
        }
        .concept-item {
            margin-bottom: 15px;
            padding: 10px;
            background-color: white;
            border-radius: 5px;
        }
        .concept-item strong {
            color: #e74c3c;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            color: #7f8c8d;
            font-size: 12px;
        }
        .highlight {
            background-color: #fff3cd;
            padding: 2px 4px;
            border-radius: 3px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🇪🇸 Tu Artículo de Español</h1>
            <div class="date">${articleData.date}</div>
        </div>
        
        <div class="topic">📰 Tema: ${articleData.topic}</div>
        
        <div class="article">
            <h2>${articleData.title}</h2>
            ${articleData.article.replace(/\n/g, '<br>')}
        </div>
        
        <div class="concepts">
            <h3>📚 Conceptos Clave para Aprender</h3>
            ${formatConcepts(articleData.concepts)}
        </div>
        
        <div class="footer">
            <p>¡Sigue aprendiendo español cada día! 🇪🇸</p>
            <p>Este email fue generado automáticamente para ayudarte en tu aprendizaje.</p>
        </div>
    </div>
</body>
</html>
  `;
}

function formatConcepts(concepts) {
  // Split concepts by numbered lines and format them
  const conceptLines = concepts.split(/\d+\./).filter(line => line.trim());
  
  return conceptLines.map((concept, index) => {
    const lines = concept.trim().split('\n').filter(line => line.trim());
    if (lines.length >= 2) {
      const [conceptText, exampleText] = lines;
      return `
        <div class="concept-item">
          <strong>${index + 1}. ${conceptText}</strong><br>
          <em>${exampleText}</em>
        </div>
      `;
    }
    return `
      <div class="concept-item">
        <strong>${index + 1}. ${concept}</strong>
      </div>
    `;
  }).join('');
}

function createEmailText(articleData) {
  return `
🇪🇸 Tu Artículo de Español del Día
${articleData.date}

📰 Tema: ${articleData.topic}

${articleData.title}

${articleData.article}

📚 Conceptos Clave para Aprender:

${articleData.concepts}

¡Sigue aprendiendo español cada día! 🇪🇸
  `.trim();
}

async function sendEmail(articleData) {
  try {
    const emailData = {
      from: process.env.SENDER_EMAIL,
      to: process.env.RECIPIENT_EMAIL,
      subject: `🇪🇸 Tu Artículo de Español del Día - ${articleData.title}`,
      html: createEmailHTML(articleData),
      text: createEmailText(articleData)
    };

    const response = await mg.messages.create(process.env.MAILGUN_DOMAIN, emailData);
    
    console.log('Email sent successfully:', response.id);
    return response;
    
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}

module.exports = {
  sendEmail
}; 