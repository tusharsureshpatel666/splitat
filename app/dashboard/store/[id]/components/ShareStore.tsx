"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Share } from "lucide-react";
import {
  FaWhatsapp,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaLink,
} from "react-icons/fa";
import React, { useState, useEffect } from "react";

const ShareStore = ({ paramsId }: { paramsId: string }) => {
  const [storeUrl, setStoreUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setStoreUrl(`${window.location.origin}/store/${paramsId}`);
    }
  }, [paramsId]);

  const shareText = `Check out this store 👇\n${storeUrl}`;

  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText,
  )}`;

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    storeUrl,
  )}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(storeUrl);
    alert("Link copied!");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-full gap-2">
          <Share className="w-4 h-4" />
          <p className="hidden md:flex">Share</p>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Store</DialogTitle>
          <DialogDescription>
            Share your store with friends and family
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {/* WhatsApp */}
          <a href={whatsappShareUrl} target="_blank" rel="noopener noreferrer">
            <Button className="bg-green-500 hover:bg-green-600 text-white gap-2 w-full">
              <FaWhatsapp /> WhatsApp
            </Button>
          </a>

          {/* Twitter */}
          <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer">
            <Button className="bg-black hover:bg-gray-800 text-white gap-2 w-full">
              <FaTwitter /> Twitter
            </Button>
          </a>

          {/* Facebook */}
          <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2 w-full">
              <FaFacebook /> Facebook
            </Button>
          </a>

          {/* Instagram (fallback) */}
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-pink-500 hover:bg-pink-600 text-white gap-2 w-full">
              <FaInstagram /> Instagram
            </Button>
          </a>

          {/* Copy Link */}
          <Button
            onClick={handleCopy}
            variant="outline"
            className="col-span-2 gap-2"
          >
            <FaLink /> Copy Link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareStore;
