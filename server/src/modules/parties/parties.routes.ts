import { Router } from 'express';
import { AppMiddleware } from '../../middlewares/app.middleware';
import { PartyController } from './parties.controller';
import { AdminMiddleWare } from '../../middlewares/AdminMiddleware';
import { validateMiddleware } from '../../middlewares/ValidatorMiddleware';
import { createPartySchema } from './parties.validators';

export const PartyRouter = Router();

PartyRouter.use(AppMiddleware)
PartyRouter.post('/register',validateMiddleware(createPartySchema), PartyController.CreateParty)
PartyRouter.get('/', PartyController.GetAllParties)



// Admin Routes 
PartyRouter.use(AdminMiddleWare)
PartyRouter.put('/{id}', PartyController.VerifyParty)
PartyRouter.delete('/{id}', PartyController.deleteParty )