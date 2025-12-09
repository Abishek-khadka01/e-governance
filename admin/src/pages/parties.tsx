import axios from "axios";
import { useEffect, useState } from "react";
import { PartyCard, RegisterPartySection } from "../components/parties-component";
import type { Party } from "../auth/types";
import { GET_ALL_PARTIES, VERIFY_PARTY } from "../api/constants";

export const PartiesPage = () => {
  const [parties, setParties] = useState<Party[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchParties = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}${GET_ALL_PARTIES}`,
          { withCredentials: true }
        );

        setParties(response?.data?.data || []);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch parties:", err);
        setError("Failed to load parties. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchParties();
  }, []);

  const RegisterParty = async () => {
    alert(`The party is registered`);
  };

  const onVerifyParty = async (id: string) => {
    try {
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
    } catch (err) {
      console.error("Failed to verify party:", err);
      alert("Failed to verify party. Please try again.");
    }
  };

  // Calculate stats
  const verifiedCount = parties.filter(p => p.is_verified).length;
  const pendingCount = parties.filter(p => !p.is_verified).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 tracking-tight">
                Political Parties
              </h1>
              <p className="mt-2 text-sm sm:text-base text-gray-500">
                Manage and verify registered political parties
              </p>
            </div>
            
            {/* Stats Badges */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300">
                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Verified</p>
                  <p className="text-lg font-bold text-gray-700">{verifiedCount}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300">
                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Pending</p>
                  <p className="text-lg font-bold text-gray-700">{pendingCount}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg border border-gray-300">
                <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
                <div>
                  <p className="text-xs text-gray-500 font-medium">Total</p>
                  <p className="text-lg font-bold text-gray-700">{parties.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Register Party Section */}
        <RegisterPartySection onRegisterClick={RegisterParty} />

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-gray-400"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading parties...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-gray-100 border-l-4 border-gray-500 p-6 rounded-lg">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-gray-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="text-gray-800 font-semibold">Error</h3>
                <p className="text-gray-600 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && parties.length === 0 && (
          <div className="bg-white rounded-2xl border-2 border-dashed border-gray-300 p-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gray-100 rounded-full">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Parties Found</h3>
            <p className="text-gray-500 mb-6">Get started by registering your first political party.</p>
            <button
              onClick={RegisterParty}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Register First Party
            </button>
          </div>
        )}

        {/* Party Cards Grid */}
        {!loading && !error && parties.length > 0 && (
          <>
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-700">
                All Parties ({parties.length})
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {parties.map((party) => (
                <PartyCard
                  key={party.id}
                  party={party}
                  onVerifyParty={onVerifyParty}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};