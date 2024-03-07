"use server";

import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import * as z from "zod";
import bcrypt from "bcryptjs"

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl: string | null
) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordValid) {
    return { error: "Invalid credentials!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" }
        default: 
          return { error: "Something went wrong!" }
      }
    }

    throw error; // Must add otherwise it wont redirect you
  }
}