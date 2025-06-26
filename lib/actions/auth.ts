"use server";
import { signIn } from "next-auth/react";
import { signInInput, SignInSchema } from "../validators/auth";

// This credential action is used to handle the sign-in process using credentials.
export async function signInWithCredentials(formData: signInInput) {
    // Validate the plain object directly
    const credentials = SignInSchema.safeParse(formData);
    if (!credentials.success) {
        throw new Error("Invalid input format");
    }
    
    await signIn("credentials", {
        ...credentials.data,
        redirect: true,
        redirectTo: "/"
    });

}