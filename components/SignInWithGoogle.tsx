"use client"
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export default function SignInWithGoogle() {
    
    return (
        <Button 
        type="submit" 
        className="w-full" 
        variant="outline"
        onClick={() => signIn("google", { callbackUrl: "/" })} // Redirect to home after sign in
        >
            Sign in with google
        </Button>
    )
}