import axios from "axios";
import type { UserRegisterRequest } from "../modules/auth/types";
import { REGISTER } from "./endpoints";
export const REGISTER_USER_API = async (request: UserRegisterRequest) => {

  const form = new FormData();

  // append primitive fields manually
  form.append("username", request.username);
  form.append("phone_number", request.phone_number);
  form.append("email", request.email);
  form.append("password", request.password);
  form.append("citizenship_no", request.citizenship_no);
  form.append("document_type", request.document_type.toString());

  // append files
  request.documents.forEach(file => {
    form.append("verification", file);
  });

    console.table(form)
  const res = await axios.post(`${import.meta.env.VITE_API_URL}${REGISTER}`, form,
  {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};
