"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export function redirectIfAuth() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session?.user) {
    // If the user is authenticated, redirect them to the home page
    router.push("/dictionary");
  }
}