import axios from "axios";
import { useEffect, useState } from "react";
import { PartyCard } from "../components/parties-component";
import  type { Party } from "../auth/types";
import { GET_ALL_PARTIES, VERIFY_PARTY } from "../api/constants";

export const PartiesPage = () => {
  const [parties, setParties] = useState<Party[]>([]);

  useEffect(() => {
    const fetchParties = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}${GET_ALL_PARTIES}`,
          { withCredentials: true }
        );

        setParties(response?.data?.data || []);
      } catch (err) {
        console.error("Failed to fetch parties:", err);
      }
    };

    fetchParties();
  }, []);

  const onVerifyParty = async (id: string) => {
    await axios.put(
      `${import.meta.env.VITE_BASE_URL}${VERIFY_PARTY}/${id}`,
      {},
      { withCredentials: true }
    );

    // Update UI without reload
    setParties((prev) =>
      prev.map((party) =>
        party.id === id ? { ...party, is_verified: true } : party
      )
    );
  };

  return (
    <div className="p-6 flex flex-wrap gap-4">
      {parties.map((party) => (
        <PartyCard
          key={party.id}
          party={party}
          onVerifyParty={onVerifyParty}
        />
      ))}
    </div>
  );
};
