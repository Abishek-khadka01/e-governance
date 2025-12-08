export interface Election {
  id: string;
  election_name: string;
  election_type: string;
  year: number;
  start_date: string;   // ISO date string
  end_date: string;     // ISO date string
  created_at: string;   // ISO date string
}

export interface Party {
  id: string;
  party_name: string;
  abbreviation: string;
  leader_name: string;
  is_verified: boolean;
  created_at: string;          // ISO date string
  registered_by: string | null;

}