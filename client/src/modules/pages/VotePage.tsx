import React from "react";
import VotingPage from "../components/VotingPage";
import {  type Parties } from "../components/types";
const dummyParties: Parties[] = [
  {
    id: "1",
    party_name: "Democratic Party",
    abbreviation: "DP",
    leader_name: "John Doe",
    is_verified: true,
    created_at: null,
    registered_by: "admin",
  },
  {
    id: "2",
    party_name: "Future Vision Party",
    abbreviation: "FVP",
    leader_name: "Alice Rai",
    is_verified: false,
    created_at: null,
    registered_by: "admin",
  },
];

export default function VotingPageList() {
  const handleVote = (partyId: string) => {
    console.log("Voted for:", partyId);
  };

  return <VotingPage parties={dummyParties} onVote={handleVote} />;
}
