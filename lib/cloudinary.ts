import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function uploadToCloudinary(
  file: File,
  resourceType: "image" | "video" = "image",
) {
  if (!file) {
    throw new Error("File is null or undefined");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve, reject) => {
    const options: any = {
      resource_type: resourceType,
    };

    // 🔥 CRITICAL FIX FOR MOBILE VIDEOS (.mov / HEVC)
    if (resourceType === "video") {
      options.format = "mp4"; // force mp4
      options.video_codec = "h264"; // force h264
      options.quality = "auto"; // reduce size
      options.eager_async = true; // async processing (faster response)
    }

    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          reject(error);
        } else {
          resolve(result);
        }
      },
    );

    uploadStream.end(buffer);
  });
}
