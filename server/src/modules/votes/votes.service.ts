import { prisma } from "../../app";
import { v4 } from "uuid";
import { VoterRepository } from "./votes.repository";
import type { votes, elections, candidates } from "../../generated/prisma/client";

export class VoteService {
  // --------------------------
  // ✔ FIND ELECTION
  // --------------------------
  static async FindElection(electionId: string): Promise<elections | null> {
    return prisma.elections.findUnique({ where: { id: electionId } });
  }

  // --------------------------
  // ✔ FIND CANDIDATE
  // --------------------------
  static async FindCandidate(candidateId: string): Promise<candidates | null> {
    return prisma.candidates.findUnique({ where: { id: candidateId } });
  }

  // --------------------------
  // ✔ MAIN VOTE FUNCTION USING VOTER REPOSITORY
  // --------------------------
  static async CastVote(
    voterId: string,
    candidateId: string,
    electionId: string
  ): Promise<votes> {
    // 1. Check election exists
    const election = await this.FindElection(electionId);
    if (!election) throw new Error("Election not found");

    // 2. Check voting window
    const now = new Date();
    if (now < new Date(election.start_date) || now > new Date(election.end_date)) {
      throw new Error("Voting is not allowed at this time");
    }

    // 3. Candidate validation
    const candidate = await this.FindCandidate(candidateId);
    if (!candidate) throw new Error("Candidate not found");

    if (candidate.election_id !== electionId) {
      throw new Error("Candidate does not belong to this election");
    }

    // 4. Check if voter already voted
    const hasVoted = await VoterRepository.hasVoted(voterId, electionId);
    if (hasVoted) throw new Error("You have already voted in this election");

    // 5. Create vote
    return prisma.votes.create({
      data: {
        id: v4(),
        voter_id: voterId,
        candidate_id: candidateId,
        election_id: electionId,
      },
    });
  }

  // --------------------------
  // ✔ GET ELECTION RESULTS
  // --------------------------
  static async GetElectionResults(electionId: string) {
    return prisma.votes.groupBy({
      by: ["candidate_id"],
      where: { election_id: electionId },
      _count: { _all: true },
    });
  }

  // --------------------------
  // ✔ GET ALL VOTES BY USER
  // --------------------------
  static async GetVotesByUser(voterId: string) {
    return VoterRepository.getVotesByVoter(voterId);
  }

  // --------------------------
  // ✔ COUNT USER VOTES
  // --------------------------
  static async CountVotesByUser(voterId: string) {
    return VoterRepository.countVotesByUser(voterId);
  }
}