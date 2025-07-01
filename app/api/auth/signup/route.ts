import { SignUpServerSchema } from "@/lib/validators/auth";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

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

    const { email, password } = validatedBody.data;

    // Here the hash password logic would go
    const hashedPassword = await bcrypt.hash(password, 10);

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
        },
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