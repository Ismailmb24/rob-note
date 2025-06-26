"use client";
import SignInWithGoogle from "@/components/SignInWithGoogle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithCredentials } from "@/lib/actions/auth";
import { signInInput, SignInSchema } from "@/lib/validators/auth";
import { useForm } from "react-hook-form"
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";

export default function Page() {
    const onSignIn = async (data: signInInput) => {
        await signInWithCredentials(data);
    }

    const { 
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<signInInput>({
        resolver: zodResolver(SignInSchema),
    })
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-slate-200">
            <Card className="md:w-1/2 mx-auto shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl">Sing in to your account</CardTitle>
                </CardHeader>

                <CardContent>
                    <form 
                    onSubmit={handleSubmit(onSignIn)}
                    noValidate
                    autoComplete="off"
                    className="flex flex-col gap-6">

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                            placeholder="example@gmail.com"
                            required
                            {...register("email")}
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex justify-between">
                                <Label htmlFor="password">Password</Label>
                                <a 
                                href="#"
                                className="inline-block ml-auto hover:underline text-sm">
                                    Forger your password?
                                </a>
                            </div>
                            <Input
                            placeholder="********"
                            {...register("password")}
                            />
                        </div>
                        <Button className="w-full" type="submit">Sign in</Button>
                    </form>
                </CardContent>

                <CardFooter className="flex-col gap-2">
                   <SignInWithGoogle />

                    <p className="text-sm text-center">
                        Don't have an account?  
                        <Link href="/sign-up" className="text-sm hover:underline"> Sign up</Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}