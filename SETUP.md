# Getting Started

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm or yarn package manager

## API Keys Required

You'll need to obtain API keys for the following services:

### 1. OpenAI API Key
- Visit [OpenAI Platform](https://platform.openai.com/)
- Create an account or sign in
- Navigate to API Keys section
- Create a new API key
- Copy the key (starts with `sk-`)

### 2. HaveIBeenPwned API Key (Optional but Recommended)
- Visit [HaveIBeenPwned API](https://haveibeenpwned.com/API/Key)
- Create an account or sign in
- Request an API key
- Copy the key

**Note**: The HaveIBeenPwned API key is optional. Without it, you'll be limited to 1 request per 1.5 seconds. With a key, you get 10 requests per second.

## Installation Steps

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd mp-checker
```

### 2. Install Dependencies
```bash
npm run install-all
```

### 3. Set Up Environment Variables
```bash
# Copy the environment template
cp server/env.example server/.env

# Edit the .env file with your API keys
```

Edit `server/.env`:
```env
PORT=5000
OPENAI_API_KEY=sk-your-openai-api-key-here
HIBP_API_KEY=your-hibp-api-key-here
NODE_ENV=development
```

### 4. Start the Development Servers
```bash
# Start both frontend and backend
npm run dev
```

This will start:
- Backend server on http://localhost:5000
- Frontend React app on http://localhost:3000

### 5. Verify Installation
- Open http://localhost:3000 in your browser
- You should see the M&P Checker homepage
- Try checking an email address to test the functionality

## Troubleshooting

### Common Issues

**1. Port Already in Use**
```bash
# Kill processes using ports 3000 or 5000
npx kill-port 3000
npx kill-port 5000
```

**2. API Key Not Working**
- Verify your API keys are correct
- Check that you have sufficient credits/quota
- Ensure the keys are properly set in the `.env` file

**3. CORS Errors**
- Make sure the backend is running on port 5000
- Check that the frontend proxy is configured correctly

**4. Module Not Found Errors**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
cd server && rm -rf node_modules package-lock.json && npm install
cd ../client && rm -rf node_modules package-lock.json && npm install
```

### Getting Help

If you encounter issues:
1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure all dependencies are installed
4. Check the API documentation for rate limits

## Next Steps

Once everything is running:
1. Test the email breach checking functionality
2. Try the password checking feature
3. Explore the AI chat assistant
4. Customize the UI and add your own features

## Production Deployment

For production deployment:
1. Set `NODE_ENV=production` in your environment
2. Use a production-grade database if needed
3. Set up proper SSL certificates
4. Configure your domain and update CORS settings
5. Use environment-specific API keys
