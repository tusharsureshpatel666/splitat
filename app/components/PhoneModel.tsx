"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function PhoneModal() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false); // 🔥 start closed
  const [loading, setLoading] = useState(false);

  // ✅ Check if phone exists
  useEffect(() => {
    const checkPhone = async () => {
      try {
        const res = await axios.get("/api/phone/phonecheck");

        if (!res.data.phone) {
          setOpen(true); // 🔥 open ONLY if no phone
        }
      } catch {
        setOpen(true); // fallback → open modal
      }
    };

    checkPhone();
  }, []);

  // ✅ Phone validation
  const validatePhone = (value: string) => {
    if (value.length !== 10) return "Phone number must be exactly 10 digits";
    if (!/^[6-9]/.test(value))
      return "Indian mobile numbers must start with 6-9";
    return "";
  };

  // ✅ Submit phone
  const handleSubmit = async () => {
    const validationError = validatePhone(phone);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      

      await axios.post("/api/savephoneno", { phone });

      setError("");
      setOpen(false); // ✅ close modal
      router.refresh();
    } catch {
      setError("Failed to save phone number");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    router.push("/dashboard");
  };

  return (
    <Dialog open={open}>
      <DialogContent
        className="
      w-[95%] max-w-lg
      sm:rounded-2xl rounded-xl
      p-4 sm:p-6
    "
      >
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl text-center font-semibold">
            Enter Your Phone Number
          </DialogTitle>

          <DialogDescription className="text-center text-sm sm:text-base">
            Add your Indian mobile number
          </DialogDescription>

          <DialogClose asChild>
            <button
              onClick={handleClose}
              className="
            absolute top-3 right-3
            w-8 h-8 flex items-center justify-center
            rounded-full hover:bg-gray-100
          "
            >
              ✕
            </button>
          </DialogClose>
        </DialogHeader>

        <div className="space-y-4 flex flex-col w-full mt-4">
          {/* Phone Input */}
          <div
            className="
          flex items-center border rounded-xl
          px-3 h-12 sm:h-14
          text-sm sm:text-base
        "
          >
            <span className="mr-2 text-lg">🇮🇳</span>
            <span className="mr-2 text-gray-500 font-medium">+91</span>

            <input
              type="text"
              inputMode="numeric"
              placeholder="9876543210"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
              className="flex-1 outline-none bg-transparent"
              maxLength={10}
            />
          </div>

          {/* Button */}
          <Button
            onClick={handleSubmit}
            disabled={loading}
            className="
          w-full
          h-12 sm:h-14
          rounded-xl
          text-sm sm:text-base
          font-medium
        "
          >
            {loading ? "Saving..." : "Continue"}
          </Button>

          {/* Error */}
          {error && (
            <p className="text-xs sm:text-sm text-red-500 text-center">
              {error}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );  
}
