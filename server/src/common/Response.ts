import type { Response } from 'express';
import AppLogger from '../utils/logger';

export class Result {
  static CreateSuccess<T>(data: T, statusCode: number = 200) {
    AppLogger.info(`The success respose is  created ${data}${statusCode}`)
    console.table(data)
    return (res: Response) => {
      return res.status(statusCode).json({
        success: true,
        data,
      });
    };
  }

  static CreateError(error: Error, message: string, statusCode: number = 500) {
    return (res: Response) => {
      AppLogger.error(`Error ${error}`);
      return res.status(statusCode).json({
        success: false,
        message,
        error: {
          name: error.name,
          message: error.message,
          stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
        },
      });
    };
  }
}
