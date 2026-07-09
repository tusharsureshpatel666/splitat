
import { Calendar } from "@/components/ui/calendar";

import React, { use, useState } from "react";


import { useTourStep } from "@/store/store";
import FormNavigation from "./AppointmentNav";
import Heading from "../../components/heading";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FaceCapture from "./facecapture/Facecapture";

const AppointmentStep = ({ id }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

const timeSlots = [
  {
    id: "1",
    time: "10:00 AM - 11:00 AM",
  },
  {
    id: "2",
    time: "11:00 AM - 12:00 PM",
  },
  {
    id: "3",
    time: "2:00 PM - 3:00 PM",
  },
  {
    id: "4",
    time: "4:00 PM - 5:00 PM",
  },
   {
    id: "5",
    time: "6:00 PM - 7:00 PM",
  },
   {
    id: "6",
    time: "8:00 PM - 9:00 PM",
  },
];

const [selectedTime, setSelectedTime] = useState("");
    const mindate = new Date()

  mindate.setDate(mindate.getDate() +2)
  const [date , setDate] = useState(mindate)
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  
  


 
  const { sStep, setSStep, nextSStep, prevStep, resetStep } = useTourStep()
  console.log(date)
   const isStepValid =
    (sStep === 1 && !!date ) ||
    (sStep === 2 && !!selectedTime)

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFinish = () => {
    console.log(formData.fullName, formData.phone, formData.email)
  }
 
   const handleNext = () => {
    if (!isStepValid) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }
    nextSStep();
  };



  return (
   <>
    {sStep === 1 && (
       <div className="w-full">
      <div className="flex flex-col items-center gap-2">
     <Heading
     title="Date for Tour"
     description="Choose the date for the tour"
     className="text-center text-2xl md:text-4xl lg:text-5xl"
     />
        
      </div>

      <div className="w-full max-w-2xl mx-auto mt-8">
        <div className="flex flex-col  mb-5">
          {/* Full Name */}
      

          {/* Email */}
        

          {/* Date & Time */}
          <div className="">
            <div className="max-w-5xl flex justify-center items-center w-full">
            
             
          <div className="w-full flex justify-center">
  <Calendar
    mode="single"
    selected={date}
    onSelect={setDate}
    disabled={{ before: mindate }}
    className="w-full max-w-[600px] p-0"
  />
</div>
            </div>
         
          
          </div>

          {/* Notes */}
         

          {/* Submit */}
        
        </div>
      </div>
    </div>
    )}
{sStep === 2 && (
  <div className="w-full max-w-3xl mx-auto space-y-8">
    <div className="text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-300">
        Choose a Time
      </h1>
      <p className="mt-2 text-gray-500">
        Select an available appointment slot.
      </p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {timeSlots.map((item) => (
        <Button
          key={item.id}
          onClick={() => setSelectedTime(item.id)}
          variant={selectedTime === item.id ? "default" : "outline"}
          className={`
            h-14 rounded-xl text-base font-medium transition-all duration-200
            ${
              selectedTime === item.id
                ? "bg-primary text-white shadow-lg scale-[1.02]"
                : "hover:bg-gray-100 hover:border-black"
            }
          `}
        >
          {item.time}
        </Button>
      ))}
    </div>

    {selectedTime && (
      <div className="rounded-xl border bg-muted/40 p-4">
        <p className="text-sm text-muted-foreground">
          Selected Time
        </p>
        <p className="text-lg font-semibold">
          {timeSlots.find((t) => t.id === selectedTime)?.time}
        </p>
      </div>
    )}
  </div>
)}
{sStep === 3 && (
  <div>
    <div className="flex flex-col gap-3">
        <div className="text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-300">
        Clip your Image
      </h1>
      <p className="mt-2 text-gray-500">
        Clip your Image we need this for the verfication .
      </p>
    </div>
      <FaceCapture
      onCapture={(image) => {
        setFormData((prev) => ({
          ...prev,
          image,
        }));
      }}
    />
    </div>
  </div>
)}

        <FormNavigation
        step={sStep}
        isValid={isStepValid}
        loading={loading}
        shake={shake}
        onPrev={prevStep}
        onNext={handleNext}
        onFinish={handleFinish}
      />

   
    </>
  );
};

export default AppointmentStep;