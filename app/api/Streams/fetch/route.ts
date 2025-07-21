import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

import { ExtractDataFromToken } from "@/app/utils/ExtractDataFromToken";




const secret = process.env.JWT_SECRET!;

export async function GET(req: NextRequest) {
    try {

        // const userId = await ExtractDataFromToken(req);

        // console.log(userId)

        // if(!userId) {
        //     return NextResponse.json({error: "Authorization failed!", status: 400})
        // }

        // const userExist = await prismaClient.user.findFirst({
        //     where:{
        //         id: userId,
        //     },

        //     include: {
        //         song: true
        //     }
        // })

        // if(!userExist) {
        //     return NextResponse.json({error: "Authorization failed! and Invalid Token", status: 400})
        // }
        

         const songs = await prismaClient.song.findMany({
            where:{
                played: false,
            },

            include:{
                dislikes: true,
                likes: true
            }

        })

      
        if(!songs) {
            return NextResponse.json({error: "failed to fetch songs", status: 400})
        }
          
        return NextResponse.json({message: songs})

          } catch (error) {
        console.log(error)
        return NextResponse.json(
            {
                error: error,
                status: 500
            }
        )
 
    }
}