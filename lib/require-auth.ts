import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function requireAuth() {
    const session = await auth();

    // If user is not sign in redirect to sign in page
    if (!session?.user) redirect("/signin");

    // If user is loged in return session
    return session;
}