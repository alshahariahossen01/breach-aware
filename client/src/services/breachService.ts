import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-api-domain.com/api' 
  : 'http://localhost:5000/api';

class BreachService {
  async checkEmail(email: string) {
    try {
      const response = await axios.post(`${API_BASE_URL}/breach/check-email`, {
        email
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to check email');
    }
  }

  async checkPassword(password: string) {
    try {
      const response = await axios.post(`${API_BASE_URL}/breach/check-password`, {
        password
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to check password');
    }
  }

  async getBreachDetails(breachName: string) {
    try {
      const response = await axios.get(`${API_BASE_URL}/breach/breach/${breachName}`);
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('Failed to get breach details');
    }
  }
}

export const breachService = new BreachService();
