import type { Request, Response } from "express";
import { Result } from "../../common/Response";
import { CandidateService } from "./candidate.service";
import type { candidates } from "../../generated/prisma/client";
import { v4 } from "uuid";

export class CandidateController {
  /*
    Handles candidate-related requests using CandidateService:
    - Register candidate
    - Get all candidates
    - Get candidates by party
    - Delete candidate
    - Get candidates grouped by election
  */

  static async RegisterCandidate(req: Request, res: Response) {
    try {
      const { candidate_name, user_id, party_id, election_id, year } = req.body;

      const candidate = await CandidateService.CreateCandiate({
        candidate_name,
        user_id,
        party_id,
        election_id,
        year,
        id : v4()
      });

      return Result.CreateSuccess<candidates>(candidate);
    } catch (error) {
      return Result.CreateError(error as Error, "Failed to register candidate");
    }
  }

  static async GetAllCandidates(req: Request, res: Response) {
    try {
      const candidatesList = await CandidateService.FindCandidates();
      return Result.CreateSuccess(candidatesList);
    } catch (error) {
      return Result.CreateError(error as Error, "Failed to fetch candidates");
    }
  }

  static async GetCandidateById(req: Request, res: Response) {
    try {
      const { user_id, year } = req.params;
      const candidate = await CandidateService.FindCandidateById(user_id as string , Number(year));
      return Result.CreateSuccess(candidate);
    } catch (error) {
      return Result.CreateError(error as Error, "Failed to fetch candidate");
    }
  }

  static async GetCandidatesByParty(req: Request, res: Response) {
    try {
      const { party_id } = req.params;
      const candidatesList = await CandidateService.FindCandidateByParty(party_id as string );
      return Result.CreateSuccess(candidatesList);
    } catch (error) {
      return Result.CreateError(error as Error, "Failed to fetch candidates by party");
    }
  }

  static async DeleteCandidate(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await CandidateService.DeleteCandidate(id as string );
      return Result.CreateSuccess("Candidate deleted successfully");
    } catch (error) {
      return Result.CreateError(error as Error, "Failed to delete candidate");
    }
  }

  static async GetCandidatesGroupedByElection(req: Request, res: Response) {
    try {
      const grouped = await CandidateService.FindCandidatesByElection();
      return Result.CreateSuccess(grouped);
    } catch (error) {
      return Result.CreateError(error as Error, "Failed to group candidates by election");
    }
  }
}