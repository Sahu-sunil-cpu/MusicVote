import { prismaClient } from "@/app/lib/db";
import { ExtractDataFromToken } from "@/app/utils/ExtractDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";


const songPlayedSchema = z.object({
    songId: z.string(),
})




export async function POST(req: NextRequest) {

    try {
        const userId = await ExtractDataFromToken(req);

        console.log(userId)

        if (!userId) {
            return NextResponse.json({ error: "Authorization failed!", status: 400 })
        }


        const data = songPlayedSchema.parse(await req.json());

        console.log(data.songId)


        const result = await prismaClient.song.update({
            where: {
                id: data.songId
            },
            data: {
                played: true,
            }
        })

        if (!result) {
            return NextResponse.json({ error: "song not found", success: false });
        }

        return NextResponse.json({ error: "song found", success: true });


    } catch (error: any) {
    // console.log(error)
        throw new Error(error)
    }


}