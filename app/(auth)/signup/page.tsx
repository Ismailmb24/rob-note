"use client";
import SignInWithGoogle from "@/components/SignInWithGoogle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { redirectIfAuth } from "@/lib/redirect-if-auth";
import { signUpInput, SignUpSchema } from "@/lib/validators/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";

export default function Page() {
    // This page is public and does not require authentication
    // So we don't need it while the user is signed in
    // This redirect user if he is already signed in
    redirectIfAuth();

    const [ authError, setAuthError ] = useState<string | null>(null);
    

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

        if (!res?.ok) {
            // Handle error
            const error = await res.json();
            setAuthError(error.error);
            toast.error(authError || "An unexpected error occurred. Please try again later.");
            return;
        }

        // Sign up successful
        const user = await res.json();
        console.log("User signed up successfully:", user);

        // Automatically sign in the user after successful sign-up
        signIn("credentials", {
            email: email,
            password: password,
            redirect: true,
            redirectTo: "/dictionary"
        });
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