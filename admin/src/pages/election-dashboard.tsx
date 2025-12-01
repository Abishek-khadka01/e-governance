import React, { useEffect, useState } from "react";
import axios from "axios";

export type ElectionEnum = "local" | "provincial" | "federal";

export type ElectionCreateRequest = {
  election_name: string;
  election_type: ElectionEnum;
  year: string;
  startDate: string;
  endDate: string;
};

const ElectionsPage: React.FC = () => {
  const [elections, setElections] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<ElectionCreateRequest>({
    election_name: "",
    election_type: "local",
    year: "",
    startDate: "",
    endDate: "",
  });

  /** -----------------------------
   * Fetch All Elections
   ------------------------------ */
  const fetchElections = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/elections`,
        { withCredentials: true }
      );

      // your response format:  { success: true, data: [...] }
      setElections(response.data.data);
    } catch (error) {
      console.error("Error fetching elections:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchElections();
  }, []);

  /** -----------------------------
   * Create Election Handler
   ------------------------------ */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/elections`,
        {
          election_name: form.election_name,
          election_type: form.election_type,
          year: Number(form.year),
          start_date: form.startDate,
          end_date: form.endDate,
        },
        { withCredentials: true }
      );

      alert("Election created!");

      // refresh elections
      fetchElections();

      // reset form
      setForm({
        election_name: "",
        election_type: "local",
        year: "",
        startDate: "",
        endDate: "",
      });
    } catch (error) {
      console.error("Error creating election:", error);
      alert("Failed to create election.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Election Management</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* ====================
            CREATE ELECTION FORM
        ==================== */}
        <div className="bg-white p-8 rounded-xl shadow-md border">
          <h2 className="text-2xl font-semibold mb-6">Create Election</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Election Name */}
            <div>
              <label className="block text-sm mb-1 font-medium">Election Name</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded-lg"
                value={form.election_name}
                onChange={(e) =>
                  setForm({ ...form, election_name: e.target.value })
                }
              />
            </div>

            {/* Election Type */}
            <div>
              <label className="block text-sm mb-1 font-medium">Election Type</label>
              <select
                className="w-full border px-3 py-2 rounded-lg"
                value={form.election_type}
                onChange={(e) =>
                  setForm({
                    ...form,
                    election_type: e.target.value as ElectionEnum,
                  })
                }
              >
                <option value="local">Local</option>
                <option value="provincial">Provincial</option>
                <option value="federal">Federal</option>
              </select>
            </div>

            {/* Election Year */}
            <div>
              <label className="block text-sm mb-1 font-medium">Election Year</label>
              <input
                type="number"
                className="w-full border px-3 py-2 rounded-lg"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
              />
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm mb-1 font-medium">Start Date</label>
              <input
                type="date"
                className="w-full border px-3 py-2 rounded-lg"
                value={form.startDate}
                onChange={(e) =>
                  setForm({ ...form, startDate: e.target.value })
                }
              />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm mb-1 font-medium">End Date</label>
              <input
                type="date"
                className="w-full border px-3 py-2 rounded-lg"
                value={form.endDate}
                onChange={(e) =>
                  setForm({ ...form, endDate: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Create Election
            </button>
          </form>
        </div>

        {/* ====================
            LIST ELECTIONS
        ==================== */}
        <div className="bg-white p-8 rounded-xl shadow-md border">
          <h2 className="text-2xl font-semibold mb-6">All Elections</h2>

          {loading ? (
            <p>Loading...</p>
          ) : elections.length === 0 ? (
            <p className="text-gray-500">No elections found.</p>
          ) : (
            <div className="space-y-4">
              {elections.map((election) => (
                <div
                  key={election.id}
                  className="p-4 border bg-gray-50 rounded-lg shadow-sm"
                >
                  <h3 className="text-lg font-bold">{election.election_name}</h3>
                  <p className="text-sm text-gray-700">
                    Type: {election.election_type}
                  </p>
                  <p className="text-sm text-gray-700">Year: {election.year}</p>

                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(election.start_date).toLocaleDateString()} →{" "}
                    {new Date(election.end_date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ElectionsPage;
