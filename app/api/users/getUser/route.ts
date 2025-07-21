import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";

import { ExtractDataFromToken } from "@/app/utils/ExtractDataFromToken";




const secret = process.env.JWT_SECRET!;

export async function GET(req: NextRequest) {
    try {

        const userId = await ExtractDataFromToken(req);

        if(!userId) {
            return NextResponse.json({error: "Authorization failed!", status: 400})
        }

        const userExist = await prismaClient.user.findFirst({
            where:{
                id: userId,
            },

        })

        if(!userExist) {
            return NextResponse.json({error: "Authorization failed! and Invalid Token", status: 400})
        }
      
        return NextResponse.json({username: userExist.username, email: userExist.email, status: 200})

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