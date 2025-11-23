import { AuthRouter } from '../modules/auth/auth.routes';
import { Router } from 'express';
import { PartyRouter } from '../modules/parties/parties.routes';
import { VoteRouter } from '../modules/votes/vote.routes';
import { CandidateRouter } from '../modules/candidates/candidate.routes';
export const IndexRouter = Router();

IndexRouter.use('/auth', AuthRouter);
IndexRouter.use('/parties', PartyRouter);
IndexRouter.use('/votes', VoteRouter);
IndexRouter.use('/candidates', CandidateRouter)