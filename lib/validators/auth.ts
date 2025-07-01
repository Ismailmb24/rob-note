import * as z from "zod/v4";

export const SignUpSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters")
    .max(50, "Password must be less than 50 characters")
    .regex(
        /^(?=.*[a-z])(?=.*\d)/,
        "Password must contain at least one letter and one number"
    ),
})

export const SignUpServerSchema = SignUpSchema.pick({
    email: true,
    password: true,
});

export const SignInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password must be at least 8 characters")
    .max(50, "Password must be less than 50 characters")
    .regex(
        /^(?=.*[a-z])(?=.*\d)/,
        "Invalid password format"
    )
})

export type signInInput = z.infer<typeof SignInSchema>
export type signUpInput = z.infer<typeof SignUpSchema>
export type signUpServerInput = z.infer<typeof SignUpServerSchema>