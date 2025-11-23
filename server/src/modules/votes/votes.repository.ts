import { v4 } from "uuid";
import { prisma } from "../../app";
import type { votes } from "../../generated/prisma/client";

export class VoterRepository {
  // Find if user already voted in an election
  static async hasVoted(voterId: string, electionId: string): Promise<votes | null> {
    return prisma.votes.findFirst({
      where: {
        voter_id: voterId,
        election_id: electionId,
      },
    });
  }

  // Create a vote
  static async createVote(voterId: string, candidateId: string, electionId: string): Promise<votes> {
    return prisma.votes.create({
      data: {
        voter_id: voterId,
        id : v4(), 
        candidate_id: candidateId,
        election_id: electionId,
      },
    });
  }

  // Get all votes by voter
  static async getVotesByVoter(voterId: string) {
    return prisma.votes.findMany({
      where: { voter_id: voterId },
      include: {
        candidates: {
          include: {
            users: {
              select: { password_hash: false },
            },
            parties: true,
          },
        },
        elections: true,
      },
    });
  }

  // Count total votes made by user
  static async countVotesByUser(voterId: string) {
    return prisma.votes.count({
      where: { voter_id: voterId },
    });
  }
}