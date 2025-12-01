export interface Parties {
  party_name: string;
  abbreviation: string;
  leader_name: string;
  is_verified: boolean;
  created_at: string; 
  id: string;
  registered_by?: string; 
  party_documents: string;
}

export interface ElectionType {
  id: string;
  election_name: string;
  election_type: string;
  year: number;
  start_date: string; // ISO date string
  end_date: string;   // ISO date string
  created_at: string; // ISO date string
}