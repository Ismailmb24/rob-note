import { signIn } from "@/auth";
import SignInWithGoogle from "@/components/SignInWithGoogle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Page() {
    
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-slate-200">
            <Card className="md:w-1/2 mx-auto shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl">Sing in to your account</CardTitle>
                </CardHeader>

                <CardContent>
                    <form 
                    action={async (formData) => { 
                        "use server";
                        await signIn("credentials", {
                            ...Object.fromEntries(formData),
                            redirect: true,
                            redirectTo: "/"
                        });

                    }}
                    noValidate
                    autoComplete="off"
                    className="flex flex-col gap-6">

                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input 
                            id="email" 
                            type="email" 
                            name="email"
                            placeholder="example@gmail.com"
                            required />
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
                            type="password"
                            id="password"
                            name="password"
                            placeholder="********"
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