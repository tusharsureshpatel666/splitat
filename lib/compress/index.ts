import imageCompression from "browser-image-compression";

export async function compressImage(base64: string) {
  const response = await fetch(base64);
  const blob = await response.blob();

  const compressed = await imageCompression(blob, {
    maxSizeMB: 0.3,
    maxWidthOrHeight: 1000,
    useWebWorker: true,
  });

  return compressed;
}