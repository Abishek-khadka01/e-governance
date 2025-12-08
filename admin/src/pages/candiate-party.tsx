import React, { useEffect, useState } from "react";
import CandidateDetails from "../components/candidates-party-component";
import { useParams } from "react-router-dom";
import axios from 'axios'
import { CANIDATES } from "../api/constants";
function CandidateByParty() {
  const [data, setData] = useState([]);
        const {party_id } = useParams(); 

    const fetchUsersByParty = async (id : string )=> {

        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}${CANIDATES}/${id}`, {
                withCredentials : true
            });

            const responseData = response.data.data;

            setData(responseData)
        } catch (error) {
            console.error(`Error in fetching the users by party`);
        }

    } 
  useEffect(() => {
    if(!party_id){
        alert(`Improper urlq`)
    }
    fetchUsersByParty(party_id as string )
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <CandidateDetails data={data} />
    </div>
  );
}

export default CandidateByParty;
