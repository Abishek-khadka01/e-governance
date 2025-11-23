import Joi from 'joi';

export const createPartySchema = Joi.object({
  party_name: Joi.string().min(2).max(100).required().messages({
    'string.base': 'Party name must be a string',
    'string.empty': 'Party name is required',
    'any.required': 'Party name is required',
  }),

  abbreviation: Joi.string().min(1).max(10).required().messages({
    'string.base': 'Abbreviation must be a string',
    'string.empty': 'Abbreviation is required',
    'any.required': 'Abbreviation is required',
  }),

  leader_name: Joi.string().min(2).max(100).required().messages({
    'string.base': 'Leader name must be a string',
    'string.empty': 'Leader name is required',
    'any.required': 'Leader name is required',
  }),
});
