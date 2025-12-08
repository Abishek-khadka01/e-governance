import React, { useEffect, useState } from "react";
import CandidateDetails from "../components/candidates-party-component";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { CANIDATES } from "../api/constants";
import type { Candidate } from "../components/candidates-year-component";

const CandidateByElection: React.FC = () => {
  const [data, setData] = useState<Candidate[]>([]);
  const location = useLocation();

  // Parse query params
  const searchParams = new URLSearchParams(location.search);
  const year = searchParams.get("year"); // http://localhost:5173/candidates/year?year=2025

  const fetchUsersByYear = async (yearId: string) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}${CANIDATES}/year?year=${yearId}`,
        { withCredentials: true }
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching users by year:", error);
    }
  };

  useEffect(() => {
    if (!year) {
      alert("Year parameter missing in URL");
      return;
    }
    fetchUsersByYear(year);
  }, [year]);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <CandidateDetails data={data} />
    </div>
  );
};

export default CandidateByElection;
