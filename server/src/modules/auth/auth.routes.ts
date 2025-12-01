import { Router } from 'express';
import { validateMiddleware } from '../../middlewares/ValidatorMiddleware';
import { userLoginSchema, userRegisterSchema } from './auth.validator';
import { AuthController } from './auth.controller';
import { upload } from '../../utils/multer';
import { AppMiddleware } from '../../middlewares/app.middleware';
import { AdminMiddleWare } from '../../middlewares/AdminMiddleware';

export const AuthRouter = Router();

AuthRouter.post('/register', validateMiddleware(userRegisterSchema),upload.array('verification'),  AuthController.UserRegister);
AuthRouter.post('/login', validateMiddleware(userLoginSchema), AuthController.UserLogin);

//admin 
AuthRouter.use(AppMiddleware);
AuthRouter.use(AdminMiddleWare);


AuthRouter.get('/all',  AuthController.GetAllUsers)
AuthRouter.put('/create-admin/:user_id', AuthController.CreateAdmin);
AuthRouter.put('/verify-user/:user_id', AuthController.VerifyUser);