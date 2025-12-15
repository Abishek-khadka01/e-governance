import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export interface ElectionType {
  id: string;
  election_name: string;
  election_type: string;
  year: string;
  start_date: string;
  end_date: string;
  created_at: string;
}

interface ElectionListProps {
  elections: ElectionType[];
}

const ElectionList: React.FC<ElectionListProps> = ({ elections }) => {
  const navigate = useNavigate();
  const {electionid} = useParams();

  console.log(`the param id is ${electionid}`);
  

  const activeElections = elections.filter((election) => {
    const now = new Date();
   const startDate = new Date(election.start_date); 
   const endDate  = new Date(election.end_date);
    console.log(`The start date is ${startDate} and end date is ${endDate}`)
    console.log(now, startDate , endDate)
    return now >= startDate && now <= endDate;
  });
    console.log(`The active elections is ${activeElections}`)
  if (activeElections.length === 0) {
    return <p className="text-center text-gray-500 p-10">No Ongoing elections</p>;
  }

  return (
    <div className="p-10 space-y-6 max-w-3xl mx-auto">
      {activeElections.map((election) => (
        <div
          key={election.id}
          className="border-2 rounded-xl p-6 shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center bg-white"
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {election.election_name}
            </h2>
            <p className="text-lg text-gray-600">
              {election.election_type} - {election.year}
            </p>
            <p className="text-sm text-gray-400">
              {new Date(election.start_date).toLocaleDateString()} to{" "}
              {new Date(election.end_date).toLocaleDateString()}
            </p>
          </div>
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors mt-4 md:mt-0"
            onClick={() => navigate(`/votes/${election.id}`)}
          >
            Vote Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default ElectionList;