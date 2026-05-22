import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await auth();

  if (!user?.user?.id) {
    redirect("/signin");
  }
  return <>{children}</>;
}
