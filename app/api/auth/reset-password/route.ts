import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
    //find the email and token value from request form data
    const formData = await request.formData();
    const password = formData.get("password");
    const token = formData.get("token");
    console.log("XXXXXXXXXXXXXX", password, token)

    //if there is no toke redirect to token = false query
    if (!token) {
        return NextResponse.redirect(
            new URL("/reset-password?token=false", request.nextUrl)
        ); 
    }

    //check is user exist with the above token and with time range
    const user = await prisma.user.findFirst({
        where: {
            resetPasswordToken: token as string,
        },
    });

    //if user not found return invalid token
    if (!user) {
        return NextResponse.redirect(
            new URL("/reset-password?token=false", request.nextUrl)
        ); 
    }

    //check is token is expired
    const expiry = user?.resetPasswordExpire;
    if (expiry && expiry < new Date()) {
        return NextResponse.redirect(
            new URL("/reset-password?token=expire", request.nextUrl)
        ); 
    }

    //encript password
    const hashedPassword = await bcrypt.hash(password as string, 10);

    //update user's password in data base
    const updatedUser = await prisma.user.update({
        where: {id: user?.id},
        data: {
            password: hashedPassword,
            resetPasswordToken: null,
            resetPasswordExpire: null
        }
    });

    //if password doesn't be reseted
    if (!updatedUser) return NextResponse.redirect(
        new URL("/reset-password?reset=false", request.nextUrl)
    );

    //redirect to token = true query
    return NextResponse.redirect(
        new URL("/reset-password?reset=true", request.nextUrl)
    );
}