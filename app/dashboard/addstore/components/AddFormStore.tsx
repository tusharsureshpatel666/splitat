"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Heading from "../../components/heading";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useParticStore, useStoreStep } from "@/store/store";
import StepIntro from "./form-steps/StepIntro";
import StepTitle from "./form-steps/StepTitle";
import FormNavigation from "./form-steps/Navitgate";
import StepTypeStore from "./form-steps/StepTypeStore";
import LocationPicker from "./form-steps/stepMap";

import StepImage from "./form-steps/StepImage";
import StepPartic from "./form-steps/StepPartic";
import StoreMethodtype from "./form-steps/StoreMethodtype";
import PriceInput from "./form-steps/stepprice";
import StepDesc from "./form-steps/StepDesc";
import PeopleDesc from "./form-steps/PeopleDesc";
import toast from "react-hot-toast";
import imageCompression from "browser-image-compression";
import TrueVideo from "./form-steps/trueVideo";
import PhoneVerify from "@/app/components/PhoneVerify";

const AddFormStore = () => {
  const router = useRouter();
  const { sStep, setSStep, nextSStep, prevStep, resetStep } = useStoreStep();
  const { share } = useParticStore();

  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  // form fields
  const [title, setTitle] = useState("");
  const [storeType, setStoreType] = useState("");
  const [country, setCountry] = useState("IN");
  const [flat, setFlat] = useState("");
  const [street, setStreet] = useState("");
  const [nearby, setNearby] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [state, Sstate] = useState("");
  const [address, setAddress] = useState("")

  const [pin, setPin] = useState("");

  const [desc, setDesc] = useState("");
  const [peopleDesc, setPeopleDesc] = useState("");
  const [bussinessType, setBussinessType] = useState("");
  const [price, setPrice] = useState("2000");

  // images
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [otherImages, setOtherImages] = useState<(File | null)[]>([
    null,
    null,
    null,
    null,
  ]);

  useEffect(() => {
    resetStep();
  }, [resetStep]);

  /* ---------------- STEP VALIDATION ---------------- */

  const isStepValid =
    (sStep === 1 && title.trim() !== "") ||
    (sStep === 2 && storeType.trim() !== "") ||
    (sStep === 3 &&
       address !=="") ||
    (sStep === 4 &&
      bannerImage !== null &&
      otherImages.filter(Boolean).length === 4) ||
    (sStep === 5 && share.mode !== "") ||
    (sStep === 6 &&
      ((share.mode === "HOURS_BY_HOURS" && share.startTime && share.endTime) ||
        (share.mode === "DAYS_BY_DAYS" &&
          Array.isArray(share.days) &&
          share.days.length > 0) ||
        (share.mode === "SPLIT_STORE" && share.sqft > 0) ||
        (share.mode === "DAY_OR_NIGHT" &&
          (share.dayOrNight === "Day" || share.dayOrNight === "Night")) ||
        share.mode === "Weekend" ||
        share.mode === "Regular")) ||
    (sStep === 7 && Number(price) > 0) ||
    (sStep === 8 && bussinessType !== "") ||
    (sStep === 9 && desc !== "") ||
    (sStep === 10 && peopleDesc !== "") ||
    sStep > 11;

  const handleNext = () => {
    if (!isStepValid) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }
    nextSStep();
  };

  /* ---------------- IMAGE UPLOAD ---------------- */

  const uploadMedia = async () => {
    if (!bannerImage) throw new Error("Banner missing");
    const images = otherImages.filter(Boolean) as File[];
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };

    const formData = new FormData();

    // Compress and append banner
    const compBanner = await imageCompression(bannerImage, options);
    formData.append("banner", compBanner);

    // Compress and append others
    for (const [index, img] of images.entries()) {
      const compImg = await imageCompression(img, options);
      formData.append(`image_${index}`, compImg);
    }

    const res = await axios.post("/api/upload/imagess", formData);
    return res.data;
  };

  /* ---------------- FINAL SUBMIT ---------------- */

  const handleFinish = async () => {
    try {
      setLoading(true);

      const toastId = toast.loading("Uploading images...");
      const { bannerUrl, imageUrls } = await uploadMedia();
      toast.dismiss(toastId);
      toast.success("Images uploaded");

      const payload = {
        title,
        storeSize: storeType,
        country,
        flat,
        street,
        nearby,
        district,
        city,
        state,
        address,


        pin,

        desc,
        priceInr: Number(price),
        businessType: bussinessType,
        peopleDesc,
        bannerImageUrl: bannerUrl,
        images: imageUrls,
        share: {
          mode: share.mode,
          startTime: share.startTime ?? null,
          endTime: share.endTime ?? null,
          days: share.days ?? [],
          sqft: share.sqft ?? null,
          dayOrNight: share.dayOrNight ?? null,
        },
      };

      const res = await axios.post("/api/store/create", payload);

      toast.success("Store Created 🎉");
      router.push(`/dashboard/store/${res.data.store.id}`);
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- RENDER ---------------- */

  return (
    <div className="flex flex-col w-full max-w-6xl mx-auto gap-6 mt-4 pb-28">
      {/* STEP 0 */}
      <PhoneVerify />

      {sStep === 0 && <StepIntro />}

      {sStep === 1 && <StepTitle title={title} setTitle={setTitle} />}

      {sStep === 2 && (
        <StepTypeStore value={storeType} onChange={setStoreType} />
      )}

      {sStep === 3 && (
        <LocationPicker
          address={address}
          setAddress={setAddress}
          setFlatNo={setFlat}
          setStreet={setStreet}
          setNearby={setNearby}
          setDistrict={setDistrict}
          setCity={setCity}
          setCountry={setCountry}
          Sstate={Sstate}
          setPin={setPin}
        />
      )}

      {sStep == 4 && (
        <StepImage
          bannerImage={bannerImage}
          otherImages={otherImages}
          setBannerImage={setBannerImage}
          setOtherImages={setOtherImages}
        />
      )}
      {sStep == 5 && <StepPartic />}
      {sStep == 6 && <StoreMethodtype />}

      {sStep == 7 && <PriceInput price={price} setPrice={setPrice} />}

      {sStep == 8 && (
        <div className="space-y-8 justify-center flex flex-col items-center">
          <Heading
            title="Business Details"
            description="What kind of business do you run?"
            className="text-center"
          />

          <input
            value={bussinessType}
            onChange={(e) => setBussinessType(e.target.value)}
            placeholder="Business type"
            className="
      w-full max-w-xl
      text-5xl font-semibold text-center
      bg-transparent
      border-none outline-none
      placeholder:text-gray-400
      caret-black dark:caret-white
      dark:text-white
      focus:ring-0
    "
          />

          {/* Helper text like Airbnb */}
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-md">
            Example keywords: Barber, Bakery, Yoga Studio, Gaming Café,
            Restaurant, Gym, Salon, Coaching Center
          </p>
        </div>
      )}

      {sStep == 9 && (
        <StepDesc
          bussinesstype={bussinessType}
          description={desc}
          setDescription={setDesc}
        />
      )}

      {sStep == 10 && (
        <PeopleDesc
          bussinesstype={bussinessType}
          partnerDescription={peopleDesc}
          setPartnerDescription={setPeopleDesc}
        />
      )}

      {sStep == 11 && (
        <div className="text-center space-y-6 flex flex-col items-center justify-center">
          {/* Large Responsive Image */}
          <div className="w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center">
            <Image src={"/done.svg"} width={500} height={500} alt="hello" />
          </div>

          <Heading
            title="Thank You For Completing This Step 🎉"
            description="You're all set with your general information!"
          />
        </div>
      )}

      {/* Bottom Navigation */}

      <FormNavigation
        step={sStep}
        isValid={isStepValid}
        loading={loading}
        shake={shake}
        onPrev={prevStep}
        onNext={handleNext}
        onFinish={handleFinish}
      />
    </div>
  );
};

export default AddFormStore;
