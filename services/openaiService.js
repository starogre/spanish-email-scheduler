const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Array of interesting topics for news articles
const topics = [
  'tecnología y innovación',
  'medio ambiente y sostenibilidad',
  'cultura y entretenimiento',
  'deportes y salud',
  'viajes y turismo',
  'comida y gastronomía',
  'educación y aprendizaje',
  'negocios y economía',
  'arte y música',
  'ciencia y descubrimientos'
];

async function generateSpanishArticle() {
  try {
    // Select a random topic
    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    
    // Generate the news article
    const articleResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "Eres un periodista que escribe artículos de noticias falsas en español para estudiantes de nivel A2 (principiante). Escribe de manera muy clara y simple, usando vocabulario básico y frases cortas."
        },
        {
          role: "user",
          content: `Escribe un breve artículo de noticias falso en español (CEFR nivel A2 - principiante). Tema: ${randomTopic}. Máximo 150 palabras. Usa frases muy sencillas, vocabulario básico y presente simple. Incluye un título atractivo.`
        }
      ],
      max_tokens: 400,
      temperature: 0.7
    });

    const article = articleResponse.choices[0].message.content;

    // Generate grammar concepts and explanations in English
    const conceptsResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a Spanish teacher who explains basic A2-level grammatical concepts clearly and simply in English for English-speaking students learning Spanish."
        },
        {
          role: "user",
          content: `From the following Spanish article (A2 level), extract 4 key basic grammar or vocabulary points that are appropriate for A2 learners, explain their function briefly in English, and provide a different example. Focus on simple concepts like basic verbs, common nouns, simple adjectives, and basic sentence structure.

Article:
${article}

Respond in this format:
1. [Spanish Concept] - [Brief explanation in English]
   Example: [Different example in Spanish]

2. [Spanish Concept] - [Brief explanation in English]
   Example: [Different example in Spanish]

3. [Spanish Concept] - [Brief explanation in English]
   Example: [Different example in Spanish]

4. [Spanish Concept] - [Brief explanation in English]
   Example: [Different example in Spanish]`
        }
      ],
      max_tokens: 500,
      temperature: 0.5
    });

    const concepts = conceptsResponse.choices[0].message.content;

    return {
      title: extractTitle(article),
      article: article,
      concepts: concepts,
      topic: randomTopic,
      date: new Date().toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };

  } catch (error) {
    console.error('Error generating Spanish article:', error);
    throw new Error('Failed to generate Spanish article');
  }
}

function extractTitle(article) {
  // Try to extract the first line as title, or generate a simple one
  const lines = article.split('\n');
  const firstLine = lines[0].trim();
  
  if (firstLine && firstLine.length < 100) {
    return firstLine;
  }
  
  return 'Noticias del Día';
}

module.exports = {
  generateSpanishArticle
}; 