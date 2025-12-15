import React, { useEffect, useState } from "react";
import ElectionList from "../components/election-component";
import type { ElectionType } from "../components/election-component";
import axios from 'axios'
import { ELECTIONS } from "../../apis/endpoints";

const ElectionPage= () => {
    
    const getElectionData = async  () =>{
        console.log(`Running the getElection data for the election page `);
            const response = await axios.get(`${import.meta.env.VITE_API_URL}${ELECTIONS}`, {
                withCredentials : true
            });
            
                console.table(response.data.data);

                setElections(response.data.data);
            
        }
    const [elections, setElections] = useState<ElectionType[]>([]);
    useEffect(()=>{
        getElectionData();
    },[])
  return <ElectionList elections={elections} />;
};

export default ElectionPage;
