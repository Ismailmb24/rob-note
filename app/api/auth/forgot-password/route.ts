import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";
import { ResetPasswordEmail } from "@/components/ResetPasswordEmail";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    //This get email from request body
    const formData = await request.formData();
    const email = formData.get("email") as string;

    //check if user exists
    const user = await prisma.user.findUnique({
        where: { email },
    });

    //if user not found return invalid email
    if (!user) {
        return NextResponse.redirect(new URL("/forgot-password?sent=false", request.nextUrl));
    }

    //create token and expire time for reset-password
    const token = crypto.randomBytes(32).toString("hex");
    const expiry = new Date(Date.now() + 1000 * 60 * 60 * 24);

    //forgot-password url
    const resetPasswordUrl = `${process.env.ORIGIN_URL}/reset-password?toke=${token}`;

    //send email to user with reset-password url
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
        from: "RobNote <noreply@robnote.xyz>",
        to: email,
        subject: "Reset Password",
        html: ResetPasswordEmail(resetPasswordUrl, email),
    });

    //update user verification token and expiry time
    await prisma.user.update({
        where: { email },
        data: {
            resetPasswordToken: token,
            resetPasswordExpire: expiry,
        },
    });

    return NextResponse.redirect(new URL("/forgot-password?sent=true", request.nextUrl));
}