
import { Router } from "express";
import { AppMiddleware } from "../../middlewares/app.middleware";
import { validateMiddleware } from "../../middlewares/ValidatorMiddleware";
import { electionCreateSchema, electionUpdateSchema } from "./election.validators";
import { ElectionController } from "./election.controller";
import { AdminMiddleWare } from "../../middlewares/AdminMiddleware";

export const ElectionRouter = Router();

ElectionRouter.use(AppMiddleware);


ElectionRouter.post('/register', validateMiddleware(electionCreateSchema), ElectionController.CreateElection)

ElectionRouter.get('/', ElectionController.GetElections);


ElectionRouter.use(AdminMiddleWare)

ElectionRouter.put('/update', validateMiddleware(electionUpdateSchema), ElectionController.UpdateDate)




