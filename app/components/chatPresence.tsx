"use client";

import { useEffect } from "react";
import axios from "axios";

export default function ChatPresence({
  conversationId,
}: {
  conversationId: string;
}) {
  useEffect(() => {
    // user ENTERS chat
    axios.post("/api/presence/join", { conversationId });

    return () => {
      // user LEAVES chat
      axios.post("/api/presence/leave", { conversationId: null });
    };
  }, [conversationId]);

  return null;
}
