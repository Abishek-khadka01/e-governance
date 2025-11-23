
import type {Request , Response} from 'express'
import { Result } from '../../common/Response'
import { VoteService } from './votes.service';

export class VoterController {
  private  static readonly    voteService  = VoteService;
  static async  CastVote (req : Request , res  : Response) {
    try {
      const {vote_id, candidate_id, election_id} = req.body;

      if(!vote_id || !candidate_id || !election_id) {
        return Result.CreateError(new Error('Give all the candidate id, election id and the voteid '), 'Give all the details properly');
      }
      await this.voteService.CastVote(vote_id, candidate_id , election_id);

      return Result.CreateSuccess<string>('Vote Casted Successfully');        
    } catch (error) {
      return Result.CreateError(error as Error, 'Internal Server Error')
    }
  }
  
}

