import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});


export default cloudinary;

export async function uploadToCloudinary(base64: string) {
  try {
    const result = await cloudinary.uploader.upload(base64, {
      folder: "appointments",
      resource_type: "image",
      quality: "auto",
      fetch_format: "auto",
    });

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}