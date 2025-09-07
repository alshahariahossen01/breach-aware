import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-api-domain.com/api' 
  : 'http://localhost:5000/api';

class AIService {
  async processQuery(message: string, context?: any) {
    try {
      const response = await axios.post(`${API_BASE_URL}/ai/chat`, {
        message,
        context
      });
      return response.data.response;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to process AI query');
    }
  }

  async getSecurityRecommendations(data: {
    breaches?: Array<any>;
    passwordExposed?: boolean;
    email?: string | null;
  }) {
    try {
      const response = await axios.post(`${API_BASE_URL}/ai/recommendations`, data);
      return response.data.recommendations;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to get recommendations');
    }
  }

  async generateSecurePasswords(requirements?: {
    length?: number;
    includeSymbols?: boolean;
    includeNumbers?: boolean;
    includeUppercase?: boolean;
    includeLowercase?: boolean;
  }) {
    try {
      const response = await axios.post(`${API_BASE_URL}/ai/generate-password`, {
        requirements
      });
      return response.data.passwords;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to generate passwords');
    }
  }
}

export const aiService = new AIService();
