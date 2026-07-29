import { auth } from "@/lib/auth";

import { findUserById } from "@/lib/findUser";
import prisma from "@/lib/prisma";
import { uploadToCloudinary } from "@/lib/upload/Cloudinary";
import { truncate } from "fs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    // Store ID
    const { id } = await params;

    // Session
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 },
      );
    }

    // User
    const findUser = await findUserById(session.user.id || "");

    if (!findUser) {
      return NextResponse.json(
        {
          success: false,
          error: "User not found",
        },
        { status: 404 },
      );
    }

    // Body
    const body = await req.json();

    const { date, clip, selectedTime } = body;

    console.log("Request Body:", body);

    // Validation
    if (!date) {
      return NextResponse.json(
        {
          success: false,
          error: "Date is required",
        },
        { status: 400 },
      );
    }

    if (!selectedTime) {
      return NextResponse.json(
        {
          success: false,
          error: "Selected time is required",
        },
        { status: 400 },
      );
    }

    if (!clip) {
      return NextResponse.json(
        {
          success: false,
          error: "Image is required",
        },
        { status: 400 },
      );
    }

    // Upload image
    let uploadImage;

    try {
      uploadImage = await uploadToCloudinary(clip);

      console.log("Cloudinary Response:", uploadImage);
    } catch (err) {
      console.error("Cloudinary Upload Error:", err);

      return NextResponse.json(
        {
          success: false,
          error:
            err instanceof Error
              ? err.message
              : "Failed to upload image to Cloudinary",
        },
        { status: 500 },
      );
    }

    if (!uploadImage?.secure_url) {
      return NextResponse.json(
        {
          success: false,
          error: "Cloudinary returned no secure_url",
          uploadImage,
        },
        { status: 500 },
      );
    }

    // Save appointment
    const appointment = await prisma.appointment.create({
      data: {
        name: findUser.name || "",
        phoneNumber: findUser.phone || "",
        userId: findUser.id,

        storeId: id,

        Date: new Date(date),
        selectTime: selectedTime,

        UserPhoto: uploadImage.secure_url,
      },
    });

    //Notification

    const findOnwerbyStoreid = await prisma.store.findUnique({
      where: {
        id: appointment.storeId,
      },
      select: {
        ownerId: true,
      },
    });

    if (findOnwerbyStoreid) {
      const Notification = await prisma.appointmentNotif.create({
        data: {
          appoimentId: appointment.id,
          receiverId: findOnwerbyStoreid.ownerId,
          title: `${appointment.name} request appointment`,
          message: `${appointment.name} request appointment at Date ${appointment.Date}`,
          isRead: false,
        },
      });
      return NextResponse.json({
        success: true,
      });
    }

    console.log("Appointment Created:", appointment);

    return NextResponse.json(
      {
        success: true,
        message: "Appointment created successfully",
        data: appointment,
      },
      { status: 201 },
    );

    // Notification
  } catch (error) {
    console.error("Appointment API Error:");

    if (error instanceof Error) {
      console.error("Message:", error.message);
      console.error("Stack:", error.stack);
    } else {
      console.error(error);
    }

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown server error",
      },
      { status: 500 },
    );
  }
}
