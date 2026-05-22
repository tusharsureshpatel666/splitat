"use client";
import { Button } from "@/components/ui/button";
import { Edit, AlertTriangle } from "lucide-react";
import React, { useState } from "react";

const EditButton = () => {
  const [loading, setLoading] = useState(true);

  const handleEdit = async () => {
    // disabled intentionally
  };

  return (
    <div className="space-y-4">
      {/* Warning Banner */}
      <div
        className="hidden lg:flex items-start gap-3 p-4 rounded-xl 
                      bg-red-50 border border-red-200 
                      text-red-700"
      >
        <AlertTriangle className="w-5 h-5 mt-0.5 shrink-0" />
        <div className="text-sm">
          <p className="font-semibold">Editing is currently disabled</p>
          <p className="text-red-600">
            To make changes, please delete this store and create a new one.
          </p>
        </div>
      </div>

      {/* Disabled Button */}
      <Button
        onClick={handleEdit}
        disabled
        className="rounded-full w-full opacity-70 cursor-not-allowed"
        size="lg"
      >
        <Edit className="w-4 h-4 " />
        <span className="hidden lg:flex">Edit Store</span>
      </Button>
    </div>
  );
};

export default EditButton;
