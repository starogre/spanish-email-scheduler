// Theme configuration mapping topics to color schemes and SVG icons
const themeConfig = {
  technology: {
    primaryColor: '#0ea5e9',
    secondaryColor: '#e0f2fe',
    topicIcon: `<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="8" width="16" height="8" rx="2" fill="#0ea5e9"/><rect x="8" y="6" width="8" height="4" rx="1" fill="#38bdf8"/></svg>`
  },
  environment: {
    primaryColor: '#22c55e',
    secondaryColor: '#dcfce7',
    topicIcon: `<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#22c55e"/><ellipse cx="12" cy="16" rx="6" ry="3" fill="#bbf7d0"/></svg>`
  },
  culture: {
    primaryColor: '#f59e42',
    secondaryColor: '#fff7ed',
    topicIcon: `<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="8" width="12" height="8" rx="4" fill="#f59e42"/><circle cx="12" cy="12" r="3" fill="#fdba74"/></svg>`
  },
  sports: {
    primaryColor: '#f43f5e',
    secondaryColor: '#ffe4e6',
    topicIcon: `<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#f43f5e"/><circle cx="12" cy="12" r="5" fill="#fff"/></svg>`
  },
  travel: {
    primaryColor: '#06b6d4',
    secondaryColor: '#cffafe',
    topicIcon: `<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="10" width="16" height="8" rx="2" fill="#06b6d4"/><rect x="8" y="6" width="8" height="4" rx="1" fill="#67e8f9"/></svg>`
  },
  food: {
    primaryColor: '#eab308',
    secondaryColor: '#fef9c3',
    topicIcon: `<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="12" cy="16" rx="7" ry="4" fill="#eab308"/><circle cx="12" cy="10" r="4" fill="#fde047"/></svg>`
  },
  education: {
    primaryColor: '#6366f1',
    secondaryColor: '#e0e7ff',
    topicIcon: `<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="14" width="12" height="4" rx="2" fill="#6366f1"/><rect x="8" y="6" width="8" height="8" rx="2" fill="#a5b4fc"/></svg>`
  },
  business: {
    primaryColor: '#f97316',
    secondaryColor: '#ffedd5',
    topicIcon: `<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="8" width="12" height="8" rx="2" fill="#f97316"/><rect x="10" y="12" width="4" height="4" rx="1" fill="#fdba74"/></svg>`
  },
  art: {
    primaryColor: '#a21caf',
    secondaryColor: '#f3e8ff',
    topicIcon: `<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="12" cy="12" rx="8" ry="5" fill="#a21caf"/><circle cx="12" cy="12" r="3" fill="#e9d5ff"/></svg>`
  },
  science: {
    primaryColor: '#0d9488',
    secondaryColor: '#ccfbf1',
    topicIcon: `<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="8" width="8" height="8" rx="4" fill="#0d9488"/><circle cx="12" cy="12" r="2" fill="#99f6e4"/></svg>`
  },
  music: {
    primaryColor: '#f472b6',
    secondaryColor: '#fdf2f8',
    topicIcon: `<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="8" width="8" height="8" rx="4" fill="#f472b6"/><rect x="12" y="12" width="4" height="4" rx="2" fill="#fbcfe8"/></svg>`
  },
  health: {
    primaryColor: '#16a34a',
    secondaryColor: '#dcfce7',
    topicIcon: `<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="12" cy="16" rx="6" ry="3" fill="#16a34a"/><circle cx="12" cy="10" r="4" fill="#bbf7d0"/></svg>`
  },
  history: {
    primaryColor: '#b45309',
    secondaryColor: '#fef3c7',
    topicIcon: `<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="8" width="12" height="8" rx="2" fill="#b45309"/><rect x="10" y="12" width="4" height="4" rx="1" fill="#fde68a"/></svg>`
  },
  fashion: {
    primaryColor: '#e11d48',
    secondaryColor: '#fce7f3',
    topicIcon: `<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="12" cy="12" rx="8" ry="5" fill="#e11d48"/><circle cx="12" cy="12" r="3" fill="#fbcfe8"/></svg>`
  },
  politics: {
    primaryColor: '#2563eb',
    secondaryColor: '#dbeafe',
    topicIcon: `<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="8" width="12" height="8" rx="2" fill="#2563eb"/><rect x="10" y="12" width="4" height="4" rx="1" fill="#93c5fd"/></svg>`
  },
  // ... add more themes up to 40+ as needed ...
  default: {
    primaryColor: '#64748b',
    secondaryColor: '#f1f5f9',
    topicIcon: `<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" fill="#64748b"/></svg>`
  }
};

// Map keywords to theme keys for intelligent theme assignment
const topicKeywordsToTheme = {
  'tecnología': 'technology',
  'innovación': 'technology',
  'medio ambiente': 'environment',
  'sostenibilidad': 'environment',
  'cultura': 'culture',
  'entretenimiento': 'culture',
  'deportes': 'sports',
  'salud': 'health',
  'viajes': 'travel',
  'turismo': 'travel',
  'comida': 'food',
  'gastronomía': 'food',
  'educación': 'education',
  'aprendizaje': 'education',
  'negocios': 'business',
  'economía': 'business',
  'arte': 'art',
  'música': 'music',
  'ciencia': 'science',
  'descubrimientos': 'science',
  'historia': 'history',
  'moda': 'fashion',
  'política': 'politics',
  // ... add more keyword mappings as you add more themes ...
};

function getThemeForTopic(topic) {
  if (!topic) return themeConfig.default;
  const key = topic.toLowerCase();
  // Try to match keywords to a theme
  for (const keyword in topicKeywordsToTheme) {
    if (key.includes(keyword)) {
      const themeKey = topicKeywordsToTheme[keyword];
      if (themeConfig[themeKey]) return themeConfig[themeKey];
    }
  }
  return themeConfig.default;
}

function createEmailHTML(articleData) {
  const theme = getThemeForTopic(articleData.topic);
  return `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tu Artículo de Español del Día</title>
    <!-- Google Fonts: Fredoka for headers, Inter for body -->
    <link href="https://fonts.googleapis.com/css2?family=Fredoka:wght@700&family=Inter:wght@400;600&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.7;
            color: #333;
            max-width: 650px;
            margin: 0 auto;
            padding: 0;
            background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
        }
        .container {
            background: #fff;
            padding: 0 0 32px 0;
            border-radius: 22px;
            box-shadow: 0 6px 32px 0 rgba(80, 80, 180, 0.10), 0 1.5px 6px 0 rgba(80, 80, 180, 0.08);
            margin-top: 40px;
            margin-bottom: 40px;
        }
        .header-card {
            background: linear-gradient(90deg, ${theme.primaryColor} 0%, #a5b4fc 100%);
            border-radius: 16px 16px 0 0;
            color: #fff;
            padding: 32px 32px 20px 32px;
            text-align: left;
            box-shadow: 0 2px 12px 0 rgba(80, 80, 180, 0.08);
            position: relative;
        }
        .header-card .article-title {
            font-family: 'Fredoka', 'Inter', 'Segoe UI', sans-serif;
            font-size: 1.45rem;
            font-weight: 700;
            margin: 0 0 8px 0;
            letter-spacing: 0.2px;
        }
        .header-card .date {
            color: #e0e7ff;
            font-size: 1rem;
            margin-top: 2px;
        }
        .topic {
            background: #22d3ee;
            color: #fff;
            padding: 7px 18px;
            border-radius: 16px;
            display: inline-block;
            font-size: 0.98rem;
            font-weight: 600;
            margin: 24px 0 0 32px;
            box-shadow: 0 2px 8px 0 rgba(80, 80, 180, 0.08);
        }
        .article {
            background: #fff;
            padding: 28px 32px 18px 32px;
            border-radius: 14px;
            border: 1.5px solid #e0e7ff;
            margin: 18px 24px 0 24px;
            box-shadow: 0 1.5px 6px 0 rgba(80, 80, 180, 0.06);
        }
        .article h2 {
            font-family: 'Fredoka', 'Inter', 'Segoe UI', sans-serif;
            color: #1e293b;
            margin-top: 0;
            font-size: 1.15rem;
            font-weight: 700;
        }
        .concepts {
            background: #fffde7;
            padding: 22px 18px 18px 18px;
            border-radius: 14px;
            border-left: 5px solid #fde047;
            margin: 28px 24px 0 24px;
            box-shadow: 0 1.5px 6px 0 rgba(80, 80, 180, 0.04);
        }
        .concepts h3 {
            font-family: 'Fredoka', 'Inter', 'Segoe UI', sans-serif;
            color: #b45309;
            margin-top: 0;
            font-size: 1.05rem;
            font-weight: 700;
            margin-bottom: 18px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .concept-item {
            margin-bottom: 14px;
            padding: 12px 14px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 1px 4px 0 rgba(80, 80, 180, 0.03);
            font-size: 1rem;
        }
        .concept-item strong {
            color: #6366f1;
        }
        .footer {
            text-align: center;
            margin-top: 36px;
            padding-top: 18px;
            border-top: 1.5px solid #e0e7ff;
            color: #a1a1aa;
            font-size: 1rem;
        }
        .highlight {
            background: #fef9c3;
            padding: 2px 6px;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header-card">
            <div class="article-title">🇪🇸🇲🇽 <b>Tu Artículo de Español</b></div>
            <div class="date">${articleData.date}</div>
        </div>
        <div class="topic">Tema: ${articleData.topic}</div>
        <div class="article">
            <h2>${articleData.title}</h2>
            ${articleData.article.replace(/\n/g, '<br>')}
        </div>
        <div class="concepts">
            <h3>📚 Conceptos Clave para Aprender</h3>
            ${formatConcepts(articleData.concepts)}
        </div>
        <div class="footer">
            <div>¡Sigue aprendiendo español cada día! 🇪🇸</div>
            <div style="font-size:0.95rem; margin-top:6px;">Este email fue generado automáticamente para ayudarte en tu aprendizaje.</div>
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

module.exports = {
  createEmailHTML,
  formatConcepts
};

// --- Mailgun and sendEmail logic below ---
const formData = require('form-data');
const Mailgun = require('mailgun.js');
const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY,
});

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

module.exports.sendEmail = sendEmail;

// --- Preview Script (not exported) ---
if (require.main === module) {
  const fs = require('fs');
  const sampleArticleData = {
    title: '🌙 **Nuevo parque de diversiones en la Luna**',
    article: `¡Atención, viajeros del espacio! Se acaba de inaugurar el primer parque de diversiones en la Luna. ¡Es una noticia increíble! En este parque, los turistas pueden experimentar la gravedad lunar y hacer cosas especiales y probar la comida espacial.\n\nEl parque cuenta con atracciones emocionantes como la montaña rusa lunar y la nave espacial gigante. También hay un hotel con habitaciones que tienen vistas espectaculares del espacio. ¡Qué aventura tan emocionante!\n\nLos boletos para visitar el parque ya están a la venta en la Tierra. Muchas personas están emocionadas con la oportunidad de viajar a la Luna y vivir esta experiencia única. ¡No te pierdas la oportunidad de ser uno de los primeros en visitar este increíble parque de diversiones espacial!`,
    concepts: `1. Inaugurar - To inaugurate\nExample: El alcalde inauguró la nueva biblioteca municipal esta tarde.\n\n2. Turistas - Tourists\nExample: Los turistas visitan la catedral famosa en el centro de la ciudad.\n\n3. Atracciones - Attractions\nExample: El parque de diversiones tiene muchas atracciones divertidas para los niños.\n\n4. Están a la venta - Are for sale\nExample: Los boletos para el concierto de la banda famosa están a la venta en línea.`,
    topic: 'Viajes y turismo',
    date: 'miércoles, 9 de julio de 2025'
  };
  const html = createEmailHTML(sampleArticleData);
  fs.writeFileSync('preview.html', html, 'utf8');
  console.log('✅ Preview email saved as preview.html');
} 