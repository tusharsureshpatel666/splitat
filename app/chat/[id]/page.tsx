"use client";

import { useParams } from "next/navigation";
import EmptyState from "../components/EmptyState";
import Windows from "../components/window";
import ConversationList from "../components/ChatList";

const Page = () => {
  const params = useParams();
  const conversationId = params?.id as string | undefined;

  return (
    <div className="w-full h-screen">
      {/* Desktop */}
      <div className="hidden lg:block h-full">
        {!conversationId ? <EmptyState /> : <Windows id={conversationId} />}
      </div>

      {/* Mobile */}
      <div className="block lg:hidden h-full">
        {!conversationId ? (
          <ConversationList />
        ) : (
          <Windows id={conversationId} />
        )}
      </div>
    </div>
  );
};

export default Page;
