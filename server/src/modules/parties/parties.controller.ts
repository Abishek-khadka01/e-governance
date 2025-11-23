import type { Request, Response } from 'express';
import { Result } from '../../common/Response';
import type { CreatePartyRequest } from './parties.types';
import { PartyService } from './parties.service';
import { uploadFromPath } from '../../utils/cloudinary';
import { v4 } from 'uuid';
import AppLogger from '../../utils/logger';

export class PartyController {
  static async CreateParty(req: Request, res: Response) {
    try {
      const request: CreatePartyRequest = req.body;

      const findbyPartyName = PartyService.findPartyByName(request.party_name);

      if (findbyPartyName != null) {
        return Result.CreateError(new Error('Party Already Exists'), 'Party already exist', 400);
      }

      const findbyAbbreviation = PartyService.findPartyByAbbreviation(request.abbreviation);

      if (findbyAbbreviation != null) {
        return Result.CreateError(new Error('Party Already Exists'), 'Party already exist', 400);
      }

      const file = req.file;
      if (!file) {
        return Result.CreateError(new Error('File was not recieved'), 'No file was recieved');
      }

      const uploadedUrl = uploadFromPath(file.path);

      await PartyService.createParty({
        party: {
          id: v4(),
          party_name: request.party_name,
          abbreviation: request.abbreviation,
          is_verified: false,
          leader_name: request.leader_name,
        },
        documentType: request.document_type,
        documenturl: (await uploadedUrl).url,
      });

      return Result.CreateSuccess<string>('Party Created Successfully');
    } catch (error) {
      return Result.CreateError(error as Error, 'Internal Server Error');
    }
  }

  static async GetAllParties (req : Request , res : Response )   {

    try {
      AppLogger.info(`Get All Parties Controller is running`);
      const parties =  await PartyService.getAll();

        console.table(parties)
      return Result.CreateSuccess(parties)(res)
      

    } catch (error) {
      return Result.CreateError(error as  Error , 'Internal Server Error')
    }

  }

  static async VerifyParty(req : Request , res : Response )  {
      // Admin task 
      try {
        const {id} = req.params;

        if(!id) {
          return Result.CreateError(new Error(`NO id was found`), 'No id was found')
        }

        await PartyService.update(id, {
          is_verified : true
        })

        return Result.CreateSuccess('Party Verified Successfully')
      } catch (error) {
      return Result.CreateError(error as Error, 'Internal Server Error')      
      }

  }

  static async deleteParty(req : Request , res : Response )  {
    // Admin Task 
    try {
      const {id} = req.params;

      if(!id) {
          return Result.CreateError(new Error(`NO id was found`), 'No id was found')
        }
        await PartyService.delete(id);

        return Result.CreateSuccess('Party Deleted Successfully');
        
    } catch (error) {
       return Result.CreateError(error as Error, 'Internal Server Error')      
    }

  }
}
