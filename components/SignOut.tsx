"use client";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

export default function SignOut() {
    return (
        <button  
        onClick={() =>{
            signOut();
            redirect("/signin");
        } } 
        className="text-md text-gray-800 cursor-pointer">
            <LogOut color="red" className="inline" /> Sign Out
        </button>
    );
}
