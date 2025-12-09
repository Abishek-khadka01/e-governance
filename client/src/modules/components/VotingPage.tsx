import React, { useState } from "react";
import type { CandidateWithRelations, ElectionCandidatesResponse } from "../pages/types";
import { useNavigate } from "react-router-dom";

interface ElectionDetailProps {
  electionData: ElectionCandidatesResponse;
}

const ElectionDetail: React.FC<ElectionDetailProps> = ({ electionData }) => {
  const navigate = useNavigate();
  const [voteSubmitted, setVoteSubmitted] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);

  if (!electionData.success || electionData.data.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <p className="text-center text-gray-500 text-base sm:text-lg">No election data available.</p>
      </div>
    );
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
    setSelectedCandidate(candidateId);
    alert("Vote submitted successfully!");
    setTimeout(() => navigate("/dashboard"), 1500);
  };

  const isOngoing = new Date() >= new Date(election.start_date) && new Date() <= new Date(election.end_date);
  const isPast = new Date() > new Date(election.end_date);
  const isFuture = new Date() < new Date(election.start_date);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header Section - Responsive with Background Image */}
      <div 
        className="relative text-black py-8 sm:py-12 lg:py-16 px-4 sm:px-6 shadow-xl overflow-hidden"
        style={{
          backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/e/ef/Election_Commission%2C_Nepal.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Overlay for better text readability */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90"></div> */}
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 sm:mb-4 tracking-tight leading-tight px-2 text-black drop-shadow-lg">
            {election.election_name}
          </h1>
          
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 md:gap-4 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 px-2">
            <span className="bg-white/20 backdrop-blur-sm px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full font-semibold">
              {election.election_type}
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full font-semibold">
              {election.year}
            </span>
            {isOngoing && (
              <span className="bg-green-500 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full font-bold animate-pulse text-xs sm:text-sm lg:text-base">
                🔴 LIVE NOW
              </span>
            )}
            {isPast && (
              <span className="bg-gray-500 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full font-semibold">
                Completed
              </span>
            )}
            {isFuture && (
              <span className="bg-yellow-500 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded-full font-semibold">
                Upcoming
              </span>
            )}
          </div>

          <div className="text-xs sm:text-sm md:text-base lg:text-lg flex flex-col sm:flex-row flex-wrap justify-center items-center gap-2 sm:gap-4 px-2">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="break-words">Start: {new Date(election.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="break-words">End: {new Date(election.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Responsive */}
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-12">
        <div className="mb-6 sm:mb-8 text-center px-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Participating Parties & Candidates</h2>
          <p className="text-sm sm:text-base text-gray-600">Select your preferred candidate to cast your vote</p>
        </div>

        {/* Parties Grid - Fully Responsive */}
        <div className="space-y-4 sm:space-y-6 md:space-y-8">
          {Object.keys(partiesMap).map((partyId) => {
            const candidates = partiesMap[partyId];
            const party = candidates[0].parties;

            return (
              <div
                key={partyId}
                className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                {/* Party Header - Responsive */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 p-3 sm:p-4 md:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 break-words">{party.party_name}</h3>
                        <p className="text-sm sm:text-base text-gray-600 mt-1 break-words">
                          <span className="font-semibold">Leader:</span> {party.leader_name}
                        </p>
                      </div>
                    </div>
                    <div className="bg-blue-600 text-white px-4 sm:px-5 md:px-6 py-1.5 sm:py-2 rounded-full font-bold text-base sm:text-lg shadow-md self-start sm:self-auto flex-shrink-0">
                      {party.abbreviation}
                    </div>
                  </div>
                </div>

                {/* Candidates Grid - Responsive */}
                <div className="p-3 sm:p-4 md:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                  {candidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className={`relative border-2 rounded-lg sm:rounded-xl p-4 sm:p-5 md:p-6 transition-all duration-300 ${
                        voteSubmitted && selectedCandidate === candidate.id
                          ? "border-green-500 bg-green-50 shadow-lg scale-105"
                          : "border-gray-200 bg-white hover:border-blue-400 hover:shadow-xl hover:-translate-y-1"
                      }`}
                    >
                      {/* Candidate Photo */}
                      <div className="flex flex-col items-center mb-3 sm:mb-4">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-2 sm:mb-3 shadow-md flex-shrink-0">
                          <svg className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <h4 className="text-lg sm:text-xl font-bold text-gray-800 text-center mb-2 break-words w-full">
                          {candidate.candidate_name}
                        </h4>
                      </div>

                      {/* Vote Button - Responsive */}
                      <button
                        onClick={() => handleVote(candidate.id)}
                        disabled={voteSubmitted || !isOngoing}
                        className={`w-full py-2.5 sm:py-3 rounded-lg font-bold text-white shadow-lg transition-all duration-300 text-sm sm:text-base ${
                          voteSubmitted && selectedCandidate === candidate.id
                            ? "bg-green-500 cursor-not-allowed"
                            : voteSubmitted
                            ? "bg-gray-300 cursor-not-allowed"
                            : !isOngoing
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl transform hover:scale-105 active:scale-95"
                        }`}
                      >
                        {voteSubmitted && selectedCandidate === candidate.id ? (
                          <span className="flex items-center justify-center gap-2">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="truncate">Voted Successfully</span>
                          </span>
                        ) : voteSubmitted ? (
                          "Voted"
                        ) : !isOngoing ? (
                          isPast ? "Election Ended" : "Not Started"
                        ) : (
                          "Cast Your Vote"
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Banner - Responsive */}
        {!isOngoing && (
          <div className="mt-6 sm:mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4 sm:p-5 md:p-6 rounded-lg">
            <div className="flex items-start sm:items-center gap-3">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600 flex-shrink-0 mt-0.5 sm:mt-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-yellow-800 font-semibold text-sm sm:text-base leading-relaxed">
                {isPast ? "This election has ended. Voting is no longer available." : "This election has not started yet. Voting will begin on the start date."}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ElectionDetail;