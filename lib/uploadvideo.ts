export async function uploadVideoToCloudinary(
  file: File,
  onProgress?: (p: number) => void,
): Promise<{ secure_url: string }> {
  // 1️⃣ Get signature from backend
  const sigRes = await fetch("/api/uploadvideo", { method: "POST" });
  if (!sigRes.ok) throw new Error("Signature request failed");
  const sig = await sigRes.json();

  // 2️⃣ Prepare FormData for Cloudinary
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", sig.apiKey);
  formData.append("timestamp", sig.timestamp.toString());
  formData.append("signature", sig.signature);
  formData.append("resource_type", "video"); // IMPORTANT
  // Do not include upload_preset for signed uploads

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        console.error("Cloudinary upload error:", xhr.responseText);
        reject(new Error("Upload failed"));
      }
    };

    xhr.onerror = () => reject(new Error("Network error"));

    xhr.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${sig.cloudName}/video/upload`,
    );
    xhr.send(formData);
  });
}
