
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/lib/auth";
import { findUserById } from "@/lib/findUser";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserBussiness = () => {
  const [bussiness, setBussiness] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const handleSubmit = async () => {
    if (!bussiness) return; // prevent empty submission

    setLoading(true);
    try {
      const res = await axios.post("/api/userbussiness", { bussiness });
      console.log(res.data);
      setOpen(false); // close modal after save
    } catch (err) {
      console.error("Failed to save business:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkUserBussiness = async () => {
      try {
        // Call API to get user data
        const res = await axios.get("/api/getuserId");
        const user = res.data;
        if(!user){
          router.push("/signin")
        }
        console.log(user)   
        // Show modal if userBussinessType is empty
        if (!user.userBussinessType) {
          setOpen(true);
        }
      } catch (error) {
        console.error("Error checking user business:", error);
      }
    };

    checkUserBussiness();
  }, []);

  return (
    <div className="p-6">
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white dark:bg-black text-black dark:text-white p-6 rounded-xl max-w-[600px] w-full shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-center">
              What Kind of Business You Open
            </h2>

            <Input
              type="text"
              placeholder="Enter business name"
              value={bussiness}
              onChange={(e) => setBussiness(e.target.value)}
              className="w-full rounded-2xl p-2 h-[60px] px-5 mb-4"
            />

            <div className="flex justify-end gap-3">
              <Button
                onClick={handleSubmit}
                className="px-4 py-2 cursor-pointer rounded-2xl w-full h-[50px] text-white"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserBussiness;
