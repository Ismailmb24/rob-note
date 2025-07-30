import { VerificationEmail } from "@/components/VerificationEmail";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
    const { email } = await request.json(); // Get the email from the request body

    //set new token and expiry time
    const token = crypto.randomUUID();
    const expiry = new Date(Date.now() + 1000 * 60 * 60 * 24);

    // Here we will try find the user by email
    const user = await prisma.user.findUnique({
        where: { email },
    });

    //if user not found return invalid email
    if (!user || user.emailVerified) {
        return NextResponse.json({
            error: "Invalid email or email already verified",
        }, {
            status: 400,
        })
    }

    //update user verification token and expiry time
    await prisma.user.update({
        where: { email },
        data: {
            verificationToken: token,
            verificationExpire: expiry,
        },
    });

    //email verification page url
    const emailVerifyUrl = `${process.env.ORIGIN_URL}/verify-email?token=${token}`;

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
        from: 'MyApp <onboarding@resend.dev>',
        to: email,
        subject: 'Verify your email',
        html: VerificationEmail(emailVerifyUrl, email ?? ""),
    });

    return NextResponse.json({
        message: "Verification email sent successfully",
    }, {
        status: 200,
    });
}