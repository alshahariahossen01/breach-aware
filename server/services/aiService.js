const OpenAI = require('openai');

class AIService {
  constructor() {
    // Only initialize OpenAI if API key is provided
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'sk-placeholder-key-replace-with-real-key') {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    } else {
      this.openai = null;
      console.warn('OpenAI API key not provided. AI features will be disabled.');
    }
  }

  async processQuery(message, context = {}) {
    try {
      if (!this.openai) {
        return 'AI features are currently disabled. Please add your OpenAI API key to enable AI-powered recommendations.';
      }

      const systemPrompt = this.buildSystemPrompt(context);
      
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: message
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      });

      return completion.choices[0].message.content;

    } catch (error) {
      console.error('OpenAI API error:', error);
      throw new Error('Failed to process AI query');
    }
  }

  async getSecurityRecommendations({ breaches, passwordExposed, email }) {
    try {
      if (!this.openai) {
        return 'AI features are currently disabled. Please add your OpenAI API key to enable AI-powered recommendations.';
      }

      const context = this.buildRecommendationContext(breaches, passwordExposed, email);
      
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are a cybersecurity expert providing personalized security recommendations. 
            Based on the breach data provided, give specific, actionable advice for improving security. 
            Focus on practical steps the user can take immediately.`
          },
          {
            role: "user",
            content: `Please provide security recommendations based on this data: ${context}`
          }
        ],
        max_tokens: 800,
        temperature: 0.5
      });

      return completion.choices[0].message.content;

    } catch (error) {
      console.error('OpenAI API error:', error);
      throw new Error('Failed to generate recommendations');
    }
  }

  async generateSecurePasswords(requirements = {}) {
    try {
      if (!this.openai) {
        return ['AI features are currently disabled. Please add your OpenAI API key to enable password generation.'];
      }

      const { length = 16, includeSymbols = true, includeNumbers = true, includeUppercase = true, includeLowercase = true } = requirements;
      
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are a password security expert. Generate 5 secure passwords based on the requirements. 
            Each password should be unique, strong, and meet the specified criteria. 
            Return only the passwords, one per line, with no additional text.`
          },
          {
            role: "user",
            content: `Generate 5 secure passwords with these requirements:
            - Length: ${length} characters
            - Include symbols: ${includeSymbols}
            - Include numbers: ${includeNumbers}
            - Include uppercase: ${includeUppercase}
            - Include lowercase: ${includeLowercase}`
          }
        ],
        max_tokens: 200,
        temperature: 0.8
      });

      const passwords = completion.choices[0].message.content
        .split('\n')
        .filter(pwd => pwd.trim().length > 0)
        .map(pwd => pwd.trim());

      return passwords;

    } catch (error) {
      console.error('OpenAI API error:', error);
      throw new Error('Failed to generate passwords');
    }
  }

  buildSystemPrompt(context) {
    let prompt = `You are a helpful cybersecurity assistant for the M&P Checker breach detection service. 
    You help users understand breach results and provide security recommendations. 
    
    Guidelines:
    - Be clear and non-technical in your explanations
    - Provide actionable security advice
    - Be empathetic about security concerns
    - Focus on practical steps users can take
    - Never store or log any sensitive information
    - Always recommend enabling 2FA when possible`;

    if (context.email) {
      prompt += `\n\nUser's email: ${context.email}`;
    }

    if (context.breaches && context.breaches.length > 0) {
      prompt += `\n\nUser's breach history: Found in ${context.breaches.length} breach(es)`;
      context.breaches.forEach(breach => {
        prompt += `\n- ${breach.name}: ${breach.description}`;
      });
    }

    if (context.passwordExposed) {
      prompt += `\n\nUser's password has been exposed in data breaches.`;
    }

    return prompt;
  }

  buildRecommendationContext(breaches, passwordExposed, email) {
    let context = '';

    if (breaches && breaches.length > 0) {
      context += `User's email was found in ${breaches.length} data breach(es):\n`;
      breaches.forEach(breach => {
        context += `- ${breach.name} (${breach.breachDate}): ${breach.description}\n`;
        context += `  Data exposed: ${breach.dataClasses.join(', ')}\n`;
      });
    }

    if (passwordExposed) {
      context += '\nUser\'s password has been exposed in data breaches and should be changed immediately.\n';
    }

    if (email) {
      context += `\nEmail domain: ${email.split('@')[1]}`;
    }

    return context;
  }
}

module.exports = {
  aiService: new AIService()
};
