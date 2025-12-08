import React from "react";
import { useNavigate } from "react-router-dom"; 

export interface ElectionType {
  id: string;
  election_name: string;
  election_type: string;
  year: number;
  start_date: string; 
  end_date: string;   
  created_at: string;
}

interface ElectionListProps {
  elections: ElectionType[];
}

const ElectionList: React.FC<ElectionListProps> = ({ elections }) => {
  const navigate = useNavigate(); 
  const today = new Date();

  const activeElections = elections.filter((election) => {
    const startDate = new Date(election.start_date);
    const endDate = new Date(election.end_date);
    return today >= startDate && today <= endDate;
  });

  if (activeElections.length === 0) {
    return (
      <div>
        <p className="color-black">No Ongoing elections</p>
      </div>
    );
  }

  return (
    <div className="p-10 space-y-6 max-w-3xl mx-auto">
      {activeElections.map((election) => {
        const startDate = new Date(election.start_date);
        const endDate = new Date(election.end_date);

        return (
          <div
            key={election.id}
            className="border-2 rounded-xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center bg-white transition-transform hover:scale-105"
          >
            <div className="mb-4 md:mb-0">
              <h2 className="text-2xl font-bold text-gray-800">{election.election_name}</h2>
              <p className="text-lg text-gray-600 mt-1">{election.election_type} - {election.year}</p>
              <p className="text-sm text-gray-400 mt-1">
                {startDate.toLocaleDateString()} to {endDate.toLocaleDateString()}
              </p>
            </div>
            <button
              className="bg-blue-600 text-white text-lg font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => navigate(`/votes/${election.id}`)} 
            >
              Vote Now
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ElectionList;
