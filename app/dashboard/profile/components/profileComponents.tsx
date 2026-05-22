import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import AddCardList from "../../yourstore/components/AddCardList";

const ProfileCompoents = () => {
  return (
    <div>
      <Tabs defaultValue="Store" className="w-full mt-5">
        <TabsList className="w-full max-w-5xl flex justify-center items-center mx-auto">
          <TabsTrigger value="Store">Store</TabsTrigger>
          <TabsTrigger value="Saved">Saved</TabsTrigger>
        </TabsList>
        <TabsContent value="Store">
          <AddCardList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileCompoents;
