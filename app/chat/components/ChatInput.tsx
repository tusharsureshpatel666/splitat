"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { ArrowUpRightIcon, Send, SendIcon } from "lucide-react";
import { useState } from "react";

export default function ChatInput({
  conversationId,
}: {
  conversationId: string;
}) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const handelSend = async () => {
    setLoading(true);
    const res = await axios.post("/api/message/send", { conversationId, text });
    console.log(res);
    setLoading(false);
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // prevent form submit or newline
      handelSend();
    }
  };

  return (
    <div className="flex  items-center gap-3 bg-white border-t dark:bg-black px-4 py-4">
      <input
        placeholder="Type a message"
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyDown={handleKeyDown}
        className="flex-1 rounded-lg  px-4 py-2 text-sm outline-none"
      />

      <Button
        onClick={handelSend}
        size="icon-lg"
        aria-label="Submit"
        className="rounded-md"
        disabled={loading}
      >
        <SendIcon />
      </Button>
    </div>
  );
}
