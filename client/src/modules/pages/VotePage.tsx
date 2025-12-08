import React, { useEffect, useState } from "react";
import VotingPage from "../components/VotingPage";
import { CANDIDATES } from "../../apis/endpoints";
import axios from 'axios';
import type { ElectionCandidatesResponse } from "./types";
import { useParams } from "react-router-dom";

export default function VotingPageList() {
  const { electionid } = useParams();
  const [candidates, setCandidates] = useState<ElectionCandidatesResponse | null>(null);

  const getAllCandidates = async (id: string) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}${CANDIDATES}/election/${id}`, {
        withCredentials: true
      });
      console.log(`The response to get all candidates is ${response.status}`);
      setCandidates(response.data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  useEffect(() => {
    if (electionid) {
      getAllCandidates(electionid);
    }
  }, [electionid]);

  const handleVote = (partyId: string) => {
    console.log("Voted for:", partyId);
  };

  return (
    <>
      {candidates ? (
        <VotingPage electionData={candidates}  />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
