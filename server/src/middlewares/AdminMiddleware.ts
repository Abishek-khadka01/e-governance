import type { Request, Response, NextFunction } from 'express';
import { Result } from '../common/Response';

export const AdminMiddleWare = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.role?.toLocaleLowerCase() != 'admin') {
      return Result.CreateError(new Error('UnAuthorized'), 'UnAuthorized Request', 401)(res);
    }

    next();
  } catch (error) {
    return Result.CreateError(error as Error, 'Internal Server Error')(res);
  }
};
