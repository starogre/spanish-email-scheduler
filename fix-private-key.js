require('dotenv').config();

console.log('🔧 Private Key Format Fixer\n');

// Get the current private key
const currentKey = process.env.FIREBASE_PRIVATE_KEY;

if (!currentKey) {
  console.log('❌ FIREBASE_PRIVATE_KEY not found in .env file');
  process.exit(1);
}

console.log('📋 Current Private Key Analysis:');
console.log('Length:', currentKey.length);
console.log('Contains actual newlines:', currentKey.includes('\n'));
console.log('Contains \\n:', currentKey.includes('\\n'));

// Fix the private key format
let fixedKey = currentKey;

// Replace actual newlines with \n
if (currentKey.includes('\n') && !currentKey.includes('\\n')) {
  fixedKey = currentKey.replace(/\n/g, '\\n');
  console.log('\n✅ Fixed: Replaced actual newlines with \\n');
} else if (currentKey.includes('\\n')) {
  console.log('\n✅ Already has \\n format');
} else {
  console.log('\n⚠️  No newlines found - this might be wrong');
}

console.log('\n📝 Copy this corrected format to your .env file:');
console.log('FIREBASE_PRIVATE_KEY="' + fixedKey + '"');

console.log('\n🔍 Verification:');
console.log('Fixed key length:', fixedKey.length);
console.log('Contains \\n:', fixedKey.includes('\\n'));
console.log('Contains BEGIN:', fixedKey.includes('-----BEGIN PRIVATE KEY-----'));
console.log('Contains END:', fixedKey.includes('-----END PRIVATE KEY-----'));

console.log('\n📋 Complete .env Firebase section should look like:');
console.log('FIREBASE_PROJECT_ID=spanish-daily-email');
console.log('FIREBASE_CLIENT_EMAIL=firebase-adminsdk-fbsvc@spanish-daily-email.iam.gserviceaccount.com');
console.log('FIREBASE_PRIVATE_KEY="' + fixedKey + '"'); 