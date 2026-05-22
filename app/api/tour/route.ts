
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server"

export async function POST(req: Request){
    const body = await req.json()
    const session = await auth()
   
    const res = await prisma.tour.create({
        data:{
            storeId: body.id,
            userId: session?.user?.id || "",
            fullname: body.name,
            email: body.email,
            phone: body.phone,
            message: body.message,
        }
    })

     const store = await prisma.store.findUnique({
       where: { id: body.id },
       include: { owner: true }, 
     });

        const transporter = nodemailer.createTransport({
           service: "gmail",
           auth: {
             user: process.env.GMAIL_USER,
             pass: process.env.GMAIL_PASS, // Use App Password (not real password)
           },
         });


       if (store?.owner?.email) {
    await transporter.sendMail({
      from: `"Your App" ${session?.user?.email}`,
      to: process.env.GMAIL_USER,
      subject: "New Booking Request",
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        <p><strong>Store Id:</strong> ${body.id}</p>

        <p><strong>Message:</strong> ${body.message}</p>

      `,
    });
  }

     if(store?.owner.id){
        await prisma.tourNotification.create({
          data: {
            userId: store.owner.id,
            userImage: session?.user?.image,
            message: `New booking request from ${body.name}`,
          },
        });
     }


    return NextResponse.json(res); 
}