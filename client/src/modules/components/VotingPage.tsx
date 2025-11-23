import React from "react";
import { type Parties } from "./types";

interface VotingPageProps {
  parties: Parties[];
  onVote: (partyId: string) => void;
}

const VotingPage: React.FC<VotingPageProps> = ({ parties, onVote }) => {
  const verifiedParties = parties.filter((p) => p.is_verified);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">
        Cast Your Vote
      </h1>

      {verifiedParties.length === 0 ? (
        <p className="text-center text-gray-500">No verified parties available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {verifiedParties.map((party) => (
            <div
              key={party.id}
              className="border rounded-lg p-6 shadow bg-white flex flex-col justify-between hover:shadow-lg transition"
            >
              <div>
                <h2 className="text-2xl font-extrabold text-gray-800 break-words">
                  {party.party_name}
                </h2>
                <p className="text-gray-600 text-sm mt-2">
                  Abbreviation:{" "}
                  <span className="font-semibold">
                    {party.abbreviation ?? "N/A"}
                  </span>
                </p>
                <p className="text-gray-700 mt-1">
                  Leader: <span className="font-medium">{party.leader_name}</span>
                </p>
              </div>

              <button
                onClick={() => onVote(party.id)}
                className="mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Vote
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VotingPage;
