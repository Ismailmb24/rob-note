"use client"
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa"

export default function SignInWithGoogle() {
    
    return (
        <Button 
        type="submit" 
        className="w-full border-slate-500 cursor-pointer" 
        variant="outline"
        onClick={() => signIn("google", { 
            redirect: true,
            redirectTo: "/dictionary" // Redirect to dictionary page after sign in
         })} // Redirect to home after sign in
        >
            <FaGoogle />
            Sign in with Google
        </Button>
    )
}