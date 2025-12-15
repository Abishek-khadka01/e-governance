import { useEffect, useState } from "react";
import { useUserStore } from "../../stores/userStore";
import { useNavigate } from "react-router-dom";
import type { ElectionType, Parties} from "../components/types";
import axios from "axios";
import { ELECTIONS, PARTIES } from "../../apis/endpoints";

export default function Dashboard() {
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [parties, setParties] = useState<Parties[]>([]);
  const [elections, setElections] = useState<ElectionType[]>([]);

  const [formData, setFormData] = useState({
    candidate_name: user?.username || "",
    party_id: "",
    election_id: "",
  });

  // Fetch Parties
  const getParties = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}${PARTIES}`, {
      withCredentials: true,
    });
    setParties(response.data.data);
  };

  // Fetch Elections
  const getElections = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}${ELECTIONS}`, {
      withCredentials: true,
    });
    console.table(response.data.data)
    setElections(response.data.data);
  };

  useEffect(() => {
    getParties();
    getElections();
  }, []);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      user_id: user ? user.id : null,
    };

    try {
      const res = await axios.post("http://localhost:3000/candidates/register", {
          ...payload
        
      }, {
        withCredentials : true
      } );

      const data = res.data.data;
      alert(data.message || "Candidate Registered Successfully!");
      setShowForm(false);
      setFormData({ candidate_name: user?.username || "", party_id: "", election_id: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to register candidate.");
    }
  };

  // Filter ongoing elections
  const today = new Date();
  const ongoingElections = elections.filter((election) => {
    const startDate = new Date(election.start_date);
    const endDate = new Date(election.end_date);
    return today >= startDate && today <= endDate;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">

        {/* Header */}
        <h1 className="text-3xl font-bold text-blue-700 mb-6">User Dashboard</h1>

        {/* Profile Section */}
        <div className="border rounded-lg p-5 bg-gray-50 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-black">Profile Information</h2>

          {user ? (
            <div className="space-y-3 text-black">
              <p><span className="font-semibold">Username:</span> {user.username}</p>
              <p><span className="font-semibold">Phone:</span> {user.phone_number}</p>
              <p><span className="font-semibold">Citizenship No:</span> {user.citizenship_no || "N/A"}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-semibold">Verification:</span>
                {user.is_verified ? (
                  <span className="text-green-600 font-semibold">✔ Verified</span>
                ) : (
                  <span className="text-red-600 font-semibold">✖ Unverified</span>
                )}
              </div>
            </div>
          ) : (
            <p className="text-gray-600">No user logged in (Guest Mode)</p>
          )}
        </div>

        {/* Register as Candidate Button */}
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-5 rounded-lg font-semibold transition mb-6"
          onClick={() => setShowForm(!showForm)}
        >
          Register as Candidate
        </button>

        {/* Candidate Registration Form */}
        {showForm && (
          <div className="border rounded-lg p-5 bg-gray-50 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Candidate Registration Form
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
              
              {/* Candidate Name (hidden input) */}
              <input
                type="hidden"
                name="candidate_name"
                value={user?.username || ""}
              />

              {/* Party Selection */}
              <div className="space-y-1">
                <label className="block text-gray-700 font-medium">Select Party</label>
                <select
                  name="party_id"
                  className="w-full p-2 border rounded"
                  value={formData.party_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select a Party --</option>
                  {parties.map((party) => (
                    <option key={party.id} value={party.id}>
                      {party.party_name} ({party.abbreviation})
                    </option>
                  ))}
                </select>
              </div>

              {/* Election Selection */}
              <div className="space-y-1">
                <label className="block text-gray-700 font-medium">Select Election</label>
                <select
                  name="election_id"
                  className="w-full p-2 border rounded"
                  value={formData.election_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select an Ongoing Election --</option>
                  {ongoingElections.map((election) => (
                    <option key={election.id} value={election.id}>
                      {election.election_name} ({election.year})
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-5 rounded-lg font-semibold transition"
              >
                Submit
              </button>
            </form>
          </div>
        )}

        {/* Upcoming Election Section */}
        <div className="border rounded-lg p-5 bg-gray-50">
          <h2 className="text-xl font-semibold mb-3 text-gray-700">Upcoming Election</h2>

          <p className="text-gray-600 mb-4">Next major national election is scheduled soon.</p>

          <button
            className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-5 rounded-lg font-semibold transition"
            onClick={() => {
              if (!user?.is_verified) {
                alert(`The user is not verified so you cannot proceed further`);
              } else {
                navigate(`/elections`);
              }
            }}
          >
            View
          </button>
        </div>

      </div>
    </div>
  );
}
