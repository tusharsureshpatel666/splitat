import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req:Request , {params}: {params: {conversationId: string}}){
    const paramsId = await params;
    const session = await auth()
    const userId = session?.user?.id

    if(!userId){
        return NextResponse.json({error: "Unauthorized"}, {status: 401})
    }

    const agreement = await prisma.conversation.findUnique({
        where: {id: paramsId.conversationId},
        include:{
            buyer:{
                select:{
                    id:true,
                    name: true,
                },
            },
            store:{
                select:{
                    id:true,
                    title: true,
                    flatno:true,
                    streetAddress:true,
                    NearbyLandMark:true,
                    areaLocality: true,
                    businessType: true,
                    country:true,
                    state:true,
                    city:true,
                    pin: true,
                    priceInr:true,
                    shareMode: true,
                    startTime:true,
                    endTime:true,
                    days:true,
                    sqft:true,
                    dayOrNight:true,
                    ownerId:true,
                    owner:{
                        select:{
                            id:true,
                            name:true
                        }
                    }


                    
                }
            }
        }
    })
    return NextResponse.json(agreement)
}