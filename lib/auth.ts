import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Twitter from "next-auth/providers/twitter";
import prisma from "./prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Facebook, Twitter],

  callbacks: {
    // 1️⃣ Sign in user + ensure user exists in DB
    async signIn({ user }) {
      if (!user.email) return false;

      let dbUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (!dbUser) {
        dbUser = await prisma.user.create({
          data: {
            email: user.email,
            name: user.name ?? "",
            image: user.image ?? "",
          },
        });
      }

      // Inject DB user ID into the `user` object
      user.id = dbUser.id;
      return true;
    },

    // 2️⃣ Add user ID into the JWT token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // attach db id to token
      }
      return token;
    },

    // 3️⃣ Add user ID into the session object (available on server route)
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string; // expose it
      }
      return session;
    },
  },
});
