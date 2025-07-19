import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { sendEmail } from "@/app/utils/mailer";
//import { genSalt, hash } from "bcryptjs";

const UserSchema = z.object({
    username: z.string().min(6).max(12),
    email: z.email(),
    password: z.string().min(8)
})

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { data, success } = UserSchema.safeParse(reqBody);

        if (!success) {
            return NextResponse.json({ error: "Input validation failed, fill boxes correctly", status: 400 })
        }

        const userExist = await prismaClient.user.findFirst({
            where: {
                username: data.username,
                email: data.email,
            }
        })

        if (userExist) {
            return NextResponse.json({ message: "user already exist in database" })
        }

        //   const salt = await genSalt(10);
        //  const hashPassword = await hash(data.password, salt);

        const savedUser = await prismaClient.user.create({
            data: {
                username: data.username,
                email: data.email,
                password: data.password,
                walletAddress: "dbsjbfkdddjsbfkjsbcbsbcs",
                authType: "google",
                joinedAt: new Date(new Date().setHours(0, 0, 0, 0)),
                isVerified: false,
            }
        })

      //  console.log(savedUser);

        //send email
        const email = data.email
        const mailType = "VERIFY_USER"
        console.log(savedUser)
        await sendEmail(email, mailType, savedUser.id)



        return NextResponse.json({ message: "user registered successfully" })
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