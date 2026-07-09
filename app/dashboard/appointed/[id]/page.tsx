"use client";

import React, { useState } from "react";
import AppointmentStep from "../components/AppointmentStep";
import { useParams } from "next/navigation";

const Appopage = () => {
  const { id } = useParams();


  return (
    <div className="w-full max-w-7xl ">
      {/* Main Content */}
      <div className=" flex justify-center items-center p-4">
        <AppointmentStep id={id}/>
      </div>

      {/* Bottom Navigation */}
      
    </div>
  );
};

export default Appopage;