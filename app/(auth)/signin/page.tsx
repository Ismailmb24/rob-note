"use client";
import SignInWithGoogle from "@/components/SignInWithGoogle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInInput, SignInSchema } from "@/lib/validators/auth";
import { useForm } from "react-hook-form"
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn, SignInResponse } from "next-auth/react";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { toast } from "sonner";
import { redirectIfAuth } from "@/lib/redirect-if-auth";
import { useSearchParams } from "next/navigation";
import { Separator } from "@/components/ui/separator";

export default function Page() {
    // This page is public and does not require authentication
    // So we don't need it while the user is signed in
    // This redirect user if he is already signed in
    redirectIfAuth();

    // Get sign in error
    // This look for error in page params
    const searchParams = useSearchParams();
    const authError = searchParams.get("error");



    // Error message to display
    const errorMessage = {
        CredentialsSignin: "Invalid email or password",
        default: "An unexpected error occurred. Please try again later."
    } [authError || "default"];

    useEffect(() => {
        if (authError) toast.error(errorMessage);
    }, [authError]);

    // Function to handle sign-in
    const onSignIn = async (data: signInInput) => {
        // Call the signIn function from next-auth with credentials provider
        const res = await signIn("credentials", {
            ...data,
            redirect: true, // Always use a literal true or false
            redirectTo: "/"
        }) as SignInResponse | undefined;
    }

    const { 
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<signInInput>({
        resolver: zodResolver(SignInSchema),
    });

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Toaster position="top-center" richColors />
            <Card className="md:w-1/3 mx-auto border-0 shadow-none">
                <CardHeader>
                    <CardTitle className="text-xl">Sing in to your account</CardTitle>
                </CardHeader>

                <CardContent>
                    <form 
                    onSubmit={handleSubmit(onSignIn)}
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
                                <a 
                                href="#"
                                className="inline-block ml-auto hover:underline text-sm">
                                    Forget password?
                                </a>
                            </div>
                            <Input
                            type="password"
                            placeholder="********"
                            {...register("password")}
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                        </div>
                        <Button 
                        className="w-full bg-indigo-500 hover:bg-indigo-700 rounded-xl" 
                        type="submit">Sign in</Button>
                    </form>
                </CardContent>

                <Separator className="my-4 mx-auto" />

                <CardFooter className="flex-col gap-2">
                   <SignInWithGoogle />

                    <p className="text-sm text-center">
                        Don't have an account?  
                        <Link href="/signup" className="text-sm hover:underline"> Sign up</Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}