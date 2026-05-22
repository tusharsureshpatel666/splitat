import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req: Request){
    const body =await req.json()
    const id = body.id
    try {
        const storeany = await prisma.store.findUnique({
            where:{id: id},
            select:{
                latitude:true,
                longitude:true,
                streetAddress:true,
                businessType:true,
                
            }
        })

        return NextResponse.json(storeany)
    } catch (error) {
        return NextResponse.error(error)
    }
}