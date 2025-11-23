import  type { Party } from "../auth/types";

interface PartyCardProps {
  party: Party;
  onVerifyParty: (id: string) => void;
}

export const PartyCard = ({ party, onVerifyParty }: PartyCardProps) => {
  return (
    <div className="w-[260px] p-4 border rounded shadow bg-white">
      <p className="text-lg font-semibold">{party.party_name}</p>
      <p className="text-sm text-gray-600">({party.abbreviation})</p>

      <p className="mt-2 text-sm">Leader: {party.leader_name}</p>

      <p
        className={`mt-2 text-sm font-medium ${
          party.is_verified ? "text-green-600" : "text-red-600"
        }`}
      >
        {party.is_verified ? "Verified" : "Not Verified"}
      </p>

      <p className="text-xs text-gray-500 mt-2">
        Registered At: {new Date(party.created_at).toLocaleDateString()}
      </p>

      <button
        className="mt-4 px-3 py-2 bg-blue-600 text-white rounded w-full"
        onClick={() => onVerifyParty(party.id)}
        disabled={party.is_verified}
      >
        {party.is_verified ? "Already Verified" : "Verify Party"}
      </button>
    </div>
  );
};
