import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

type ResourceType = "image" | "video";

export async function uploadToCloudinary(
  file: File,
  resourceType: ResourceType = "image",
): Promise<UploadApiResponse> {
  if (!(file instanceof File)) {
    throw new Error("Invalid file");
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const options: any = {
    resource_type: resourceType,
    folder: "stores", // 👈 optional but recommended
    use_filename: true,
    unique_filename: true,
  };

  /* ---------------- IMAGE OPTIMIZATION ---------------- */
  if (resourceType === "image") {
    options.format = "webp"; // auto convert
    options.quality = "auto";
    options.fetch_format = "auto";
  }

  /* ---------------- VIDEO OPTIMIZATION ---------------- */
  if (resourceType === "video") {
    options.format = "mp4";
    options.video_codec = "h264";
    options.quality = "auto";
    options.eager_async = true;
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error || !result) {
          console.error("Cloudinary upload error:", error);
          reject(error ?? new Error("Upload failed"));
        } else {
          resolve(result);
        }
      },
    );

    uploadStream.end(buffer);
  });
}
