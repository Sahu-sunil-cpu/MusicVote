import { prismaClient } from "@/app/lib/db";
import { ExtractDataFromToken } from "@/app/utils/ExtractDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const dislikeSchema = z.object({
    songId: z.string(),
})

export async function POST(req: NextRequest) {

    try {

        const userId = await ExtractDataFromToken(req);

        console.log(userId)

        if (!userId) {
            return NextResponse.json({ error: "Authorization failed!", status: 400 })
        }

        const data = dislikeSchema.parse(await req.json());

        const result = await prismaClient.$transaction(async (tx) => {
            await tx.dislike.create({
                data: {
                    userId: userId,
                    songId: data.songId
                }
            })


            const exist = await tx.like.findUnique({
                where: {
                    userId_songId: {
                        userId: userId,
                        songId: data.songId
                    }
                }
            })

            if (exist) {
                console.log("yes")
                await tx.like.delete({
                    where: {
                        userId_songId: {
                            userId: userId,
                            songId: data.songId
                        }
                    }
                })
            }


            const song = await tx.song.findUnique({
                where: {
                    id: data.songId
                },
                include: {
                    likes: true,
                    dislikes: true,
                }
            })

            return song;


        })

        console.log(result)

        if (!result) {
            return NextResponse.json({ error: "some error happend!", status: 400 })
        }

        return NextResponse.json({
            message: {
                likes: result.likes,
                dislikes: result.dislikes
            },
            status: 200
        })
    } catch (e) {
        return NextResponse.json({
            message: "Error while doing dislike"
        }, {
            status: 403
        })
    }

}