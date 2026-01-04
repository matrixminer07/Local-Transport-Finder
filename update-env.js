const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Local Transport Finder - Environment Setup\n');

// Update backend .env
rl.question('Enter your Google Maps API Key: ', (mapsApiKey) => {
  rl.question('Enter your MongoDB Connection String: ', (mongoUri) => {
    rl.question('Enter your JWT Secret (or press Enter for random): ', (jwtSecret) => {
      // Generate random JWT secret if not provided
      if (!jwtSecret) {
        jwtSecret = require('crypto').randomBytes(64).toString('hex');
      }

      // Update backend .env
      const backendEnv = `# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=${mongoUri}

# JWT Secret
JWT_SECRET=${jwtSecret}

# Google Maps API Key
GOOGLE_MAPS_API_KEY=${mapsApiKey}

# CORS
CORS_ORIGIN=http://localhost:3000

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
`;

      fs.writeFileSync('./backend/.env', backendEnv);

      // Update frontend .env.local
      const frontendEnv = `# Google Maps API Key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=${mapsApiKey}

# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:5000/api
`;

      fs.writeFileSync('./frontend/.env.local', frontendEnv);

      console.log('\n✅ Environment files updated successfully!');
      console.log('📁 Backend: ./backend/.env');
      console.log('📁 Frontend: ./frontend/.env.local');
      console.log('\n🎉 You can now start the servers:');
      console.log('   Backend: cd backend && npm run dev');
      console.log('   Frontend: cd frontend && npm run dev');

      rl.close();
    });
  });
});
