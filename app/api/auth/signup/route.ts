import { SignUpServerSchema } from "@/lib/validators/auth";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import { VerificationEmail } from "@/components/VerificationEmail";

export async function POST (request: NextRequest) {
    const body = await request.json();

    // Validate the request body against the SignUpSchema
    // If validation fails, return a 400 response with an error message
    const validatedBody = SignUpServerSchema.safeParse(body);
    if (!validatedBody.success) {
        return NextResponse.json({
            error: "Invalid input format",
            issues: validatedBody.error.issues,
        }, {
            status: 400,
        })
    }

    //this is safe credential verified by zod
    const { email, password } = validatedBody.data;

    // Here the hash password logic would go
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // this is email verification token and expiry time
    const token = crypto.randomUUID();
    const expiry = new Date(Date.now() + 1000 * 60 * 60 * 24);

    // Here we will try find the user by email
    const existedUser = await prisma.user.findUnique({
        where: { email },
    });

    // check if the user already exists
    if ( existedUser ) {
        return NextResponse.json({
            error: "User already exists",
        }, {
            status: 409, // Conflict
        });
    }

    // If user does not exist, we will return a 201 response with the user data
    // create the user in the database
    const newUser = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            verificationToken: token,
            verificationExpire: expiry,
        },
    });

    //email verification page url
    const emailVerifyUrl = `${process.env.NEXTAUTH_URL}/verify-email?token=${token}`;

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
        from: 'RobNote <noreply@robnote.xyz>',
        to: (newUser?.email) ?? "",
        subject: 'Verify your email',
        html: VerificationEmail(emailVerifyUrl, newUser.email ?? ""),
    });

    // Return the created user data
    return NextResponse.json({
        ok: 200,
        user: {
            id: newUser.id,
            email: newUser.email,
        }
    }); 
}