"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoChatbubble } from "react-icons/io5";

type Props = {
  storeId: string;
};

export default function ChatButton({ storeId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleConversation = async () => {
    try {
      setLoading(true);

      const res = await axios.post("/api/conversation/start", {
        storeId,
      });

      router.push(`/chat/${res.data.id}`);

      console.log(res.data.id);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleConversation}
      disabled={loading}
      className="rounded-full lg:w-full"
      
    >
      <IoChatbubble />
      <span className="hidden lg:flex">Chat Partner</span>
    </Button>
  );
}
