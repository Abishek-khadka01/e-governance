
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CandidateDashboard: React.FC = () => {

  const navigate = useNavigate();

  // Dummy data for elections
  const dummyElections = [
    "2015 - 2020",
    "2020 - 2025",
    "2025 - 2030",
  ];

  // Dummy data for parties
  const dummyParties = [
    "National Democratic Party",
    "United People's Front",
    "Progressive Alliance",
    "Freedom Party",
  ];
``
  const [activeSection, setActiveSection] = useState<"elections" | "parties" | null>(null);
  const [elections, setElections] = useState<string[]>([]);
  const [parties, setParties] = useState<string[]>([]);

  // Handle Election Click — load dummy
  const handleElectionClick = () => {
    setActiveSection("elections");
    setElections(dummyElections);
  };

  // Handle Election Year Navigation
  const handleElectionYear = async (yearid: string) => {
    try {
      navigate(`/candidates/year?year=${encodeURIComponent(yearid)}`);
    } catch (error) {
      console.error("Error handling election year", error);
    }
  };

  // Handle Candidates by Party
  const handleCandidateswithParty = async (partyId: string) => {
    navigate(`/candidates/${encodeURIComponent(partyId)}`);
  };

  // Handle Party Click — load dummy
  const handlePartyClick = () => {
    setActiveSection("parties");
    setParties(dummyParties);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-10 text-gray-900">
        Candidate Dashboard
      </h1>

      {/* Buttons */}
      <div className="flex gap-4 mb-10">
        <button
          onClick={handleElectionClick}
          className={`px-6 py-2 rounded-lg font-medium transition 
            ${activeSection === "elections" ? "bg-blue-600 text-white" : "bg-white border hover:bg-gray-100"}
          `}
        >
          Browse by Election
        </button>

        <button
          onClick={handlePartyClick}
          className={`px-6 py-2 rounded-lg font-medium transition 
            ${activeSection === "parties" ? "bg-blue-600 text-white" : "bg-white border hover:bg-gray-100"}
          `}
        >
          Browse by Party
        </button>
      </div>

      {/* Election Section */}
      {activeSection === "elections" && (
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Select Election Year
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {elections.map((yearRange) => (
              <div
                key={yearRange}
                className="p-6 bg-white rounded-xl border shadow-md hover:shadow-xl transition hover:-translate-y-1"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {yearRange}
                </h3>

                <button
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  onClick={() => handleElectionYear(yearRange)}
                >
                  View →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Parties Section */}
      {activeSection === "parties" && (
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Select Party
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {parties.map((party) => (
              <div
                key={party}
                className="p-6 bg-white rounded-xl border shadow-md hover:shadow-xl transition hover:-translate-y-1"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {party}
                </h3>

                <button
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  onClick={() => handleCandidateswithParty(party)}
                >
                  View →
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateDashboard;
