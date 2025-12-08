import React from "react";

// ----------------- Interfaces -----------------

export interface User {
  id: string;
  username: string;
  phone_number: string;
  email: string;
  password_hash: string;
  user_type: string;
  is_verified: boolean;
  created_at: string;
  citizenship_no: string;
}

export interface Election {
  id: string;
  election_name: string;
  election_type: string;
  year: number;
  start_date: string;
  end_date: string;
  created_at: string;
}

export interface Party {
  id: string;
  party_name: string;
  abbreviation: string;
  leader_name: string;
  is_verified: boolean;
  created_at: string;
  registered_by: string | null;
}

export interface Candidate {
  id: string;
  candidate_name: string;
  year: number;
  created_at: string;
  user_id: string;
  party_id: string;
  election_id: string;
  users: User;
  elections: Election;
  parties: Party;
}

// ----------------- Component -----------------

interface UsersByElectionProps {
  data: Candidate[];
}

const UsersByElection: React.FC<UsersByElectionProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div className="text-center text-gray-500 mt-10">No users found</div>;
  }

  // Use the first item to get election info
  const election = data[0].elections;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      
      {/* Election Info */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-2">{election.election_name}</h2>
        <p className="text-gray-700"><span className="font-semibold">Type:</span> {election.election_type}</p>
        <p className="text-gray-700"><span className="font-semibold">Year:</span> {election.year}</p>
      </div>

      {/* Users List */}
      <div className="space-y-4">
        {data.map((candidate) => {
          const user = candidate.users;
          return (
            <div
              key={user.id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
              <h3 className="text-xl font-semibold mb-2">{user.username}</h3>
              <p className="text-gray-700"><span className="font-semibold">Email:</span> {user.email}</p>
              <p className="text-gray-700"><span className="font-semibold">Phone:</span> {user.phone_number}</p>
              
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default UsersByElection;
