import ResendVerificationButton from "@/components/ResendVerificationButton";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Toaster } from "sonner";

export default async function Page({ searchParams }: {searchParams: Promise<{token: string}>}) {
    //get the token
    const token = (await searchParams).token;
    const now = new Date(); // current time

    if (!token) return <p>Invalid Token</p>;

    //look for user
    const user = await prisma.user.findFirst({
        where: {
            verificationToken: token,
        }
    });
    // this is expiry time
    const expiry = user?.verificationExpire;

    //if user not found return invalid token
    if (!user) return <p>Invalid Token</p>;

    //if token expired return expired token message
    //and allow user to resend verification
    if (expiry && expiry < now) return (
        <>
            <Toaster richColors position="top-center" />
            <div className="flex flex-col items-center justify-center h-[90vh] gap-5">
                <p className="text-2xl">Token Expired</p>
                <ResendVerificationButton email={user.email as string} />
            </div> 
        </>       
    );

    //if user email already verified return message
    if (user.emailVerified) return <p>Email already verified</p>;

    //update user verification token and expiry time
    const updatedUser = await prisma.user.update({
        where: { id: user.id},
        data: {
            emailVerified: new Date(),
            verificationToken: null,
            verificationExpire: null,
        }
    });

    //if user not updated return error
    if (!updatedUser) return <p>Something went wrong</p>
    
    //redirect user to the email verification success page
    redirect("/signup?verification=success");
}