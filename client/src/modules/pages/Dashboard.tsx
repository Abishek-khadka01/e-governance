import { useEffect, useState } from "react";
import { useUserStore } from "../../stores/userStore";
import { useNavigate } from "react-router-dom";
import type { ElectionType, Parties } from "../components/types";
import axios from 'axios'
import { ELECTIONS, PARTIES } from "../../apis/endpoints";
export default function Dashboard() {
  const user = useUserStore((state) => state.user);
  console.log(user);

  // Show form
  const [showForm, setShowForm] = useState(false);
  const [parties , setParties] = useState<Parties[]>([])
  const [elections, setElections] = useState<ElectionType[]>([]);
  const getParties = async ()=>{
    const response = await axios.get(`${import.meta.env.VITE_API_URL}${PARTIES}`, {
      withCredentials: true
    })

    setParties(response.data.data);
  };

  const getElections= async ()=>{
      const response = await axios.get(`${import.meta.env.VITE_API_URL}${ELECTIONS}`, {
        withCredentials : true
      })

      setElections(response.data.data)
  }


  useEffect(()=>{
    getElections();
    getParties();
  },[])
  
  
  const navigate = useNavigate();
  // Form Data
  const [formData, setFormData] = useState({
    candidate_name: "",
    party_id: "",
    election_id: "",
  });

  // Handle input change
  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Submit
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const payload = {
      ...formData,
      user_id: user ? user.id : null, // works even when no user
    };

    try {
      const res = await fetch("http://localhost:3000/candidate/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      alert(data.message || "Candidate Registered Successfully!");
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert("Failed to register candidate.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">

        {/* Header */}
        <h1 className="text-3xl font-bold text-blue-700 mb-6">User Dashboard</h1>

        {/* Profile Section */}
        <div className="border rounded-lg p-5 bg-gray-50 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-black" >Profile Information</h2>

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
              
              {/* Candidate Name */}
              <div  hidden= {true}className="space-y-1">
                <label className="block text-gray-700 font-medium">Candidate Name</label>
                <input
                  type="text"
                  name="candidate_name"
                  className="w-full p-2 border rounded"
                  value={user?.username}
                  required
                />
              </div>

              {/* Party ID */}
              <div className="space-y-1">
                <label className="block text-gray-700 font-medium">Party ID</label>
                <input
                  type="text"
                  name="party_id"
                  className="w-full p-2 border rounded"
                  value={formData.party_id} // use the parties to list all the parties along with thier parties 
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Election ID */}
              <div className="space-y-1">
                <label className="block text-gray-700 font-medium">Election ID</label>
                <input
                  type="text"
                  name="election_id"
                  className="w-full p-2 border rounded"
                  value={formData.election_id} // similar for elections
                  onChange={handleChange}
                  required
                />
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

          <button className="bg-blue-700 hover:bg-blue-800 text-white py-2 px-5 rounded-lg font-semibold transition"
            onClick={()=>{
             if(!user?.is_verified){
              alert(`The user is not verified so you cannot proceed furthur`)
             }else {
              navigate(`/elections`)
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
