const axios = require('axios');
const crypto = require('crypto');

class BreachService {
  constructor() {
    this.hibpApiKey = process.env.HIBP_API_KEY;
    this.baseUrl = 'https://haveibeenpwned.com/api/v3';
  }

  async checkEmail(email) {
    try {
      const response = await axios.get(`${this.baseUrl}/breachedaccount/${encodeURIComponent(email)}`, {
        headers: {
          'hibp-api-key': this.hibpApiKey,
          'User-Agent': 'M&P-Checker/1.0'
        }
      });

      const breaches = response.data || [];
      
      return {
        isExposed: breaches.length > 0,
        breachCount: breaches.length,
        breaches: breaches.map(breach => ({
          name: breach.Name,
          title: breach.Title,
          domain: breach.Domain,
          breachDate: breach.BreachDate,
          addedDate: breach.AddedDate,
          modifiedDate: breach.ModifiedDate,
          pwnCount: breach.PwnCount,
          description: breach.Description,
          dataClasses: breach.DataClasses,
          isVerified: breach.IsVerified,
          isFabricated: breach.IsFabricated,
          isSensitive: breach.IsSensitive,
          isRetired: breach.IsRetired,
          isSpamList: breach.IsSpamList
        }))
      };

    } catch (error) {
      if (error.response?.status === 404) {
        return {
          isExposed: false,
          breachCount: 0,
          breaches: []
        };
      }
      throw error;
    }
  }

  async checkPassword(password) {
    try {
      // Hash the password using SHA-1
      const hash = crypto.createHash('sha1').update(password).digest('hex').toUpperCase();
      const hashPrefix = hash.substring(0, 5);
      const hashSuffix = hash.substring(5);

      // Use k-anonymity model - only send first 5 characters
      const response = await axios.get(`https://api.pwnedpasswords.com/range/${hashPrefix}`, {
        headers: {
          'User-Agent': 'M&P-Checker/1.0'
        }
      });

      const lines = response.data.split('\n');
      let count = 0;

      for (const line of lines) {
        const [suffix, frequency] = line.split(':');
        if (suffix === hashSuffix) {
          count = parseInt(frequency);
          break;
        }
      }

      return {
        isExposed: count > 0,
        exposureCount: count,
        riskLevel: this.getPasswordRiskLevel(count)
      };

    } catch (error) {
      throw error;
    }
  }

  async getBreachDetails(breachName) {
    try {
      const response = await axios.get(`${this.baseUrl}/breach/${breachName}`, {
        headers: {
          'hibp-api-key': this.hibpApiKey,
          'User-Agent': 'M&P-Checker/1.0'
        }
      });

      return {
        breach: {
          name: response.data.Name,
          title: response.data.Title,
          domain: response.data.Domain,
          breachDate: response.data.BreachDate,
          addedDate: response.data.AddedDate,
          modifiedDate: response.data.ModifiedDate,
          pwnCount: response.data.PwnCount,
          description: response.data.Description,
          dataClasses: response.data.DataClasses,
          isVerified: response.data.IsVerified,
          isFabricated: response.data.IsFabricated,
          isSensitive: response.data.IsSensitive,
          isRetired: response.data.IsRetired,
          isSpamList: response.data.IsSpamList
        }
      };

    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Breach not found');
      }
      throw error;
    }
  }

  getPasswordRiskLevel(count) {
    if (count === 0) return 'safe';
    if (count < 100) return 'low';
    if (count < 1000) return 'medium';
    if (count < 10000) return 'high';
    return 'critical';
  }
}

module.exports = {
  breachService: new BreachService()
};
