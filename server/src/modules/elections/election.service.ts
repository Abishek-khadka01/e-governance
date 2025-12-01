import {prisma} from '../../app'
import { Prisma, type elections } from '../../generated/prisma/client'
import type { ElectionEnum } from './election.types'

export class ElectionService {
  /*

        Create the election 
        get the candidates of the election 
        get the votes for the election 
        determine the starting and ending time of the election 
    */

        static async Create (election : Prisma.electionsCreateInput) : Promise<elections> {
          
          return await prisma.elections.create({
            data :{
              ...election
            }
          })
        }

        static async GetElectionsByYear() {
          return await prisma.elections.groupBy({
            by : 'year', 
          })
        }


        static async GetElectionById (id   : string ) : Promise<elections | null > {
          return await prisma.elections.findUnique({
            where :{
              id 
            }
          })
        }


        static async update (id : string, election : Partial<elections>) : Promise<elections> {
          return await prisma.elections.update({
            where :{
              id ,
            },data :{
              ...election
            }
          })
        }
        

        static async FindbyYearandType(electionType : ElectionEnum , year : string ) : Promise<elections| null> {
          return await prisma.elections.findFirst({
            where :{
              election_type : electionType,
              year : +year
            }
          })
        }

        static async GetPresentElections () : Promise<elections[] | null> {
          const date = new Date().getFullYear();
          return await  prisma.elections.findMany({
            where :{
              year : Number(date)
            }
          })
        }

        static async GetAllElectionYear() {
            return await prisma.elections.findMany({
              select:{
                year : true
              }
            })
        }
}



