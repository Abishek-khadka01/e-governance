import {  type Parties } from "./types";

interface PartyListProps {
  parties: Parties[];
  onViewCandidates: (partyId: string) => void;
}

export default function PartyList({ parties, onViewCandidates }: PartyListProps) {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8">

        {/* Header */}
        <h1 className="text-3xl font-bold text-blue-700 mb-6">
          Registered Parties
        </h1>

        {/* If no parties */}
        {parties.length === 0 && (
          <p className="text-gray-600 text-center text-lg">No parties registered yet.</p>
        )}

        {/* Party List */}
        <div className="space-y-4">
          {parties.map((party) => (
            <div
              key={party.id}
              className="border rounded-lg p-5 bg-gray-50 flex justify-between items-center"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {party.party_name}

                  {party.abbreviation && (
                    <span className="text-blue-600 ml-2">
                      ({party.abbreviation})
                    </span>
                  )}
                </h2>

                <p className="text-gray-700">
                  Leader: <span className="font-semibold">{party.leader_name}</span>
                </p>

                <p className="text-gray-700">
                  Registered By: {party.registered_by || "N/A"}
                </p>

                {/* Verification */}
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-semibold text-gray-800">Status:</span>

                  {party.is_verified ? (
                    <span className="text-green-600 font-semibold">
                      ✔ Verified
                    </span>
                  ) : (
                    <span className="text-red-600 font-semibold">
                      ✖ Unverified
                    </span>
                  )}
                </div>
              </div>

              {/* View Candidates Button */}
              <button
                onClick={() => onViewCandidates(party.id)}
                className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold transition"
              >
                View Candidates
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
