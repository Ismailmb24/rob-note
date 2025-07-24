"use client";
import SignInWithGoogle from "@/components/SignInWithGoogle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { signUpInput, SignUpSchema } from "@/lib/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleCheck, Mail } from "lucide-react";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";

export default function Page() {
    // This page is public and does not require authentication
    // So we don't need it while the user is signed in


    const [ authError, setAuthError ] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const verification = searchParams.get("verification");
    

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<signUpInput>({
        resolver: zodResolver(SignUpSchema),
    });

    // Function to handle sign-up
    const onSignUp = async (data: signUpInput) => {
        const { email, password } = data;
        // Post the sign-up data to the server
        const newUser = {
            email,
            password
        }

        const res = await fetch("/api/auth/signup", {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (res.status !== 200) {
            // Handle error
            const error = await res.json();
            setAuthError(error.error);
            toast.error(authError || "An unexpected error occurred. Please try again later.");
            return;
        }

        //redirect user to email verification message page
        redirect("/signup?verification=pending");
    }

    if(verification === "pending") {
        return(
            <div className="flex flex-col items-center justify-center h-[90vh]">
                    <Mail className="text-indigo-800" size={50} />
                    <h1>Check your email to verify your Account</h1>
            </div>
        );
    }

    if(verification === "success") {
        return(
            <div className="flex flex-col gap-5 items-center justify-center h-[90vh]">
                    <CircleCheck className="text-indigo-800" size={70} />
                    <h1>Congratulation, your Email has Verifyed</h1>
                    <Button 
                    className="w-20 bg-indigo-700 hover:bg-indigo-800 rounded-xl" 
                    type="submit">
                        <Link href="/signin" >Sign in</Link> 
                    </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Toaster richColors position="top-center" />
            <Card className="md:w-1/3 mx-auto border-0 shadow-none">
                <CardHeader>
                    <CardTitle className="text-xl">Create an account</CardTitle>
                </CardHeader>
                <CardContent>
                    <form 
                    onSubmit={handleSubmit(onSignUp)}
                    noValidate
                    autoComplete="off"
                    className="flex flex-col gap-10">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                            type="email"
                            placeholder="example@gmail.com"
                            required
                            {...register("email")}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>
                        <div className="grid gap-2">
                            <div className="flex justify-between">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input
                            type="password"
                            placeholder="********"
                            required
                            {...register("password")}
                            />
                            {
                                errors.password && 
                                <p className="text-red-500 text-sm">
                                    {errors.password.message}
                                </p>
                            }
                        </div>
                        <Button 
                        className="w-full bg-indigo-500 hover:bg-indigo-700 rounded-xl" 
                        type="submit">Sign up</Button>
                    </form>
                </CardContent>

                <Separator className="my-4 mx-auto" />

                <CardFooter className="flex-col gap-2">
                    
                   <SignInWithGoogle />

                    <p className="text-sm text-center">
                        Already have an account?  
                        <Link href="/signin" className="text-sm hover:underline"> Sign in</Link>
                    </p>

                </CardFooter>
            </Card>
        </div>
    );
}