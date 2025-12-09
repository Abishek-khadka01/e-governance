import { AuthService, AuthDocumentService } from './auth.service';
import { Prisma } from '../../generated/prisma/client';
import type { Request, Response } from 'express';
import type { UserLoginRequest, UserLoginResponse, UserRegisterRequest } from './auth.types';
import AppLogger from '../../utils/logger';
import { Result } from '../../common/Response';
import { uploadFromPath } from '../../utils/cloudinary';
import { ComparePassword, HashPassword, SignToken } from '../../common/passwordService';
import { v4 } from 'uuid';

export class AuthController {
  static async UserRegister(req: Request, res: Response) {
    try {
      const request: UserRegisterRequest = req.body;

  
      const emailExists = await AuthService.findByEmail(request.email);
      if (emailExists) {
        return Result.CreateSuccess({ error: 'Email already registered' }, 400)(res);
      }

      const phoneExists = await AuthService.findByPhoneNumber(request.phone_number);
      if (phoneExists) {
        return Result.CreateSuccess({ error: 'Phone number already registered' }, 400)(res);
      }

      const citizenExists = await AuthService.findByCitizenNO(request.citizenship_no);
      if (citizenExists) {
        return Result.CreateSuccess({ error: 'Citizenship number already registered' }, 400)(res);
      }

 
      const files = req.files as Express.Multer.File[];

        console.log(`The files are `, req.files)
      if (!files || !Array.isArray(files) || files.length === 0) {
        return Result.CreateSuccess({ error: 'Document file is required' }, 400)(res);
      }

      const createdUser = await AuthService.createUser({
        username: request.username,
        email: request.email,
        phone_number: request.phone_number,
        citizenship_no: request.citizenship_no,
        password_hash: await HashPassword(request.password),
        id : v4()
      } as Prisma.usersCreateInput);


      for (const f of files) {
        if (!f?.path) continue;

        const uploaded = await uploadFromPath(f.path);

        await AuthDocumentService.create({
          document_type: request.document_type,
          document_url: uploaded.url,
          user_id: createdUser.id,
        });
      }

      return Result.CreateSuccess(createdUser, 201)(res);
    } catch (error) {
      AppLogger.error(`Error in user registration: ${error}`);
      return Result.CreateError(error as Error, 'Internal Server Error', 500)(res);
    }
  }


  static async UserLogin(req: Request, res: Response) {
    try {
      AppLogger.info(`User Login Controller is runnning `);
      const request: UserLoginRequest = req.body;

      const user = await AuthService.findByEmail(request.email);

        console.table(user);
      if (!user) {
        return Result.CreateError(new Error('Invalid credentials'), 'User not found', 400)(res);
      }

      const isPasswordValid = await ComparePassword(request.password, user.password_hash);

        console.log(`The password valid is ${isPasswordValid}`)
      if (!isPasswordValid) {
        return Result.CreateError(new Error('Invalid credentials'), 'Invalid Credentials', 400)(res);
      }

      const token = SignToken({
        email: request.email,
        role: user.user_type as string,
        id: user.id,
      });

      res.cookie('AUTH_TOKEN', token, {

      secure: false,      // false on localhost
      sameSite: "lax",    // "none" + secure:true in prod
      maxAge: 60000000
    });

      return Result.CreateSuccess<UserLoginResponse>(user)(res);
    } catch (error) {
      return Result.CreateError(error as Error, 'Internal Server Error')(res);
    }
  }

  static async GetAllUsers (req : Request , res :Response) {
      try {
        
        const response = await AuthService.findAll() as UserLoginResponse[];

        if(!response) {
          return Result.CreateError(new Error('NO users found'), 'NO users found')(res);
        }

        return Result.CreateSuccess<UserLoginResponse[]>(response)(res);

      } catch (error) {
        return Result.CreateError(error as Error, 'Internal Server Error')(res);
      }

  }


  static async CreateAdmin (req : Request  ,res : Response){
      try {
        
        const {id} = req  ;

        const {user_id } = req.params;

        await AuthService.update(user_id as string , {
          user_type : 'admin'
        });


        return Result.CreateSuccess<string>('Admin Made successfully')(res);

      } catch (error) {
        return Result.CreateError(error as Error, 'Internal Server Error ') (res);
      }
  }


  static async VerifyUser (req : Request , res : Response) {
    try {
      const {id} = req;
      
      const  {user_id } = req.params;

      //verifying the user first 
      
      AppLogger.info(`The Verify user endpoint is running `);
       const findDocument = await AuthDocumentService.findByUserID(user_id as string );

      //  if(!findDocument){
      //   return Result.CreateError(new Error('No Files are provided'), 'NO files are received');
      //  }

      findDocument.forEach(async (document)=>{
          await AuthDocumentService.update(document.id , {
              status : 'approved',
              verified_by : id as string 
          })
      })

      await AuthService.update(user_id as string , {
        is_verified : true
      })

      return Result.CreateSuccess<string>('User Verified Successfully');

    } catch (error) {
      return Result.CreateError(error as Error, 'Internal Server Error')(res);
    }

  }
}
