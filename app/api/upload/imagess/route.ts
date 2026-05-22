import { uploadToCloudinary } from "@/lib/counter";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const banner = formData.get("banner");
    if (!(banner instanceof File)) {
      return NextResponse.json({ error: "Banner missing" }, { status: 400 });
    }

    const images: File[] = [];
    for (let i = 0; i < 4; i++) {
      const img = formData.get(`image_${i}`);
      if (img instanceof File) images.push(img);
    }

    if (images.length !== 4) {
      return NextResponse.json(
        { error: "Exactly 4 images required" },
        { status: 400 },
      );
    }

    const [bannerUpload, ...imageUploads] = await Promise.all([
      uploadToCloudinary(banner, "image"),
      ...images.map((img) => uploadToCloudinary(img, "image")),
    ]);

    return NextResponse.json({
      bannerUrl: bannerUpload.secure_url,
      imageUrls: imageUploads.map((u) => u.secure_url),
    });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
