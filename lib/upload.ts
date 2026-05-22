import axios from "axios";

type UploadMediaArgs = {
  banner: File;
  images: File[]; // length = 4
};

export const uploadMedia = async ({ banner, images }: UploadMediaArgs) => {
  const formData = new FormData();

  formData.append("banner", banner);

  images.forEach((img, index) => {
    formData.append(`image_${index}`, img);
  });

  const res = await axios.post("/api/upload/imagess", formData);
  return res.data as {
    bannerUrl: string;
    imageUrls: string[];
  };
};
