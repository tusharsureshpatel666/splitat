"use client";
import React, { useState } from "react";
import FormNavigation from "./agreeNav";
import Terms from "./Terms";
import RentAgreement from "./rentAgreement";
import { useParams } from "next/navigation";

const AgreementForm = () => {
  const [terms, setTerms] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const params = useParams()
  
  const totalSteps = 3;

  // Validation per step
  const stepValid = {
    1: terms === true,
    2: true,
    3: true,
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (!stepValid[step]) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    nextStep();
  };

  const handleFinish = async () => {
    if (!stepValid[step]) return;

    setLoading(true);

    try {
      console.log("Form submitted");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-[100px]">
        {step === 1 && <Terms agree={terms} setAgree={setTerms} />}
        {step === 2 && <RentAgreement id={params.id} />}
      </div>

      <FormNavigation
        step={step}
        isValid={stepValid[step]}
        loading={loading}
        shake={shake}
        onPrev={prevStep}
        onNext={handleNext}
        onFinish={handleFinish}
      />
    </div>
  );
};

export default AgreementForm;
