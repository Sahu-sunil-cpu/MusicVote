import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
//import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { sendEmail } from "@/app/utils/mailer";


const UserSchema = z.object({
    email: z.email(),
})

const secret = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { data, success } = UserSchema.safeParse(reqBody);

        if (!success) {
            return NextResponse.json({ error: "Input validation failed, fill boxes correctly", status: 400 })
        }


        console.log(data)
        const userExist = await prismaClient.user.findFirst({
            where: {
                email: data.email,
            }
        })

        if (!userExist) {
            return NextResponse.json({ error: "user does not exist, try sign up", status: 400 })
        }



        if (!userExist.isVerified) {
            return NextResponse.json({
                error: "email is not verified",
                status: 400
            })

        }


        return NextResponse.json({
            success: "email is verified",
            status: 400
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