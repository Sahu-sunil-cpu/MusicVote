import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const DataSchema = z.object({
    token: z.string(),
})

export async function POST(req: NextRequest) {

    try {
     //   console.log(await req.json())
        const data = DataSchema.parse(await req.json())

        const userExist = await prismaClient.user.findFirst({
            where: {
                verifyToken: data.token,
            }
        })

        const date = new Date();


        if (!userExist) {

            return NextResponse.json({
                error: "Invalid Token, try signing up again",
                status: 400
            })
        }
console.log(userExist?.verifyTokenExpiry!)
console.log(date)


        if(!(userExist?.verifyTokenExpiry! > date)) {
            return NextResponse.json({
                error: "gmail verification time has expired",
                status: 400
            })
        }


         await prismaClient.user.update({
            where: {
                id: userExist.id
            },

            data: {
                verifyToken: "",
                verifyTokenExpiry: null,
                isVerified: true
            }
        })

        return NextResponse.json({
            success: true,
            message: "your email is verified successfuly",
            status: 200
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