import { getStoreById } from "@/lib/query/getstore";
import React from "react";
import EditStore from "../components/EditStore";

type PageProps = {
  params: Promise<{ id: string }>;
};

const Page = async ({ params }: PageProps) => {
  const { id } = await params;

  const data = await getStoreById(id);
  console.log("STORE DATA:", data);

  if (!data) {
    return <div>Store not found</div>;
  }
  return (
    <div>
      <EditStore initialData={data} />
    </div>
  );
};

export default Page;
