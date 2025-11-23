import axios  from "axios";
import { CANDIDATES } from "./endpoints";


 export const GET_CANDIDATES_OF_PARTY  = async (partyid : string )=>{

    const response = await axios.get(`${import.meta.env.VITE_API_URL}${CANDIDATES}/${partyid}`, {
        withCredentials :true
    })
    return response.data;
}

