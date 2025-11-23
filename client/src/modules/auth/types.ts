export interface UserRegisterRequest {
  username: string;
  phone_number: string;
  email: string;
  password: string;
  citizenship_no: string;
  document_type: DocumentType;
  documents: File[]; // <-- added
}

export enum DocumentType {
  CITIZENSHIP = "CITIZENSHIP",
  NATIONAL_ID = "NATIONAL_ID",
  PASSPORT = "PASSPORT",
}


export interface UserLoginRequest {
  email: string;
  password: string;
}



export type UserLoginResponse = {
    created_at: Date | null;
    id: string;
    username: string;
    phone_number: string;
    email: string | null;
    password_hash: string;
    user_type: "voter"|"admin" | null;
    is_verified: boolean | null;
    citizenship_no: string | null;
}