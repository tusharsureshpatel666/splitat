// lib/db/find-user.ts
"use server"
import prisma from "./prisma";

export const findUserById = async (userId: string) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
