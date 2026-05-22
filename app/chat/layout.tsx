import ChatLayoutClient from "./chatclient";
import Sidebar from "./components/sidebar/Sidebar";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Sidebar>
      <ChatLayoutClient>{children}</ChatLayoutClient>
    </Sidebar>
  );
}
