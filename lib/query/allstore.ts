"use server";

import prisma from "../prisma";

export async function getAllStores() {
  try {
    const stores = await prisma.store.findMany();
    return stores;
  } catch (error) {
    console.error("Error fetching stores:", error);
    throw new Error("Failed to fetch stores");
  }
}
