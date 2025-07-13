# Firebase Auth Setup Guide

This guide will help you set up Firebase Authentication for your Spanish Email Scheduler application.

## 1. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable "Email/Password" provider
   - Save the changes

## 2. Get Firebase Configuration

### Server-side (Service Account)
1. Go to Project Settings > Service accounts
2. Click "Generate new private key"
3. Download the JSON file
4. Extract these values to your `.env` file:
   ```
   FIREBASE_PROJECT_ID=your-project-id
   FIREBASE_CLIENT_EMAIL=your-service-account-email
   FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key-Here\n-----END PRIVATE KEY-----\n"
   ```

### Client-side (Web App)
1. Go to Project Settings > General
2. Scroll down to "Your apps" section
3. Click the web icon (</>) to add a web app
4. Register your app with a nickname
5. Copy the Firebase config object
6. Update the `firebaseConfig` in `firebase-login.html`:

```javascript
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abcdef123456"
};
```

## 3. Environment Variables

Add these to your `.env` file:

```env
# Firebase Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-service-account-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour-Private-Key-Here\n-----END PRIVATE KEY-----\n"

# Admin User Configuration
ADMIN_EMAIL=your-email@example.com
ADMIN_PASSWORD=your-secure-password
ADMIN_NAME=Your Name
```

## 4. Create Admin User

Run the admin user creation script:

```bash
node create-admin-user.js
```

This will:
- Create an admin user in Firebase Auth
- Create a corresponding user document in Firestore
- Set the user role to 'admin'

## 5. Firestore Security Rules

Set up Firestore security rules to protect your data:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Only admins can access config collection
    match /config/{document=**} {
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

## 6. Testing the Setup

1. Start your server: `npm start`
2. Visit `http://localhost:3000/login`
3. Try registering a new user
4. Try logging in with the admin account
5. Access the prompt manager (should only work for admin users)

## Benefits of Firebase Auth

✅ **No JWT Secret Management**: Firebase handles token generation and verification
✅ **Built-in Security**: Firebase Auth includes security best practices
✅ **Multiple Auth Providers**: Easy to add Google, Facebook, etc. later
✅ **Password Reset**: Built-in password reset functionality
✅ **Email Verification**: Built-in email verification
✅ **Rate Limiting**: Built-in protection against brute force attacks
✅ **Session Management**: Automatic token refresh and session handling

## Troubleshooting

### Common Issues:

1. **"Firebase not available" error**
   - Check that Firebase Admin SDK is properly initialized
   - Verify service account credentials

2. **"Invalid token" error**
   - Make sure Firebase Auth is enabled in your project
   - Check that the client-side config matches your project

3. **"Admin access required" error**
   - Run the admin user creation script
   - Verify the user has 'admin' role in Firestore

4. **CORS errors**
   - Add your domain to Firebase Auth authorized domains
   - Check that your server is properly configured

## Next Steps

- Add password reset functionality
- Add email verification
- Add social login providers (Google, Facebook, etc.)
- Implement user profile management
- Add user roles and permissions system 