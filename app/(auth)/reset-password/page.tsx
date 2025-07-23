import ResendResetPasswordButton from "@/components/ResendResetPasswordButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RefreshCcw, RefreshCwOff } from "lucide-react";

export default async function Page(
    { searchParams }: 
    { searchParams : Promise<{reset: string, token: string}> }
) {
    const reset = (await searchParams).reset;
    const token = (await searchParams).token;

    //if token not provided 
    if (token === "false") {
        return (
            <div className="h-screen flex flex-col justify-center items-center gap-5">
                <div>
                    <RefreshCwOff className="w-20 h-20 text-red-500" />
                    <p className="text-slate-900">Invalid Token</p>
                </div>
            </div>
        );
    }

    //if token expired
    if(token === "expired") {
        return (
            <div className="h-screen flex flex-col justify-center items-center gap-5">
                    <RefreshCwOff className="w-20 h-20 text-red-500" />
                    <p className="text-slate-900">Token Expired</p>
                    <ResendResetPasswordButton token={token} />
            </div>
        );
    }

    //if password reset
    if (reset === "true") {
        return (
            <div className="h-screen flex flex-col justify-center items-center gap-5">
                <RefreshCcw className="w-20 h-20 text-green-500" />
                <p className="text-slate-900">Password reset successfully</p>
            </div>
        );
    }

    //if password failed to reset
    if (reset === "false") {
        return (
            <div className="h-screen flex flex-col justify-center items-center gap-5">
                    <RefreshCwOff className="w-20 h-20 text-red-500" />
                    <p className="text-slate-900">Password failed to reset</p>
                </div>
        );
    }
    
    return (
        <div className="h-screen flex justify-center items-center">
            <Card className="w-1/3">
                <CardHeader>
                    <CardTitle>Reset Password</CardTitle>
                </CardHeader>
                <CardContent>
                    <form action="/api/auth/reset-password" method="POST" >
                        <Input type="password" name="password" placeholder="Enter your account email" />
                        <Input type="text" name="token" placeholder="Enter your new password" value={token} hidden />
                        <Button 
                        className="w-full mt-4 text-white bg-indigo-500 hover:bg-indigo-800"
                        type="submit">Submit</Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}