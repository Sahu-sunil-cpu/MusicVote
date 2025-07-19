import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
//import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import { sendEmail } from "@/app/utils/mailer";


const UserSchema = z.object({
    email: z.email(),
    password: z.string().min(8)
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


        if (data.password != userExist.password) {
            return NextResponse.json({ error: "credentials validation failed!", status: 400 });
        }



        if (!userExist.isVerified) {
            //send email
            const email = data.email
            const mailType = "VERIFY_USER"
            await sendEmail(email, mailType, userExist.id)

            return NextResponse.json({
                error: "email is not verified",
                status: 400
            })

        }



        //TODO: check password of user
        //  const validPassword = bcryptjs.compare(data.password, userExist.password);


        //   if(!validPassword) {
        //     return NextResponse.json({error: "credentials validation failed!", status: 400})
        //   }



        const tokenData = {
            id: userExist.id
        }

        const token = jwt.sign(tokenData, secret, { expiresIn: '1d' });

        const response = NextResponse.json({
            success: true,
            message: "Logged In successfully"
        })

        response.cookies.set("token", token, {
            httpOnly: true
        })

        console.log("yes")

        return response

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