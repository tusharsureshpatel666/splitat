import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request){
  const {searchParams} = new URL(req.url)
  const id = searchParams.get("id")

    if(!id){
        return NextResponse.json("Missing id ")
    }
    const res = await prisma.communityStore.findUnique({
        where: {id:id},
        include:{
            images:true
        }
    
    })
    return NextResponse.json(res)
}