import { prismaClient } from "@/app/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ExtractDatafromUrl } from "@/app/utils/ExtractDatafromUrl";
import { extractYouTubeId } from "@/app/utils/youtube";
import { ExtractDataFromToken } from "@/app/utils/ExtractDataFromToken";
// import { getServerSession } from "next-auth";

const CreateStreamSchema = z.object({
    url: z.string(),
});

const MAX_QUEUE_LEN = 20;

export async function POST(req: NextRequest) {
    try {
        const data = CreateStreamSchema.parse(await req.json());

        const userId = await ExtractDataFromToken(req);

        if (!userId) {
            return NextResponse.json({ error: "Please Login", status: 400 })
        }

        const YtID = await extractYouTubeId(data.url);

        if (!YtID) {
            return NextResponse.json({
                message: "Wrong URL format",
                status: 411
            }
            )
        }

        const { thumbnails, title } = await ExtractDatafromUrl(YtID);


        const existingActiveStream = await prismaClient.song.count({
            where: {
                userId: userId
            }
        })

        if (existingActiveStream > MAX_QUEUE_LEN) {
            return NextResponse.json({
                message: "Queue MAX-LIMIT exceeded "
            }, {
                status: 411
            })
        }

        const stream = await prismaClient.song.create({
            data: {
                userId: userId,
                url: data.url,
                extractedId: YtID,
                type: "Youtube",
                title: title ?? "",
                smallImg: (thumbnails.length > 1 ? thumbnails[thumbnails.length - 2].url : thumbnails[thumbnails.length - 1].url) ?? "",
                bigImg: thumbnails[thumbnails.length - 1].url ?? ""
            },
            include: {
                likes: true,
                dislikes: true
            }
        });

        return NextResponse.json({
            message: stream,
            status: 200
        })
    } catch (e) {
        console.log(e);
        return NextResponse.json({
            message: "Error while adding a stream"
        }, {
            status: 400
        })
    }

}

// export async function GET(req: NextRequest) {
//     const creatorId = req.nextUrl.searchParams.get("creatorId");
//     const session = await getServerSession();
//     // TODO: You can get rid of the db call here 
//     const user = await prismaClient.user.findFirst({
//         where: {
//             email: session?.user?.email ?? ""
//         }
//     });

//     if (!user) {
//         return NextResponse.json({
//             message: "Unauthenticated"
//         }, {
//             status: 403
//         })
//     }

//     if (!creatorId) {
//         return NextResponse.json({
//             message: "Error"
//         }, {
//             status: 411
//         })
//     }

//     const [streams, activeStream] = await Promise.all([await prismaClient.stream.findMany({
//         where: {
//             userId: creatorId,
//             played: false
//         },
//         include: {
//             _count: {
//                 select: {
//                     upvotes: true
//                 }
//             },
//             upvotes: {
//                 where: {
//                     userId: user.id
//                 }
//             }
//         }
//     }), prismaClient.currentStream.findFirst({
//         where: {
//             userId: creatorId
//         },
//         include: {
//             stream: true
//         }
//     })])

//     return NextResponse.json({
//         streams: streams.map(({ _count, ...rest }) => ({
//             ...rest,
//             upvotes: _count.upvotes,
//             haveUpvoted: rest.upvotes.length ? true : false
//         })),
//         activeStream
//     })
// }
