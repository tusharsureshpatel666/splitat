"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";

type Props = {
  step: number;
  isValid: boolean;
  loading: boolean;
  shake: boolean;
  onPrev: () => void;
  onNext: () => void;
  onFinish: () => void;
};

const TOTAL_STEPS = 3; // 👈 total steps in your form

const SearchFormNavigation = ({
  step,
  isValid,
  loading,
  shake,
  onPrev,
  onNext,
  onFinish,
}: Props) => {
  if (step === 0) return null;

  const progress = (step / TOTAL_STEPS) * 100;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-black z-50">
      {/* 🔴 Progress Line */}
      <div className="h-1 w-full bg-gray-200 dark:bg-gray-800">
        <motion.div
          className="h-full bg-blue-500"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Navigation */}
      <div className="p-4 flex items-center justify-between">
        {/* Prev */}
        <Button
          size="lg"
          onClick={onPrev}
          disabled={step === 1}
          variant="secondary"
          className="rounded-full"
        >
          Prev
        </Button>

        {/* Step Info */}
        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
          Step {step} of {TOTAL_STEPS}
        </span>

        {/* Next / Finish */}
        <motion.div
          animate={shake ? { x: [-8, 8, -8, 8, 0] } : { x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {step === TOTAL_STEPS ? (
            <Button
              size="lg"
              disabled={loading}
              onClick={onFinish}
              className="rounded-full"
            >
              {loading ? (
                <>
                  <Loader className="h-5 w-5 animate-spin mr-2" />
                  Finish
                </>
              ) : (
                "Finish"
              )}
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={onNext}
              disabled={!isValid}
              className={`rounded-full ${
                !isValid ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              Next
            </Button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SearchFormNavigation;
