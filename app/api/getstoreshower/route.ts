import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request){
   
    try {
        const res = await prisma.communityStore.findMany({
            select:{
                id: true,
                bannerImageUrl:true,
               priceInr:true,
               title:true,
                
            },
          
        })
        return NextResponse.json(res)

    } catch (error) {
        console.log(error)
    }
}