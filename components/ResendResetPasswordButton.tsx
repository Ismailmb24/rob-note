"use client";
import { toast } from "sonner";
import { Button } from "./ui/button";

export default function ResendResetPasswordButton({token}: {token: string}) {
     //handle resend verification
        async function handleResendResetPassword() {
            const res = await fetch("/api/auth/resend-reset-password", {
                method: "POST",
                body: JSON.stringify({
                    token: token
                }),
            });

            const resData = await res.json();

            if (resData.error) {
                toast.error(resData.error);
            }

            if (resData.message) {
                toast.success(resData.message);
            }
        
        }
    
    
    return <Button 
    className="text-md text-white bg-indigo-500 hover:bg-indigo-800 cursor-pointer"
    onClick={handleResendResetPassword}>Resend reset password</Button>
    ;
}