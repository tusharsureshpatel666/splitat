import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { setDate } from "date-fns";
import React, { useState } from "react";

const AppointmentStep = ({ id }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

  const [date , stateDate] = useState(new Date)

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handlesumit = () => {
    console.log(formData.fullName, formData.phone, formData.email)
  }

  return (
    <div className="w-full ">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-xl md:text-2xl lg:text-4xl mt-4">
          Book Tour of Store
        </h1>
        <p className="text-sm text-center mt-2">
          Book an appointment to check the property and take a tour.
        </p>
      </div>

      <div className="w-full max-w-2xl mx-auto mt-8">
        <div className="flex flex-col  mb-5">
          {/* Full Name */}
      

          {/* Email */}
        

          {/* Date & Time */}
          <div className="">
            <div className="max-w-5xl w-full">
            
             
              <Calendar
              mode="single"
              selected={date}
              className="w-full p-0"

              />
            </div>
           <button
          onClick={handlesumit}
            className="w-full cursor-pointer bg-black dark:bg-white dark:text-black  text-white py-3 rounded-lg font-medium hover:opacity-90 transition"
          >
            Continue
          </button>
          
          </div>

          {/* Notes */}
         

          {/* Submit */}
        
        </div>
      </div>
    </div>
  );
};

export default AppointmentStep;