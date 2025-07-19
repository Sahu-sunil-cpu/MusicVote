import { NextRequest, NextResponse } from "next/server";

const secret = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        

       return  NextResponse.json({
        success: true,
        message: "Logged Out successfully"
       })
       .cookies.set("token", "", {
        httpOnly: true,
        expires: new Date(0)
       })
        
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