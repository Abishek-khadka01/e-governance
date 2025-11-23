import multer from 'multer';
import path from 'path';
import type { Request } from 'express';
import fs from 'fs' ;
// TypeScript interface for uploaded files
export interface UploadedFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
}

// Configure storage
const storage = multer.diskStorage({
  destination: (_req: Request, _file: Express.Multer.File, cb: Function) => {

    if(!fs.existsSync(path.join(process.cwd(), 'uploads'))) {
      fs.mkdirSync(path.join(process.cwd(), 'uploads'))
    }
    cb(null, path.join(process.cwd(), 'uploads'));
  },

  filename: (_req: Request, file: Express.Multer.File, cb: Function) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);

    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

// File filter
const fileFilter: multer.Options['fileFilter'] = (_req: Request, file: Express.Multer.File, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword'];

  allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error('Invalid file type'));
};

export const upload  = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});
