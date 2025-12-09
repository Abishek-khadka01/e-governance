import React, { useState } from "react";
import type { CandidateWithRelations, ElectionCandidatesResponse } from "../pages/types";
import { useNavigate } from "react-router-dom";

interface ElectionDetailProps {
  electionData: ElectionCandidatesResponse;
}

const ElectionDetail: React.FC<ElectionDetailProps> = ({ electionData }) => {
  const navigate = useNavigate();
  const [voteSubmitted, setVoteSubmitted] = useState(false);

  if (!electionData.success || electionData.data.length === 0) {
    return <p className="text-center text-gray-500 mt-10">No election data available.</p>;
  }

  const election = electionData.data[0].elections;

  // Group candidates by party
  const partiesMap: { [key: string]: CandidateWithRelations[] } = {};
  electionData.data.forEach((candidate) => {
    const partyId = candidate.parties.id;
    if (!partiesMap[partyId]) partiesMap[partyId] = [];
    partiesMap[partyId].push(candidate);
  });

  const handleVote = (candidateId: string) => {
    if (voteSubmitted) return;
    console.log("Vote submitted for candidate:", candidateId);
    setVoteSubmitted(true);
    alert("Voted");
    navigate("/dashboard");
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Election Name Centered */}
      <div className="mb-10 text-center">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-3">{election.election_name}</h1>
        <p className="text-lg text-gray-600">{election.election_type} - {election.year}</p>
        <p className="text-sm text-gray-500 mt-1">
          {new Date(election.start_date).toLocaleDateString()} to {new Date(election.end_date).toLocaleDateString()}
        </p>
      </div>

      {/* Parties and Candidates */}
      {Object.keys(partiesMap).map((partyId) => {
        const candidates = partiesMap[partyId];
        const party = candidates[0].parties;

        return (
          <div
            key={partyId}
            className="mb-8 p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-800">{party.party_name}</h2>
              <span className="text-gray-500 font-medium">{party.abbreviation}</span>
            </div>
            <p className="text-gray-500 mb-4">Leader: {party.leader_name}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {candidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="border rounded-lg p-6 flex flex-col items-center justify-between transition-transform hover:scale-105 bg-white shadow-sm"
                >
                  {/* Candidate Name */}
                  <span className="text-xl font-semibold text-gray-800 mb-4 text-center">
                    {candidate.candidate_name}
                  </span>

                  {/* Vote Now Button */}
                  <button
                    onClick={() => handleVote(candidate.id)}
                    className={`px-6 py-3 rounded-lg font-semibold text-white shadow-md transition-colors ${
                      voteSubmitted ? "bg-green-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                    disabled={voteSubmitted}
                  >
                    {voteSubmitted ? "Voted ✅" : "Vote Now"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ElectionDetail;
``