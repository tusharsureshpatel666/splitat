import { ReactNode } from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashNav from "./components/DashNav";
import { LocationProvider } from "./store/[id]/components/LoactionProvider";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "@/lib/apollo-client";
import Providers from "./components/provider";
import MainMobileFooter from "../chat/components/MainMobileFooter";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default async function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin");
  }

  return (
    <div className="">
      <DashNav />
      

      <div className="max-w-7xl px-3 md:px-4  py-4 min-h-[90vh]  flex justify-center  mx-auto ">
        <Providers>{children}</Providers>
      </div>
      <MainMobileFooter />
    </div>
  );
}
