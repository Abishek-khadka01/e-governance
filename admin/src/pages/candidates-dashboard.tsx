import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ELECTIONS, GET_ALL_PARTIES } from "../api/constants";
import type { Election, Party } from "./types";

const CandidateDashboard: React.FC = () => {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState<"elections" | "parties" | null>(null);
  const [elections, setElections] = useState<Election[]>([]);
  const [parties, setParties] = useState<Party[]>([]);

  // Fetch elections from API
  const fetchElections = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}${ELECTIONS}`, {
        withCredentials: true,
      });
      setElections(response.data.data);
    } catch (error) {
      console.error("Failed to fetch elections:", error);
    }
  };

  // Fetch parties from API
  const fetchParties = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}${GET_ALL_PARTIES}`, {
        withCredentials: true,
      });
      setParties(response.data.data);
    } catch (error) {
      console.error("Failed to fetch parties:", error);
    }
  };

  // Load data on mount
  useEffect(() => {
    fetchElections();
    fetchParties();
  }, []);

  // Handle Election Click — show section
  const handleElectionClick = () => setActiveSection("elections");

  // Handle Party Click — show section
  const handlePartyClick = () => setActiveSection("parties");

  // Navigate to election year
  const handleElectionYear = (yearId: string) => {
    navigate(`/candidates/year?year=${encodeURIComponent(yearId)}`);
  };

  // Navigate to candidates by party
  const handleCandidatesWithParty = (partyId: string) => {
    navigate(`/candidates/${encodeURIComponent(partyId)}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-10 text-gray-900">
        Candidate Dashboard
      </h1>

      {/* Section Buttons */}
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
            {elections.map((election) => (
              <div
                key={election.id}
                className="p-6 bg-white rounded-xl border shadow-md hover:shadow-xl transition hover:-translate-y-1"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {election.election_name} ({election.year})
                </h3>

                <button
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  onClick={() => handleElectionYear(election.year.toString())}
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
                key={party.id}
                className="p-6 bg-white rounded-xl border shadow-md hover:shadow-xl transition hover:-translate-y-1"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {party.party_name}
                </h3>

                <button
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  onClick={() => handleCandidatesWithParty(party.id)}
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
