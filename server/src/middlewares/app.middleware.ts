import type { Request, Response, NextFunction } from 'express';
import { Result } from '../common/Response';
import { decodeToken } from '../common/passwordService';
import AppLogger from '../utils/logger';

export const AppMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    AppLogger.info(`App Middlware is running`);
    console.table(req.cookies)
    const cookie = req.cookies['AUTH_TOKEN'] || req.cookies['auth_token'];

    if (!cookie) {
      return Result.CreateError(new Error('UnAuthorized Error'), 'No cookie exists', 401)(res);
    }

    const decodedToken = decodeToken(cookie);

    req.id = decodedToken.id;
    ((req.email = decodedToken.email), (req.role = decodedToken.role));

    next();
  } catch (error) {
    return Result.CreateError(error as Error, 'Internal Server Error')(res);
  }
};
