import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google"
import { prisma } from "./lib/prisma";
import Credentials from "next-auth/providers/credentials";
import { SignInSchema, singInInput } from "./lib/validators/auth";

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
                    throw new Error("Invalid input format");
                }

                const {email, password} = safe_credencials.data;
                
                const user = await prisma.user.findUnique({
                    where: { email },
                })
            }
        })
    ]
})