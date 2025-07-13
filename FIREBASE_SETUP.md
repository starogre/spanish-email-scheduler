# Firebase Setup & Prompt Management Guide

## Overview

This update adds Firebase integration to dynamically manage AI prompts without requiring app redeployment. This solves the issues of:
- AI drift in grammar explanations
- Repetitive topics (too many robots/space articles)
- Need for real-time prompt adjustments

## Features Added

### 1. Dynamic Prompt Management
- **Real-time Updates**: Edit prompts through a web interface without redeployment
- **Topic Diversity**: Smart topic rotation to avoid repetitive content
- **Improved Grammar**: Enhanced prompts for better grammar explanations
- **Fallback System**: Default prompts if Firebase is unavailable

### 2. Topic Rotation System
- **Category-based Selection**: Topics are categorized (tech, culture, lifestyle, etc.)
- **Consecutive Avoidance**: Prevents too many similar topics in a row
- **Recent History**: Tracks and avoids recently used topics
- **Expanded Topic List**: 20 diverse topics instead of 10

### 3. Enhanced Grammar Prompts
- **Contextual Explanations**: Grammar points must relate to the article content
- **Clear Examples**: Each concept includes a different example
- **A2 Level Focus**: Ensures explanations are appropriate for beginners

## Firebase Setup

### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable Firestore Database
4. Set up security rules (see below)

### Step 2: Get Service Account Credentials
1. Go to Project Settings > Service Accounts
2. Click "Generate new private key"
3. Download the JSON file
4. Extract the following values:
   - `project_id`
   - `client_email`
   - `private_key`

### Step 3: Environment Variables
Add these to your `.env` file:

```env
# Firebase Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key-Here\n-----END PRIVATE KEY-----\n"
FIREBASE_DATABASE_URL=https://your-project-id.firebaseio.com
```

### Step 4: Firestore Security Rules
Set up these security rules in Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to config collection
    match /config/{document} {
      allow read, write: if true; // For simplicity - consider adding auth later
    }
  }
}
```

## Using the Prompt Manager

### Access the Interface
1. Start your application: `npm start`
2. Open: `http://localhost:3000/prompt-manager`
3. The interface will load current prompts from Firebase

### Managing Prompts

#### Article Generation Prompt
- **System Message**: Defines the AI's role and writing style
- **User Message**: Template with `{topic}` placeholder

#### Grammar Concepts Prompt
- **System Message**: Defines the teacher's role
- **User Message**: Template with `{article}` placeholder

#### Topics Management
- Add/remove topics dynamically
- View recently used topics
- Topics are automatically categorized for smart rotation

### Example Improved Prompts

#### Article Prompt (System)
```
Eres un periodista que escribe artículos de noticias falsas en español para estudiantes de nivel A2 (principiante). Escribe de manera muy clara y simple, usando vocabulario básico y frases cortas. Asegúrate de que el contenido sea interesante y variado, evitando temas repetitivos como robots y espacio.
```

#### Article Prompt (User)
```
Escribe un breve artículo de noticias falso en español (CEFR nivel A2 - principiante). Tema: {topic}. Máximo 150 palabras. Usa frases muy sencillas, vocabulario básico y presente simple. Incluye un título atractivo. El artículo debe ser entretenido y educativo para estudiantes de español.
```

#### Grammar Concepts Prompt (System)
```
You are a Spanish teacher who explains basic A2-level grammatical concepts clearly and simply in English for English-speaking students learning Spanish. Focus on concepts that are actually present in the article and provide meaningful explanations that help students understand how Spanish works.
```

#### Grammar Concepts Prompt (User)
```
From the following Spanish article (A2 level), extract 4 key basic grammar or vocabulary points that are actually present in the text. For each concept:

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
   Example: [Different example using the same concept]
```

## Topic Categories

The system automatically categorizes topics to ensure diversity:

- **Tech**: tecnología y innovación, ciencia y descubrimientos
- **Nature**: medio ambiente y sostenibilidad, naturaleza y animales
- **Culture**: cultura y entretenimiento, arte y música, música y festivales, teatro y cine, literatura y libros, danza y baile, fotografía y arte visual
- **Lifestyle**: deportes y salud, viajes y turismo, moda y estilo de vida, comida y gastronomía, cocina y recetas
- **Education**: educación y aprendizaje
- **Business**: negocios y economía
- **History**: historia y tradiciones
- **Health**: medicina y salud mental

## API Endpoints

### GET /api/manage-prompts
Retrieves current prompts and recent topics.

### POST /api/manage-prompts
Updates prompts in Firebase.

### GET /prompt-manager
Web interface for managing prompts.

### GET /health
Health check endpoint.

## Troubleshooting

### Firebase Connection Issues
- Check environment variables are correctly set
- Verify service account has proper permissions
- Ensure Firestore is enabled in your Firebase project

### Prompt Not Updating
- Check browser console for errors
- Verify API endpoint is accessible
- Ensure Firebase rules allow read/write access

### Topic Diversity Issues
- Check recent topics in the prompt manager
- Verify topic categories are properly set
- Review topic rotation rules

## Migration from Static Prompts

The system is backward compatible. If Firebase is not configured:
1. Default prompts will be used
2. Topic selection will be random (no smart rotation)
3. Recent topic tracking will be disabled
4. All existing functionality will continue to work

## Best Practices

1. **Regular Monitoring**: Check the prompt manager weekly to review recent topics
2. **Prompt Iteration**: Test new prompts with small changes first
3. **Topic Balance**: Monitor topic distribution and adjust categories as needed
4. **Grammar Quality**: Review generated emails to ensure grammar explanations are relevant
5. **Backup**: Keep a copy of working prompts in case of Firebase issues

## Security Considerations

- The current setup allows public access to the prompt manager
- Consider adding authentication for production use
- Review Firebase security rules regularly
- Keep service account credentials secure 