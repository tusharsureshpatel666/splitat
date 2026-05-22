import PhoneVerify from "@/app/components/PhoneVerify";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import MessageList from "./MessageList";

export default function Windows({ id }: { id: string }) {
  return (
    <div className="flex h-full flex-col bg-gray-100 dark:bg-black">
      <PhoneVerify/>
      <ChatHeader conversationId={id} />
      <MessageList conversationId={id} />
      <div className="pb-[50px] lg:pb-0">
        <ChatInput conversationId={id} />
      </div>
    </div>
  );
}
