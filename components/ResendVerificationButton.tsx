"use client";
import { toast } from "sonner";
import { Button } from "./ui/button";

export default function ResendVerificationButton({email}: {email: string}) {
     //handle resend verification
        async function handleResendVerification() {
            const res = await fetch("/api/auth/resend-verification", {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                }),
            });

            const resData = await res.json();
            console.log("resData: ", resData);

            if (resData.error) {
                toast.error(resData.error);
            }

            if (resData.message) {
                toast.success(resData.message);
            }
        
        }
    
    
    return <Button 
    className="text-md text-white bg-indigo-500 hover:bg-indigo-800 cursor-pointer"
    onClick={handleResendVerification}>Resend Verification</Button>
    ;
}