
import type {Request , Response} from 'express'
import { Result } from '../../common/Response'
import { VoteService } from './votes.service';
import { VoterRepository } from './votes.repository';
import AppLogger from '../../utils/logger';
import { CandidateService } from '../candidates/candidate.service';
import { ElectionService } from '../elections/election.service';
export class VoterController {

  static async  CastVote (req : Request , res  : Response) {
    try {
      AppLogger.info(`The Cast vote  is running `);
      console.table(req.body)
      const { candidate_id, election_id} = req.body;
        const {id} = req;
      if(!id || !candidate_id || !election_id) {
        return Result.CreateError(new Error('Give all the candidate id, election id and the voteid '), 'Give all the details properly')(res);
      }

        const hasVoted = await VoterRepository.hasVoted(id , election_id);
          console.log(`Has the user voted ${hasVoted}`)

        if(hasVoted){
          return Result.CreateError(new Error(`The user has already voted`), 'The user has already voted ', 401)(res);
        }
      await VoteService.CastVote(id,  candidate_id , election_id);

      return Result.CreateSuccess<string>('Vote Casted Successfully')(res);        
    } catch (error) {
      return Result.CreateError(error as Error, 'Internal Server Error')(res);
    }
  }

  static async ResultsForElection(req: Request, res: Response) {
    try {
      const { electionid } = req.body;

      if (!electionid) {
        return Result.CreateError(
          new Error("No election id provided"),
          "No election id was provided",
          401
        )(res);
      }

      // 1. Get grouped vote counts
      const electionResults = await VoteService.GetElectionResults(electionid);
  
      // 2. Fetch candidate details
      const resultsWithCandidates = await Promise.all(
        electionResults.map(async (voteGroup : any ) => {
          const candidate = await CandidateService.FindCandidateByRealId(
            voteGroup.candidate_id,
    
          );
          return {
            candidate_id: voteGroup.candidate_id,
            vote_count: voteGroup._count._all,
            candidate,
          };
        })
      );

      return Result.CreateSuccess(resultsWithCandidates, 200)(res);
    } catch (error) {
      console.log(`The errors is ${error}`)
      return Result.CreateError(
        new Error("Error fetching election results"),
        "Internal Server Error",
        500
      )(res);
    }
  }
  
}

