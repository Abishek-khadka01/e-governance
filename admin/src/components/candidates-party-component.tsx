import React from "react";
import type { Candidate, Party, User } from "./types";

interface PartyUsersListProps {
  data: Candidate[];
}

const PartyUsersList: React.FC<PartyUsersListProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="text-center text-gray-500 mt-10">No data available</div>;
  }

  // Group candidates by party ID
  const partiesMap: Record<string, { party: Party; candidates: User[] }> = {};

  data.forEach((candidate) => {
    const partyId = candidate.parties.id;
    if (!partiesMap[partyId]) {
      partiesMap[partyId] = { party: candidate.parties, candidates: [] };
    }
    partiesMap[partyId].candidates.push(candidate.users);
  });

  const partyGroups = Object.values(partiesMap);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">

      {partyGroups.map(({ party, candidates }) => (
        <div key={party.id} className="space-y-4">

          {/* Party Info */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-2">{party.party_name}</h2>
            <p className="text-gray-700"><span className="font-semibold">Abbreviation:</span> {party.abbreviation}</p>
            <p className="text-gray-700"><span className="font-semibold">Leader:</span> {party.leader_name}</p>
            <p className="text-gray-700"><span className="font-semibold">Verified:</span> {party.is_verified ? "Yes" : "No"}</p>
          </div>

          {/* Candidates (Users) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {candidates.map((user) => (
              <div
                key={user.id}
                className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
              >
                <h3 className="text-lg font-semibold mb-1">{user.username}</h3>
                <p className="text-gray-700"><span className="font-semibold">Email:</span> {user.email}</p>
                <p className="text-gray-700"><span className="font-semibold">Phone:</span> {user.phone_number}</p>
                <p className="text-gray-700"><span className="font-semibold">User Type:</span> {user.user_type}</p>
                <p className="text-gray-700"><span className="font-semibold">Verified:</span> {user.is_verified ? "Yes" : "No"}</p>
              </div>
            ))}
          </div>

        </div>
      ))}

    </div>
  );
};

export default PartyUsersList;
