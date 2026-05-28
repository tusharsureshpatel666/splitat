"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export default function PhoneModal() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Check if phone already exists
  useEffect(() => {
    const checkPhone = async () => {
      try {
        const res = await axios.get("/api/phone/phonecheck");

        if (!res.data.phone) {
          setOpen(true);
        }
      } catch {
        setOpen(true);
      }
    };

    checkPhone();
  }, []);

  // ✅ Validate Indian mobile number
  const validatePhone = (value: string) => {
    if (value.length !== 10) {
      return "Phone number must be exactly 10 digits";
    }

    if (!/^[6-9]/.test(value)) {
      return "Indian mobile numbers must start with 6-9";
    }

    return "";
  };

  // ✅ Submit phone number
  const handleSubmit = async () => {
    const validationError = validatePhone(phone);

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      await axios.post("/api/savephoneno", {
        phone,
      });

      setError("");
      setOpen(false);

      router.refresh();
    } catch {
      setError("Failed to save phone number");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Close modal
  const handleClose = () => {
    setOpen(false);
    router.push("/dashboard");
  };

  // ✅ Hide component completely
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      
      {/* Modal */}
      <div
        className="
          relative w-full max-w-md
          overflow-hidden
          rounded-3xl
          bg-white
          dark:bg-gray-900
          shadow-[0_20px_60px_rgba(0,0,0,0.25)]
        "
      >
        
        {/* Top Gradient */}
        

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="
            absolute right-4 top-4
            flex h-9 w-9 items-center justify-center
            rounded-full
            text-gray-400
            transition-all
            hover:bg-gray-100
            hover:text-black cursor-pointer
          "
        >
          ✕
        </button>

        {/* Content */}
        <div className="p-7 sm:p-8">
          
          {/* Icon */}
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl dark:bg-black bg-blue-100">
            <span className="text-3xl"><Phone className="w-5 h-5 text-green-400"/></span>
          </div>

          {/* Heading */}
          <div className="text-center">
            <h2 className="text-2xl font-bold tracking-tight ">
              Add Your Phone Number
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-gray-500">
              We’ll use this number for account verification and important updates.
            </p>
          </div>

          {/* Form */}
          <div className="mt-8 space-y-5">
            
            {/* Phone Input */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-500">
                Mobile Number
              </label>

        <div
  className="
    flex h-14 items-center
    rounded-2xl
    border border-zinc-700
    bg-zinc-900
    px-4
    transition-all
    focus-within:border-blue-500
    focus-within:bg-zinc-950
    focus-within:ring-4
    focus-within:ring-blue-500/20
  "
>
  <div className="flex items-center gap-2 border-r border-zinc-700 pr-3">
    <span className="text-lg">🇮🇳</span>

    <span className="text-sm font-semibold text-zinc-200">
      +91
    </span>
  </div>

  <input
    type="text"
    inputMode="numeric"
    placeholder="9876543210"
    value={phone}
    onChange={(e) => {
      setPhone(e.target.value.replace(/\D/g, ""));
      setError("");
    }}
    className="
      ml-3 flex-1
      bg-transparent
      text-base font-medium
      text-white
      outline-none
      placeholder:text-zinc-500
    "
    maxLength={10}
  />
</div>
            </div>

            {/* Error */}
            {error && (
              <p className="text-center text-sm font-medium text-red-500">
                {error}
              </p>
            )}

            {/* Button */}
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="
                h-14 w-full
                rounded-2xl
                text-base font-semibold
                shadow-lg
                transition-all
                hover:scale-[1.01]
                active:scale-[0.99]
              "
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Saving...
                </div>
              ) : (
                "Continue"
              )}
            </Button>

            {/* Footer */}
            <p className="text-center text-xs leading-relaxed text-gray-400">
              By continuing, you agree to receive verification messages on this number.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}