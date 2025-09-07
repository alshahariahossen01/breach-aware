const express = require('express');
const Joi = require('joi');
const { aiService } = require('../services/aiService');

const router = express.Router();

// Validation schema for AI chat
const chatSchema = Joi.object({
  message: Joi.string().min(1).max(1000).required().messages({
    'string.min': 'Message cannot be empty',
    'string.max': 'Message is too long',
    'any.required': 'Message is required'
  }),
  context: Joi.object({
    email: Joi.string().email().optional(),
    breaches: Joi.array().optional(),
    passwordExposed: Joi.boolean().optional()
  }).optional()
});

// AI chat endpoint for security recommendations
router.post('/chat', async (req, res) => {
  try {
    // Validate input
    const { error, value } = chatSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Validation error',
        message: error.details[0].message
      });
    }

    const { message, context } = value;
    const response = await aiService.processQuery(message, context);
    
    res.json({
      success: true,
      response: response
    });

  } catch (error) {
    console.error('AI chat error:', error);
    res.status(500).json({
      error: 'Failed to process AI query',
      message: error.message || 'An unexpected error occurred'
    });
  }
});

// Get security recommendations based on breach data
router.post('/recommendations', async (req, res) => {
  try {
    const { breaches, passwordExposed, email } = req.body;
    
    const recommendations = await aiService.getSecurityRecommendations({
      breaches: breaches || [],
      passwordExposed: passwordExposed || false,
      email: email || null
    });
    
    res.json({
      success: true,
      recommendations: recommendations
    });

  } catch (error) {
    console.error('Recommendations error:', error);
    res.status(500).json({
      error: 'Failed to get recommendations',
      message: error.message || 'An unexpected error occurred'
    });
  }
});

// Generate secure password suggestions
router.post('/generate-password', async (req, res) => {
  try {
    const { requirements } = req.body;
    
    const passwords = await aiService.generateSecurePasswords(requirements);
    
    res.json({
      success: true,
      passwords: passwords
    });

  } catch (error) {
    console.error('Password generation error:', error);
    res.status(500).json({
      error: 'Failed to generate passwords',
      message: error.message || 'An unexpected error occurred'
    });
  }
});

module.exports = router;
