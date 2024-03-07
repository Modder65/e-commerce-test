import { prisma } from "@/lib/prismadb";
import { User } from "@prisma/client";

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({ where: { email }});

    return user;
  } catch {
    return null;
  }
}