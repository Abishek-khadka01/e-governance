export enum ElectionEnum  {

federal = 'federal',
    provincial = 'provincial',
    local = 'local',
     byElection = 'by-election',
    internalParty = 'internal-party'
}



export type ElectionCreateRequest  = {
        election_name : string ,
        election_type : ElectionEnum, 
        year : string 
        startDate : Date,
        endDate : Date
}

export type ElectionUpdateRequest = {
    id : string 
     startDate : Date,
        endDate : Date
}