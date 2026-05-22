import prisma from "@/lib/prisma";


export async function GET(req) {
     
    const res  = await prisma.store.findUnique({
        where: {
            id: id
        }
    })
}