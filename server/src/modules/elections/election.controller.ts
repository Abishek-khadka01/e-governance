import type { Request, Response } from "express";
import { Result } from "../../common/Response";
import type { ElectionCreateRequest, ElectionUpdateRequest } from "./election.types";
import { ElectionService } from "./election.service";
import type { elections } from "../../generated/prisma/client";
import { v4 } from "uuid";
import AppLogger from "../../utils/logger";

export class ElectionController {

  static async CreateElection(req: Request, res: Response) {
    try {
        
      const request: ElectionCreateRequest = req.body;
      AppLogger.info(`The create election route is running `)
      const numericYear = Number(request.year);

      if (isNaN(numericYear) || numericYear < 1900 || numericYear > 3000) {
        return Result.CreateError(
          new Error("Invalid election year"),
          "Year Out of Range"
        );
      }

      const start = new Date(request.startDate);
      const end = new Date(request.endDate);

      if (start >= end) {
        return Result.CreateError(
          new Error("End date must be greater than start date"),
          "Invalid Date Range"
        )(res);
      }


      const exists = await ElectionService.FindbyYearandType(
        request.election_type,
        request.year
      );

      if (exists) {
        return Result.CreateError(
          new Error("Election portal is already created"),
          "Election Exists"
        )(res);
      }

    
      const election = await ElectionService.Create({
          start_date : request.startDate,
        end_date : request.endDate,
        year : Number(request.year),
        election_name : request.election_name,
        id : v4(),
        election_type: request.election_type
      }
      );

      return Result.CreateSuccess<elections>(election)(res);
    } catch (error) {
      return Result.CreateError(error as Error, "Internal Server Error")(res);
    }
  }

    static async GetElections(req : Request , res: Response ) {
        try {
            const elections = await ElectionService.GetPresentElections();
            return Result.CreateSuccess(elections)(res);
                    

        } catch (error) {
            return Result.CreateError(error as Error, 'Internal Server Error')(res);
        }
    }

    static async UpdateDate(req : Request , res : Response) {

        try {
            const request  : ElectionUpdateRequest= req.body;

      const start = new Date(request.startDate);
      const end = new Date(request.endDate);

      if (start >= end) {
        return Result.CreateError(
          new Error("End date must be greater than start date"),
          "Invalid Date Range"
        );
      }

      await ElectionService.update(request.id , {
        start_date : request.startDate,
        end_date : request.endDate
      })
      return Result.CreateSuccess('Election Dates Updated Successfully')(res);
        } catch (error) {
            return Result.CreateError(error as Error, 'Internal Server Error')(res);
        }
    }

    static async GetAllElectionsYear (req : Request, res :Response) {
        try {
          
          const response = await ElectionService.GetAllElectionYear();

          if(!response){
            AppLogger.log(`NO elections has been created yet`);
            return Result.CreateError(new Error(`No elections exist`), 'No elections exist')(res);
          }

          return Result.CreateSuccess(response, 200)(res);
        } catch (error) {
          AppLogger.error(`Error in finding all the elections year`);
          return Result.CreateError(error as Error, 'Internal Server Error')(res);
        }
    }

}
