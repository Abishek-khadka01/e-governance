import { Router } from "express";
import { AppMiddleware } from "../../middlewares/app.middleware";
import { VoterController } from "./vote.controller";
import { AdminMiddleWare } from "../../middlewares/AdminMiddleware";

const VoteRouter = Router();


VoteRouter.use(AppMiddleware);

VoteRouter.post('/cast-vote', VoterController.CastVote);
VoteRouter.use(AdminMiddleWare)
VoteRouter.get('/results', VoterController.ResultsForElection);

export {VoteRouter};