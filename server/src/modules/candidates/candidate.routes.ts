import { Router } from "express";
import { CandidateController } from "./candiate.controller";
import { AppMiddleware } from "../../middlewares/app.middleware";

const CandidateRouter = Router();
CandidateRouter.use(AppMiddleware)
CandidateRouter.post('/register', CandidateController.RegisterCandidate);

CandidateRouter.get('/year', CandidateController.GetCandidateByYear);
CandidateRouter.get('/:party_id', CandidateController.GetCandidatesByParty);
CandidateRouter.get('/election/:election_id', CandidateController.GetCandidateByElection)
export {CandidateRouter}

