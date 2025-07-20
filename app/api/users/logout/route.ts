import { ExtractDataFromToken } from "@/app/utils/ExtractDataFromToken";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.JWT_SECRET!;

export async function GET(req: NextRequest) {
    try {
       const userId = await ExtractDataFromToken(req);

//console.log(userId)

        if(!userId) {
            return NextResponse.json({error: "Authorization failed!", status: 400})
        }

       const response = NextResponse.json({
        success: true,
        message: "Logged Out successfully"
       })
       
       response.cookies.set("token", "", {
        httpOnly: true,
        expires: new Date(0)
       })

       return response;
        
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