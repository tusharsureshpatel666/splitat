"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useParticStore, useStoreStep } from "@/store/store";
import StepIntro from "@/app/dashboard/addstore/components/form-steps/StepIntro";
import StepTitle from "@/app/dashboard/addstore/components/form-steps/StepTitle";
import StepTypeStore from "@/app/dashboard/addstore/components/form-steps/StepTypeStore";
import LocationPicker from "@/app/dashboard/addstore/components/form-steps/stepMap";
import StepImage from "@/app/dashboard/addstore/components/form-steps/StepImage";
import StepPartic from "@/app/dashboard/addstore/components/form-steps/StepPartic";
import StoreMethodtype from "@/app/dashboard/addstore/components/form-steps/StoreMethodtype";
import PriceInput from "@/app/dashboard/addstore/components/form-steps/stepprice";

import StepDesc from "@/app/test/des";
import PeopleDesc from "@/app/dashboard/addstore/components/form-steps/PeopleDesc";

import imageCompression from "browser-image-compression";
import toast from "react-hot-toast";
import FormNavigation from "./FormNav";
import Heading from "@/app/dashboard/components/heading";
import StepIntroComm from "@/app/dashboard/addstore/components/form-steps/Stepintrocomm";


const CommunityFormStore = () => {
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
       address !=="")
      ||
    (sStep === 4 &&
      bannerImage !== null &&
      otherImages.filter(Boolean).length === 4) ||
      sStep === 5 && (
        price !== ""
      ) ||
      sStep === 6 && desc !== "" || sStep === 7 && peopleDesc !== ""


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
        
        peopleDesc,
        bannerImageUrl: bannerUrl,
        images: imageUrls,
        // share: {
        //   mode: share.mode,
        //   startTime: share.startTime ?? null,
        //   endTime: share.endTime ?? null,
        //   days: share.days ?? [],
        //   sqft: share.sqft ?? null,
        //   dayOrNight: share.dayOrNight ?? null,
        // },
      };

      const res = await axios.post("/api/store/communitystore", payload);

      toast.success("Store Created 🎉");
      router.push(`/dashboard/communitystore/${res.data.store.id}`);
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
      {/* <PhoneVerify /> */}

      {sStep === 0 && <StepIntroComm />}

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

      {sStep == 5 && <PriceInput price={price} setPrice={setPrice} />}

      {sStep == 6 && (
        <StepDesc
          bussinesstype={bussinessType}
          description={desc}
          setDescription={setDesc}
        />
      )}

      {sStep == 7 && (
        <PeopleDesc
          bussinesstype={bussinessType}
          partnerDescription={peopleDesc}
          setPartnerDescription={setPeopleDesc}
        />
      )}

      {sStep == 8 && (
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

export default CommunityFormStore;
