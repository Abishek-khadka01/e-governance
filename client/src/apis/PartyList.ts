import axios from 'axios'
import { PARTIES } from './endpoints'

export const GET_APP_PARTIES_API =async  () =>{
    try {
        const response =  await axios.get(`${import.meta.env.VITE_API_URL}${PARTIES}`, {
            withCredentials : true 
        })
        
        console.table(response.data.data)
        return response;

    } catch (error) {
        console.error(`Error in getting all the parties api  ${error}`)
    }

}