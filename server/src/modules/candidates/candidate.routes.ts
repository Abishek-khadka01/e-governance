import { Router } from "express";
import { CandidateController } from "./candiate.controller";
import { AppMiddleware } from "../../middlewares/app.middleware";

const CandidateRouter = Router();
CandidateRouter.use(AppMiddleware)
CandidateRouter.post('/register', CandidateController.RegisterCandidate);
CandidateRouter.get('/:party_id', CandidateController.GetCandidatesByParty);
CandidateRouter.get('/year', CandidateController.GetCandidateByYear);

export {CandidateRouter}

