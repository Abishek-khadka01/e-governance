import type { UserLoginRequest } from "../modules/auth/types";
import { LOGIN } from "./endpoints";
import axios from "axios";

export const LOGIN_USER_API = async (request : UserLoginRequest)=> {

    const response =  await axios.post(`${import.meta.env.VITE_API_URL}${LOGIN}`, request, {
        withCredentials :true
    });
        return response.data;
}