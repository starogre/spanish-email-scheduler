const admin = require('firebase-admin');

// Lazy-load Firebase - only get it when needed
function getFirestore() {
  if (!admin.apps.length) {
    throw new Error('Firebase not initialized');
  }
  return admin.firestore();
}

// Default prompts that will be used if Firebase is not available
const defaultPrompts = {
  articlePrompt: {
    system: "Eres un periodista que escribe artículos de noticias falsas en español para estudiantes de nivel A2 (principiante). Escribe de manera muy clara y simple, usando vocabulario básico y frases cortas.",
    user: "Escribe un breve artículo de noticias falso en español (CEFR nivel A2 - principiante). Tema: {topic}. Máximo 150 palabras. Usa frases muy sencillas, vocabulario básico y presente simple. Incluye un título atractivo."
  },
  conceptsPrompt: {
    system: "You are a Spanish teacher who explains basic A2-level grammatical concepts clearly and simply in English for English-speaking students learning Spanish. Focus on concepts that are actually present in the article and provide meaningful explanations.",
    user: `From the following Spanish article (A2 level), extract 4 key basic grammar or vocabulary points that are actually present in the text. For each concept:

1. Identify the specific Spanish word/phrase from the article
2. Explain its function and meaning in English
3. Provide a different example using the same concept
4. Ensure the explanation is relevant to the article content

Focus on:
- Basic verbs and their conjugations
- Common nouns and articles
- Simple adjectives and their agreement
- Basic sentence structure patterns
- Common expressions or phrases

Article:
{article}

Respond in this format:
1. [Spanish Concept from article] - [Clear explanation of its function and meaning]
   Example: [Different example using the same concept]

2. [Spanish Concept from article] - [Clear explanation of its function and meaning]
   Example: [Different example using the same concept]

3. [Spanish Concept from article] - [Clear explanation of its function and meaning]
   Example: [Different example using the same concept]

4. [Spanish Concept from article] - [Clear explanation of its function and meaning]
   Example: [Different example using the same concept]`
  },
  topics: [
    'tecnología y innovación',
    'medio ambiente y sostenibilidad',
    'cultura y entretenimiento',
    'deportes y salud',
    'viajes y turismo',
    'comida y gastronomía',
    'educación y aprendizaje',
    'negocios y economía',
    'arte y música',
    'ciencia y descubrimientos',
    'historia y tradiciones',
    'moda y estilo de vida',
    'música y festivales',
    'cocina y recetas',
    'naturaleza y animales',
    'teatro y cine',
    'literatura y libros',
    'danza y baile',
    'fotografía y arte visual',
    'medicina y salud mental'
  ],
  topicRotationRules: {
    maxConsecutiveTopics: 2, // Maximum consecutive articles on similar topics
    avoidRecentTopics: 5, // Number of recent topics to avoid repeating
    topicCategories: {
      'tecnología y innovación': 'tech',
      'ciencia y descubrimientos': 'tech',
      'medio ambiente y sostenibilidad': 'nature',
      'naturaleza y animales': 'nature',
      'cultura y entretenimiento': 'culture',
      'arte y música': 'culture',
      'música y festivales': 'culture',
      'teatro y cine': 'culture',
      'literatura y libros': 'culture',
      'danza y baile': 'culture',
      'fotografía y arte visual': 'culture',
      'deportes y salud': 'lifestyle',
      'viajes y turismo': 'lifestyle',
      'moda y estilo de vida': 'lifestyle',
      'comida y gastronomía': 'lifestyle',
      'cocina y recetas': 'lifestyle',
      'educación y aprendizaje': 'education',
      'negocios y economía': 'business',
      'historia y tradiciones': 'history',
      'medicina y salud mental': 'health'
    }
  }
};

async function getPrompts() {
  try {
    const db = getFirestore();
    const promptsDoc = await db.collection('config').doc('prompts').get();
    
    if (promptsDoc.exists) {
      const firebasePrompts = promptsDoc.data();
      return {
        ...defaultPrompts,
        ...firebasePrompts
      };
    } else {
      // If no prompts exist in Firebase, create them with defaults
      await db.collection('config').doc('prompts').set(defaultPrompts);
      return defaultPrompts;
    }
  } catch (error) {
    console.error('Error fetching prompts from Firebase:', error);
    return defaultPrompts;
  }
}

async function updatePrompts(newPrompts) {
  try {
    const db = getFirestore();
    await db.collection('config').doc('prompts').set(newPrompts, { merge: true });
    return true;
  } catch (error) {
    console.error('Error updating prompts in Firebase:', error);
    throw error;
  }
}

async function getRecentTopics(limit = 10) {
  try {
    const db = getFirestore();
    const topicsDoc = await db.collection('config').doc('recentTopics').get();
    if (topicsDoc.exists) {
      return topicsDoc.data().topics || [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching recent topics:', error);
    return [];
  }
}

async function addRecentTopic(topic) {
  try {
    const db = getFirestore();
    const recentTopics = await getRecentTopics();
    const updatedTopics = [topic, ...recentTopics.slice(0, 9)]; // Keep last 10 topics

    await db.collection('config').doc('recentTopics').set({
      topics: updatedTopics,
      lastUpdated: admin.firestore.FieldValue.serverTimestamp()
    });
  } catch (error) {
    console.error('Error adding recent topic:', error);
  }
}

async function selectOptimalTopic() {
  try {
    const prompts = await getPrompts();
    const recentTopics = await getRecentTopics();
    const { topics, topicRotationRules } = prompts;

    // Filter out recently used topics
    const availableTopics = topics.filter(topic => 
      !recentTopics.includes(topic)
    );

    if (availableTopics.length === 0) {
      // If all topics have been used recently, reset and use any topic
      return topics[Math.floor(Math.random() * topics.length)];
    }

    // Check for consecutive topic categories
    const lastTwoTopics = recentTopics.slice(0, 2);
    const lastTwoCategories = lastTwoTopics.map(topic => 
      topicRotationRules.topicCategories[topic]
    );

    // If we have consecutive topics in the same category, try to avoid that category
    if (lastTwoCategories.length >= 2 && 
        lastTwoCategories[0] === lastTwoCategories[1] && 
        lastTwoCategories[0] !== undefined) {
      
      const avoidCategory = lastTwoCategories[0];
      const diverseTopics = availableTopics.filter(topic => 
        topicRotationRules.topicCategories[topic] !== avoidCategory
      );

      if (diverseTopics.length > 0) {
        return diverseTopics[Math.floor(Math.random() * diverseTopics.length)];
      }
    }

    // Otherwise, select randomly from available topics
    return availableTopics[Math.floor(Math.random() * availableTopics.length)];
  } catch (error) {
    console.error('Error selecting optimal topic:', error);
    // Fallback to random selection
    const prompts = await getPrompts();
    return prompts.topics[Math.floor(Math.random() * prompts.topics.length)];
  }
}

module.exports = {
  getPrompts,
  updatePrompts,
  getRecentTopics,
  addRecentTopic,
  selectOptimalTopic,
  defaultPrompts
}; 