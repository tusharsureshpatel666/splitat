"use client";

import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import MessageBubble from "./ChatBubble";
import { pusherClient } from "@/lib/pusher/client";

export default function MessageList({
  conversationId,
}: {
  conversationId: string;
}) {
  const [messages, setMessages] = useState<any[]>([]);
  const { data: session } = useSession();
  const bottomRef = useRef<HTMLDivElement>(null);
  const hasMarkedSeenRef = useRef(false);

  useEffect(() => {
    if (!conversationId) return;

    setMessages([]);

    axios
      .get(`/api/message/${conversationId}`)
      .then((res) => setMessages(res.data));
  }, [conversationId]);

  // 2️⃣ Realtime updates
  useEffect(() => {
    if (!conversationId || !session?.user?.id) return;

    const channelName = `conversation-${conversationId}`;
    const channel = pusherClient.subscribe(channelName);

    channel.bind("new-message", (message: any) => {
      if (message.conversationId !== conversationId) return;

      setMessages((prev) => {
        // ✅ prevent duplicates
        if (prev.some((m) => m.id === message.id)) return prev;
        return [...prev, message];
      });
    });

    channel.bind("messages-seen", ({ seenBy }: { seenBy: string }) => {
      if (seenBy !== session.user?.id) {
        setMessages((prev) =>
          prev.map((m) =>
            m.senderId === session.user?.id ? { ...m, seen: true } : m,
          ),
        );
      }
    });

    return () => {
      channel.unbind_all();
      pusherClient.unsubscribe(channelName);
    };
  }, [conversationId, session?.user?.id]);

  useEffect(() => {
    if (!conversationId || !session?.user?.id) return;

    const hasUnseenMessages = messages.some(
      (m) => !m.seen && m.senderId !== session.user.id,
    );

    if (!hasUnseenMessages) return;

    if (hasMarkedSeenRef.current) return;

    hasMarkedSeenRef.current = true;

    axios.post("/api/message/seen", { conversationId });
  }, [messages, conversationId, session?.user?.id]);

  // 4️⃣ Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4">
      {messages.map((msg, index) => {
        const isMine = msg.senderId === session?.user?.id;
        const prev = messages[index - 1];
        const next = messages[index + 1];

        return (
          <MessageBubble
            key={msg.id}
            text={msg.text}
            isMine={isMine}
            isFirst={!prev || prev.senderId !== msg.senderId}
            isLast={!next || next.senderId !== msg.senderId}
            seen={msg.seen}
            time={new Date(msg.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          />
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
