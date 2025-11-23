import type { Prisma } from '../../generated/prisma/client';

export interface CreatePartyRequest {
  party_name: string;
  abbreviation: string;
  leader_name: string;
  document_type: string;
}

export interface CreatePartyResponse {
  message: string;
}

export interface PartyDocumentCreateInterface {
  party: Prisma.partiesCreateInput;
  documenturl: string;
  documentType: string;
}
