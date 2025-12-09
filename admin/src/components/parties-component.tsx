import type { Party } from "./types";

interface PartyCardProps {
  party: Party;
  onVerifyParty: (id: string) => void;
}

export const PartyCard = ({ party, onVerifyParty }: PartyCardProps) => {
  return (
    <div className="group w-full max-w-sm bg-white rounded-2xl border border-gray-300 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      
      {/* Header with muted gradient */}
      <div
        className={`relative p-6 ${
          party.is_verified
            ? "bg-gradient-to-br from-emerald-600 to-emerald-700" // muted green
            : "bg-gradient-to-br from-slate-500 to-slate-600" // muted gray
        }`}
      >
        {/* soft decorative circle */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12"></div>

        <div className="relative z-10">
          <h3 className="text-2xl font-bold text-white mb-1 break-words">
            {party.party_name}
          </h3>

          <div className="inline-flex items-center px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full">
            <span className="text-sm font-semibold text-white">{party.abbreviation}</span>
          </div>
        </div>

        {/* Verification Badge */}
        <div className="absolute top-4 right-4">
          {party.is_verified ? (
            <div className="flex items-center gap-1 px-3 py-1 bg-white rounded-full shadow">
              <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs font-bold text-emerald-600">Verified</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 px-3 py-1 bg-white rounded-full shadow">
              <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs font-bold text-gray-500">Pending</span>
            </div>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 space-y-4">
        
        {/* Leader */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 p-2 bg-gray-200 rounded-lg">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Leader</p>
            <p className="text-base font-semibold text-gray-800 mt-1 break-words">{party.leader_name}</p>
          </div>
        </div>

        {/* Registration Date */}
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 p-2 bg-gray-200 rounded-lg">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Registered</p>
            <p className="text-base font-semibold text-gray-800 mt-1">
              {new Date(party.created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onVerifyParty(party.id)}
          disabled={party.is_verified}
          className={`
            w-full py-3 px-4 rounded-xl font-semibold text-white 
            transition-all duration-300 shadow-md flex items-center justify-center gap-2
            ${
              party.is_verified
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800 hover:shadow-xl transform hover:scale-105 active:scale-95"
            }
          `}
        >
          {party.is_verified ? (
            <>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Already Verified</span>
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Verify Party</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

/* Register Section (also dulled) */
interface RegisterPartySectionProps {
  onRegisterClick: () => void;
}

export const RegisterPartySection = ({ onRegisterClick }: RegisterPartySectionProps) => {
  return (
    <div className="bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl p-8 shadow-lg mb-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0 p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <div className="text-white">
            <h2 className="text-2xl font-bold mb-1">Register New Party</h2>
            <p className="text-gray-200 text-sm">Add a new political party to the system</p>
          </div>
        </div>

        <button
          onClick={onRegisterClick}
          className="flex-shrink-0 px-6 py-3 bg-white text-slate-700 font-semibold rounded-xl shadow hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Register Party</span>
        </button>
      </div>
    </div>
  );
};
