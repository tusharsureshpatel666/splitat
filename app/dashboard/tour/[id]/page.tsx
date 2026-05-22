"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { getStoreById } from "@/lib/query/getstore";

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Tourpage = () => {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params?.id;

  const [data, setData] = useState<{ id: string; title: string } | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchStore = async () => {
      try {
        const res = await getStoreById(id);
        setData(res);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStore();
  }, [id]);

  // Validation
  const isValidName = name.trim().length >= 3;
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = /^\d{10}$/.test(phone);
  const isValidMessage = desc.trim().length > 0;

  const isFormValid =
    isValidName && isValidEmail && isValidPhone && isValidMessage;

  const handelSubmit = async () => {
    if (!isFormValid) return;

    try {
      setLoading(true);

      await axios.post("/api/tour", {
        name,
        email,
        phone: `+91${phone}`,
        message: desc,
        id,
      });

      setName("");
      setEmail("");
      setPhone("");
      setDesc("");

      setOpen(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRedirect = () => {
    setOpen(false);
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col justify-center w-full items-center">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl w-full "
      >
        <h1 className="text-xl md:text-3xl font-semibold text-center">
          Request a Tour {data?.title}
        </h1>

        <div className=" p-6 md:p-10 rounded-2xl  space-y-2">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="h-13 rounded-md"
            />
            {!isValidName && name.length > 0 && (
              <p className="text-red-500 text-sm">
                Name must be at least 3 characters
              </p>
            )}
          </div>

          {/* Email & Phone */}
          <div className="flex flex-col gap-4">
            <div className="w-full">
              <label className="text-sm font-medium">Email</label>
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="h-13 rounded-md"
              />
              {!isValidEmail && email.length > 0 && (
                <p className="text-red-500 text-sm">
                  Enter a valid email address
                </p>
              )}
            </div>

            {/* Indian Phone */}
            <div className=" w-full">
             

              <div className="space-y-2">
                <label className="text-sm font-medium">Mobile Number</label>

                <div className="flex items-center border rounded-md h-12 overflow-hidden bg-background">
                  {/* Country Section */}
                  <div className="flex items-center gap-2 px-3 border-r bg-muted/40">
                    <span className="text-base">🇮🇳</span>
                    <span className="text-sm font-medium">+91</span>
                    
                  </div>

                  {/* Input */}
                  <Input
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="9999 999 999"
                    maxLength={10}
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-full rounded-none"
                  />
                </div>

              
              </div>

              {!isValidPhone && phone.length > 0 && (
                <p className="text-red-500 text-sm">
                  Phone must be exactly 10 digits
                </p>
              )}
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Message</label>
            <Textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Write your message..."
              className="h-32 rounded-md"
            />
            {!isValidMessage && desc.length > 0 && (
              <p className="text-red-500 text-sm">Message is required</p>
            )}
          </div>

          {/* Button */}
          <Button
            className="w-full py-6 text-sm rounded-md mt-4 cursor-pointer"
            onClick={handelSubmit}
            disabled={!isFormValid || loading}
          >
            {loading ? "Sending..." : "Send Request"}
          </Button>
        </div>
      </motion.div>

      {/* Success Dialog */}
      <Dialog open={open} onOpenChange={setOpen} >
        <DialogContent className="sm:max-w-md px-5 py-4 rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-green-600 text-lg">
              🎉 Request Sent Successfully!
            </DialogTitle>
            <DialogDescription>
              Your tour request has been submitted. The store owner will contact
              you soon.
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-end mt-4">
            <Button onClick={handleRedirect}>Go to Dashboard</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tourpage;
