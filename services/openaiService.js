const OpenAI = require('openai');
const { getPrompts, selectOptimalTopic, addRecentTopic } = require('./firebaseService');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateSpanishArticle() {
  try {
    // Get prompts from Firebase and select optimal topic
    const prompts = await getPrompts();
    const selectedTopic = await selectOptimalTopic();
    
    // Track the selected topic
    await addRecentTopic(selectedTopic);
    
    // Generate the news article using dynamic prompts
    const articleResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: prompts.articlePrompt.system
        },
        {
          role: "user",
          content: prompts.articlePrompt.user.replace('{topic}', selectedTopic)
        }
      ],
      max_tokens: 400,
      temperature: 0.7
    });

    const article = articleResponse.choices[0].message.content;

    // Generate grammar concepts and explanations in English using dynamic prompts
    const conceptsResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: prompts.conceptsPrompt.system
        },
        {
          role: "user",
          content: prompts.conceptsPrompt.user.replace('{article}', article)
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
      topic: selectedTopic,
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