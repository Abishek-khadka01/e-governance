import { randomUUID } from 'crypto';
import { prisma } from '../../app';
import type { parties } from '../../generated/prisma/client';
import { Prisma } from '../../generated/prisma/client';
import type { PartyDocumentCreateInterface } from './parties.types';
export class PartyService {
  /*

     Create the party 
     get all the parties
     remove the party 
     approve the party  with the proper document 
     
     */

  static async findPartyById(id: string): Promise<parties | null> {
    return prisma.parties.findUnique({
      where: {
        id,
      },
      include: {
        party_documents: {
          include: {
            party_document_urls: true,
          },
        },
      },
    });
  }

  static async createParty(party: PartyDocumentCreateInterface): Promise<void> {
    const newParty = await prisma.parties.create({
      data: {
        ...party.party,
      },
    });

    const partyDocuments = await prisma.party_documents.create({
      data: {
        party_id: newParty.id,
        document_type: party.documentType,
        status: 'pending',
        id: randomUUID(),
      },
    });

    const partyUrls = await prisma.party_document_urls.create({
      data: {
        party_document_id: partyDocuments.id,
        url: party.documenturl,
        id: randomUUID(),
      },
    });
  }

  static async update(id: string, partyDetails: Partial<parties>): Promise<void> {
    await prisma.parties.update({
      where: {
        id,
      },
      data: {
        ...partyDetails,
      },
    });
  }

  static async delete(id: string): Promise<void> {
    await prisma.parties.delete({
      where: {
        id,
      },
    });
  }

  static async getAll(): Promise<parties[] | null> {
    return await prisma.parties.findMany({
      include: {
        party_documents: {
          include: {
            party_document_urls: true,
          },
        },
      },
    });
  }

  static async findPartyByName(name: string): Promise<parties[] | null> {
    return prisma.parties.findMany({
      where: {
        party_name: name,
      },
      include: {
        party_documents: {
          include: {
            party_document_urls: true,
          },
        },
      },
    });
  }

  static async findPartyByAbbreviation(name: string): Promise<parties[] | null> {
    return prisma.parties.findMany({
      where: {
        abbreviation: name,
      },
      include: {
        party_documents: {
          include: {
            party_document_urls: true,
          },
        },
      },
    });
  }
}
