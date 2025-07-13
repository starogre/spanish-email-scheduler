require('dotenv').config();
const admin = require('firebase-admin');

console.log('🚀 Initializing Firebase Database...\n');

// Check environment variables
console.log('📋 Environment Variables Check:');
console.log('FIREBASE_PROJECT_ID:', process.env.FIREBASE_PROJECT_ID ? '✅ Set' : '❌ Missing');
console.log('FIREBASE_CLIENT_EMAIL:', process.env.FIREBASE_CLIENT_EMAIL ? '✅ Set' : '❌ Missing');
console.log('FIREBASE_PRIVATE_KEY:', process.env.FIREBASE_PRIVATE_KEY ? '✅ Set' : '❌ Missing');

if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
  console.error('\n❌ Missing required Firebase environment variables!');
  console.log('Please check your .env file and ensure all Firebase variables are set.');
  process.exit(1);
}

// Default prompts that will be initialized in Firebase
const defaultPrompts = {
  articlePrompt: {
    system: "Eres un periodista que escribe artículos de noticias falsas en español para estudiantes de nivel A2 (principiante). Escribe de manera muy clara y simple, usando vocabulario básico y frases cortas. Asegúrate de que el contenido sea interesante y variado, evitando temas repetitivos como robots y espacio.",
    user: "Escribe un breve artículo de noticias falso en español (CEFR nivel A2 - principiante). Tema: {topic}. Máximo 150 palabras. Usa frases muy sencillas, vocabulario básico y presente simple. Incluye un título atractivo. El artículo debe ser entretenido y educativo para estudiantes de español."
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
    maxConsecutiveTopics: 2,
    avoidRecentTopics: 5,
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

async function initializeFirebase() {
  try {
    console.log('\n🔧 Initializing Firebase...');
    
    // Initialize Firebase Admin SDK
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        })
      });
    }
    
    console.log('✅ Firebase initialized successfully!');
    
    // Get Firestore instance
    const db = admin.firestore();
    console.log('✅ Firestore connection established!');
    
    // Initialize prompts collection
    console.log('\n📝 Initializing prompts collection...');
    await db.collection('config').doc('prompts').set(defaultPrompts);
    console.log('✅ Prompts initialized successfully!');
    
    // Initialize recent topics collection
    console.log('\n📋 Initializing recent topics collection...');
    await db.collection('config').doc('recentTopics').set({
      topics: [],
      lastUpdated: admin.firestore.FieldValue.serverTimestamp()
    });
    console.log('✅ Recent topics initialized successfully!');
    
    // Verify the data was written
    console.log('\n🔍 Verifying data...');
    const promptsDoc = await db.collection('config').doc('prompts').get();
    const topicsDoc = await db.collection('config').doc('recentTopics').get();
    
    if (promptsDoc.exists && topicsDoc.exists) {
      console.log('✅ Data verification successful!');
      console.log('📊 Prompts document contains:', Object.keys(promptsDoc.data()));
      console.log('📊 Recent topics document contains:', Object.keys(topicsDoc.data()));
    } else {
      throw new Error('Data verification failed');
    }
    
    console.log('\n🎉 Firebase initialization completed successfully!');
    console.log('✅ Your Firestore database is now ready to use');
    console.log('✅ You can now use the prompt manager at: http://localhost:3000/prompt-manager');
    
  } catch (error) {
    console.error('\n❌ Firebase initialization failed:', error.message);
    
    if (error.message.includes('project_id')) {
      console.log('\n🔍 Troubleshooting:');
      console.log('1. Check that FIREBASE_PROJECT_ID is set correctly');
      console.log('2. Verify the project ID matches your Firebase project');
    } else if (error.message.includes('private key')) {
      console.log('\n🔍 Troubleshooting:');
      console.log('1. Check that FIREBASE_PRIVATE_KEY is properly formatted');
      console.log('2. Make sure newlines are escaped with \\n');
      console.log('3. Ensure the key is wrapped in quotes');
    } else if (error.message.includes('permission')) {
      console.log('\n🔍 Troubleshooting:');
      console.log('1. Check Firestore security rules');
      console.log('2. Ensure Firestore is enabled in your Firebase project');
      console.log('3. Verify service account has proper permissions');
    }
    
    process.exit(1);
  }
}

// Run the initialization
initializeFirebase(); 