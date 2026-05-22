"use client";
import React, { useState } from "react";
import StepDesc from "./des";
import SingleLocationInput from "./Map";
import TrueVideo from "../dashboard/addstore/components/form-steps/trueVideo";

const Textpage = () => {
  const [desc, setDescription] = useState("");
  const [address, setAddress] = useState("")

  return (
    <div className="px-6">
      {/* <StepDesc
        bussinesstype={"cafe"}
        description={desc}
        setDescription={setDescription}
      />
      <SingleLocationInput address={address} setAddress={setAddress}/> */}
      {/* <TrueVideo/> */}
    </div>
  );
};

export default Textpage;
