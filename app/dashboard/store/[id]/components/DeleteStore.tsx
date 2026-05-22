"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DeleteStore } from "@/lib/query/deletestore";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function DeleteStoreButton({ storeId }: { storeId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await DeleteStore(storeId);
      setOpen(false); // close dialog
      router.replace("/dashboard/yourstore");

      setLoading(false);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="items-center rounded-full">
          <Trash className="w-4 h-4 " />
          <p className="hidden md:flex">Delete</p>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Store</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete your store?
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center items-center gap-4 mt-4">
          <Button
            disabled={loading}
            onClick={handleDelete}
            className="flex items-center gap-2 text-white"
          >
            <Trash className="h-4 w-4" />
            Delete
          </Button>

          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
