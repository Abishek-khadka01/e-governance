import { useEffect, useState } from "react";
import PartyList from "../components/PartyList";
import { type Parties } from "../components/types";
import { GET_APP_PARTIES_API } from "../../apis/PartyList";

export default function PartiesPage() {
  const [parties, setParties] = useState<Parties[]>([]);

  const handleViewCandidates = (partyId: string) => {
    console.log("View candidates for:", partyId);
    // navigate(`/parties/${partyId}/candidates`);
  };

  useEffect(() => {
    const fetchParties = async () => {
      try {
        const response = await GET_APP_PARTIES_API();
        console.table(response?.data);
        setParties(response?.data || []);
      } catch (err) {
        console.error("Failed to load parties", err);
      }
    };

    fetchParties(); 
  }, []);

  return <PartyList parties={parties} onViewCandidates={handleViewCandidates} />;
}
