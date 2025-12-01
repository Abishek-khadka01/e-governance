import type { AuthService } from "../auth/auth.service";
import type { ElectionService } from "../elections/election.service";
import {prisma} from '../../app'
import type { candidates } from "../../generated/prisma/client";
import { Prisma } from "../../generated/prisma/client";
export class CandidateService {

    /*  
    
        Register Candiate on all parties
        Get all the candiats 
        get the candidates based on the party  
        
    */

          static async FindCandidateByYear (year : string) {
            return await prisma.candidates.findMany({
              where :{
                year : parseInt(year)
              }, 
              include :{
                users : true,
                elections : true,
                parties : true
              }
            })
          }
    static async FindCandidates() : Promise<candidates[] | null> {
        return await prisma.candidates.findMany({
          include :{
            users  : {
              select :{
                password_hash : false
              }
            },
            parties : true
          }
        })
    }    

    static async FindCandidateById (id : string, year : number ) : Promise<candidates| null> {
     return await prisma.candidates.findFirst({
      where :{
        user_id : id ,
        year 
      },
          include :{
            users  : {
              select :{
                password_hash : false
              }
            },
            parties : true
          }
        })
    } 

      static async FindCandidatesByElection () {
        return await prisma.candidates.groupBy({
          by :'election_id',
          _count :{
            _all : true
          }
        })
      }

      static async DeleteCandidate (id : string ) : Promise<void> {
        await prisma.candidates.delete({
          where : {
            id 
          }
        })
      }

      static async FindCandidateByParty(party : string)  {
            return await prisma.candidates.findMany( {
              where :{
                party_id : party
              }, include :{
                users : true, 
                parties : true
              }, 
            })
      }


      static async CreateCandiate (candiate : Prisma.candidatesUncheckedCreateInput) {
        return await prisma.candidates.create({
          data :{
            ...candiate
          }
        })
      }
}
