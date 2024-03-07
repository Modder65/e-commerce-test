"use server";

import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { prisma } from "@/lib/prismadb";
import * as z from "zod";
import bcrypt from "bcryptjs"

export const register = async (values: z.infer<typeof RegisterSchema>): Promise<{ success?: string; error?: string }> => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { name, email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" }
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: "Account created!" };
}