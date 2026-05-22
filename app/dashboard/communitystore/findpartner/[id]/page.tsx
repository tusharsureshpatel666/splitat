"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'

import StepParticom from '../components/stepPraticom'
import ComFormNavigation from '../components/ComNavigate'
import { CommunityuseParticStore, ComuseStoreStep } from '@/store/store'
import StoreMethodtypecom from '../components/stepStoreMethod'
import Image from 'next/image'
import Heading from '@/app/dashboard/components/heading'
import { useParams, useRouter } from 'next/navigation'
import StepBTitle from '../components/Bussinesstype'



const Partnerpage = () => {
  const id = useParams()
  const storeId = id.id
 const { share } = CommunityuseParticStore();
   const [btitle, setbTitle] = useState("");
 const [loading, setLoading] = useState(false);
 const [shake, setShake] = useState(false);
 const { sStep, setSStep, nextSStep, prevStep, resetStep } = ComuseStoreStep();
 const [StoreDATA, setStoreDATA] = useState(null)
 const router = useRouter()
  useEffect(() => {
    console.log(sStep)
  }, [sStep])
  
  const handleNext = () => {
    if (!isStepValid) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }
    nextSStep();
  };

  useEffect(() => {
    const handleDATA = async() => {
      const data = await axios.get("/api/getCommunityStore", {params: {
        id: storeId
      }})
            setStoreDATA(data.data)
            console.log(data.data)
    }
    handleDATA()
  },[])


  
const handleFinish = async () => {
  try {
    setLoading(true);

 const payload = {
   ownerId: StoreDATA?.ownerId,

   title: StoreDATA?.title,
   desc: StoreDATA?.desc,
   peopleDesc: StoreDATA?.peopleDesc,

   flatno: StoreDATA?.flatno,
   streetAddress: StoreDATA?.streetAddress,
   NearbyLandMark: StoreDATA?.NearbyLandMark,
   areaLocality: StoreDATA?.areaLocality,

   storeSize: StoreDATA?.storeSize,
   businessType: btitle,

   country: StoreDATA?.country,
   state: StoreDATA?.state,
   city: StoreDATA?.city,
   pin: StoreDATA?.pin,

   latitude: StoreDATA?.latitude ?? null,
   longitude: StoreDATA?.longitude ?? null,
   fullAddress: StoreDATA?.fullAddress,
   bannerImageUrl: StoreDATA?.bannerImageUrl ?? null,
   images: StoreDATA?.images ?? [],

   priceInr: StoreDATA?.priceInr,
   shareMode: share.mode,
   startTime: share.startTime ?? null,
   endTime: share.endTime ?? null,
   days: share.days ?? [],
   sqft: share.sqft ?? null,
   dayOrNight: share.dayOrNight ?? null,
 };

    const res = await axios.put(`/api/communitystore/${storeId}`, payload);
    router.push(`/dashboard/store/${res.data.store.id}`)
    


    console.log(res.data);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

   

  const isStepValid =
    (sStep ===1 && btitle !== "") ||
    (sStep === 2 && share.mode !== "") ||
    (sStep === 3 &&
      ((share.mode === "HOURS_BY_HOURS" && share.startTime && share.endTime) ||
        (share.mode === "DAYS_BY_DAYS" &&
          Array.isArray(share.days) &&
          share.days.length > 0) ||
        (share.mode === "SPLIT_STORE" && share.sqft > 0) ||
        (share.mode === "DAY_OR_NIGHT" &&
          (share.dayOrNight === "Day" || share.dayOrNight === "Night")) ||
        share.mode === "Weekend" ||
        share.mode === "Regular"));
  
  return (
    <div className="w-full flex h-[80vh] items-center justify-center">
      {sStep === 1 && <StepBTitle btitle={btitle} setbTitle={setbTitle}/>}
      {sStep === 2 && <StepParticom />}
      {sStep === 3 && <StoreMethodtypecom />}
      {sStep ===4 && <div className="text-center space-y-6 flex flex-col items-center justify-center">
                {/* Large Responsive Image */}
                <div className="w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center">
                  <Image src={"/suc.svg"} width={500} height={500} alt="hello" />
                </div>
      
                <Heading
                  title="All Set"
                  description="Click on finish and find a partner"
                />
              </div>}

      <ComFormNavigation
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
}

export default Partnerpage