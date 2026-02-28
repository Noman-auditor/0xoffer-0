/**
 * schemas/contact.js  —  Joi validation schema for contact form
 */
import Joi from 'joi';

export const contactSchema = Joi.object({
  name:    Joi.string().trim().min(2).max(100).required()
            .messages({
              'string.min':   'Name must be at least 2 characters.',
              'string.max':   'Name must not exceed 100 characters.',
              'any.required': 'Full name is required.',
            }),

  email:   Joi.string().trim().email({ tlds: { allow: false } }).required()
            .messages({
              'string.email': 'Enter a valid email address.',
              'any.required': 'Email address is required.',
            }),

  message: Joi.string().trim().min(10).max(5000).required()
            .messages({
              'string.min':   'Message must be at least 10 characters.',
              'string.max':   'Message must not exceed 5000 characters.',
              'any.required': 'Message is required.',
            }),
});
