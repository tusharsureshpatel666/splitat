import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();

    const imageFiles: File[] = [];
    for (let i = 0; i < 4; i++) {
      const img = formData.get(`image_${i}`);
      if (img instanceof File && img.size > 0) {
        imageFiles.push(img);
      }
    }

    if (imageFiles.length !== 4) {
      return NextResponse.json(
        { error: "Exactly 4 images required" },
        { status: 400 },
      );
    }

    // ⚡ Parallel Cloudinary upload
    const uploads = await Promise.all(
      imageFiles.map((file) => uploadToCloudinary(file, "image")),
    );

    return NextResponse.json({
      images: uploads.map((u, i) => ({
        url: u.secure_url,
        order: i,
      })),
    });
  } catch (error) {
    console.error("Image upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
