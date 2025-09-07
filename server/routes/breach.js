const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const Joi = require('joi');
const { breachService } = require('../services/breachService');

const router = express.Router();

// Validation schemas
const emailSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email address is required'
  })
});

const passwordSchema = Joi.object({
  password: Joi.string().min(1).max(100).required().messages({
    'string.min': 'Password cannot be empty',
    'string.max': 'Password is too long',
    'any.required': 'Password is required'
  })
});

// Check email for breaches
router.post('/check-email', async (req, res) => {
  try {
    // Validate input
    const { error, value } = emailSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Validation error',
        message: error.details[0].message
      });
    }

    const { email } = value;
    const result = await breachService.checkEmail(email);
    
    res.json({
      success: true,
      email: email,
      ...result
    });

  } catch (error) {
    console.error('Email check error:', error);
    res.status(500).json({
      error: 'Failed to check email',
      message: error.message || 'An unexpected error occurred'
    });
  }
});

// Check password for breaches
router.post('/check-password', async (req, res) => {
  try {
    // Validate input
    const { error, value } = passwordSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Validation error',
        message: error.details[0].message
      });
    }

    const { password } = value;
    const result = await breachService.checkPassword(password);
    
    res.json({
      success: true,
      ...result
    });

  } catch (error) {
    console.error('Password check error:', error);
    res.status(500).json({
      error: 'Failed to check password',
      message: error.message || 'An unexpected error occurred'
    });
  }
});

// Get breach details for a specific breach
router.get('/breach/:breachName', async (req, res) => {
  try {
    const { breachName } = req.params;
    const result = await breachService.getBreachDetails(breachName);
    
    res.json({
      success: true,
      ...result
    });

  } catch (error) {
    console.error('Breach details error:', error);
    res.status(500).json({
      error: 'Failed to get breach details',
      message: error.message || 'An unexpected error occurred'
    });
  }
});

module.exports = router;
