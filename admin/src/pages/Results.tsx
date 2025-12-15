import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface User {
  username: string;
}

interface Party {
  party_name: string;
  abbreviation: string;
}

interface Candidate {
  id: string;
  candidate_name: string;
  year: number;
  users: User;
  parties: Party;
}

interface ElectionResultItem {
  candidate_id: string;
  vote_count: number;
  candidate: Candidate;
}

interface ElectionResultsResponse {
  success: boolean;
  data: ElectionResultItem[];
}

const ElectionResultsPage: React.FC = () => {
  const { electionid } = useParams<{ electionid: string }>();
  const [results, setResults] = useState<ElectionResultItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchResults = async () => {
    try {
      setLoading(true);
      const response = await axios.post<ElectionResultsResponse>(
        `${import.meta.env.VITE_BASE_URL}/election/results`,
        { electionid },
        { withCredentials: true }
      );

      if (response.data.success) {
        const sorted = response.data.data.sort((a, b) => b.vote_count - a.vote_count);
        setResults(sorted);
      }
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (electionid) fetchResults();
  }, [electionid]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading results...</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">No results found for this election.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Election Results</h1>

        <div className="space-y-4">
          {results.map((result, index) => (
            <div
              key={result.candidate_id}
              className={`flex justify-between items-center bg-white p-4 rounded-lg shadow-md transition hover:shadow-xl ${
                index === 0 ? "border-l-4 border-green-500" : ""
              }`}
            >
              <div>
                <p className="text-lg font-semibold">{result.candidate.candidate_name}</p>
                <p className="text-sm text-gray-600">{result.candidate.parties.party_name}</p>
              </div>
              <div className="text-xl font-bold text-blue-600">{result.vote_count}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ElectionResultsPage;
