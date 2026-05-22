"use client";

import { useParams } from "next/navigation";
import ConversationList from "./components/ChatList";

export default function ChatLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const conversationId = params?.id as string | undefined;

  return (
    <div className="h-screen flex">
      {/* Conversation List */}
      <div
        className={`
          w-full lg:w-80 border-r
          ${conversationId ? "hidden lg:block" : "block"}
        `}
      >
        <ConversationList />
      </div>

      {/* Chat Window */}
      <div
        className={`
          flex-1
          ${conversationId ? "block" : "hidden lg:block"}
        `}
      >
        {children}
      </div>
    </div>
  );
}
