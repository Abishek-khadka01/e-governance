import { Router } from "express";
import { AppMiddleware } from "../../middlewares/app.middleware";
import { VoterController } from "./vote.controller";

const VoteRouter = Router();


VoteRouter.use(AppMiddleware);

VoteRouter.post('/cast-vote', VoterController.CastVote);


export {VoteRouter};