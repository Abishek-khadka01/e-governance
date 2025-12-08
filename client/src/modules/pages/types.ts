export interface User {
  id: string;
  username: string; // same as candidate_name
  phone_number: string;
  email: string;
  password_hash: string;
  user_type: string;
  is_verified: boolean;
  created_at: string;
  citizenship_no: string;
}

export interface Candidate {
  id: string;
  candidate_name: string; // same as users.username
  user_id: string;
  party_id: string;
  election_id: string;
  year: number;
  created_at: string;
  users: User;
}

export interface Party {
  id: string;
  party_name: string;
  abbreviation: string;
  leader_name: string;
  is_verified: boolean;
  created_at: string;
  registered_by: string | null;
  candidates: Candidate[];
}

export interface Election {
  id: string;
  election_name: string;
  election_type: string;
  year: number;
  start_date: string;
  end_date: string;
  created_at: string;
}

export interface CandidateWithRelations extends Candidate {
  parties: Party;
  elections: Election;
}

export interface ElectionCandidatesResponse {
  success: boolean;
  data: CandidateWithRelations[];
}
