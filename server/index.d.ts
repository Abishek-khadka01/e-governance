import type { Request } from "express";
import { UploadedFile } from "./src/utils/multer";
declare global {
  namespace Express {
    interface Request {
      files?: UploadedFile[];
      id? : string ,
      role? : string ,
      email?  : string 
    }
  }
}
