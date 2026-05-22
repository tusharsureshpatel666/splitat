import Heading from "@/app/dashboard/components/heading";
import axios from "axios";
import React, { useState } from "react";

interface PeopleDescProps {
  bussinesstype: string;
  partnerDescription: string;
  setPartnerDescription: (value: string) => void;
}

const PeopleDesc = ({
  bussinesstype,
  partnerDescription,
  setPartnerDescription,
}: PeopleDescProps) => {
  const [loading, setLoading] = useState(false);

  const generateDescription = async () => {
    if (!bussinesstype) return;
    setLoading(true);

    try {
      const res = await axios.post("/api/peopledesc", {
        bussinesstype,
      });

      // Make sure we get a string from the API
      const desc = res.data;

      // Limit to 150 words
      const trimmed = desc.split(" ").slice(0, 150).join(" ");
      console.log(trimmed);

      setPartnerDescription(trimmed);
    } catch (err) {
      console.error("Failed to generate description:", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full flex flex-col items-center space-y-8">
      <Heading
        title="Describe your ideal store partner"
        description="Tell us who you’re looking to share your store with."
      />

      <textarea
        value={partnerDescription}
        onChange={(e) => setPartnerDescription(e.target.value)}
        placeholder="Describe the kind of partner you want"
        rows={6}
        className="
           w-full max-w-5xl
          text-2xl font-medium 
          bg-transparent
          
          border py-8 px-7 rounded-2xl outline-none
          resize-none
          placeholder:text-gray-400
          caret-black dark:caret-white
          dark:text-white
          focus:ring-0
        "
      />

      <button
        type="button"
        onClick={generateDescription}
        disabled={loading || !bussinesstype}
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-xl font-semibold transition"
      >
        {loading ? "Generating..." : "Generate Description"}
      </button>

      {/* Helper examples */}
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center max-w-md">
        Example: Looking for a bakery partner, yoga instructor, gaming setup,
        repair service, or any compatible business.
      </p>
    </div>
  );
};

export default PeopleDesc;
