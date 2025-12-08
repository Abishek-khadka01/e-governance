// types.ts

export interface User {
  id: string;
  username: string;
  phone_number: string;
  email: string;
  password_hash: string;
  user_type: string;
  is_verified: boolean;
  created_at: string;
  citizenship_no: string;
}

export interface Party {
  id: string;
  party_name: string;
  abbreviation: string;
  leader_name: string;
  is_verified: boolean;
  created_at: string;
  registered_by: string | null;
}

export interface Candidate {
  id: string;
  candidate_name: string;
  year: number;
  created_at: string;
  user_id: string;
  party_id: string;
  election_id: string;
  users: User;
  parties: Party;
}

export interface ApiResponse {
  success: boolean;
  data: Candidate[];
}
