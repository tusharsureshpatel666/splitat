import { signIn } from "next-auth/react";

export async function SignIn1(provider: string): Promise<void> {
  await signIn(provider, {
    callbackUrl: "/dashboard",
  });
}
