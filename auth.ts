import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { prisma } from "./lib/prisma";
import Credentials from "next-auth/providers/credentials";
import { SignInSchema } from "./lib/validators/auth";
import bcrypt from "bcrypt";

export const {handlers, signIn, signOut, auth} = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Google,
        Credentials({
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "john@gmail.com"
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "********"
                }
            },
            async authorize(credentials) {
                const safe_credencials = SignInSchema.safeParse(credentials);
                if (!safe_credencials.success) {
                    return null; // User not found
                }

                const {email, password} = safe_credencials.data;
                
                const user = await prisma.user.findUnique({
                    where: { email },
                })

                if (!user) {
                    return null; // User not found
                }

                // Here you would typically check the password against a hashed password
                const isValidPassword = await bcrypt.compare(password, user.password as string);

                if (!isValidPassword) {
                    return null; // User not found
                }

                return user;
            }
        })
    ],
    pages: {
        signIn: "/signin",
        newUser: "/signup",

    },
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.id = user.id;
            return token;
        },
        async session({ session, token }) {
            if (token) session.user.id = token.id as string;
            return session;
        }
    },
})