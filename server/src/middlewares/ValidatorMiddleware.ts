import type { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import AppLogger from '../utils/logger';

export const validateMiddleware =
  (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
    console.table(req.body)
    AppLogger.info(`Validator is running`);
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      AppLogger.error(`Error in the validation middleware ${error}`)
      return res.status(400).json({
        message: 'Validation error',
        errors: error.details.map((d) => d.message),
      });
    }

    next();
  };
