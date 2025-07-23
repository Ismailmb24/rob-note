import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
    //find the email and token value from request form data
    const formData = await request.formData();
    const password = formData.get("password");
    const token = formData.get("token");

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
            resetPasswordExpire: {gte: new Date()},
        },
    });

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
        new URL("/reset-password?success=false", request.nextUrl)
    );

    //redirect to token = true query
    return NextResponse.redirect(
        new URL("/reset-password?success=true", request.nextUrl)
    );
}