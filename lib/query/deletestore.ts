"use server";
import prisma from "@/lib/prisma";

export async function DeleteStore(storeId: string) {
  if (!storeId) {
    throw new Error("Store Id is Not Found");
  }

  const store = await prisma.store.findUnique({
    where: { id: storeId },
  });

  if (!store) {
    throw new Error("Store not found");
  }

  // ✅ 1. Delete related images FIRST
  await prisma.storeImage.deleteMany({
    where: { storeId },
  });

  // ✅ 2. Then delete store
  await prisma.store.delete({
    where: { id: storeId },
  });

  return { success: true };
}
