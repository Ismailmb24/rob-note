import * as z from "zod/v4";

export const SignUpSchema = z.object({
    name: z.string().min(1, "Name is required").max(50, "Name must be less than 50 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters")
    .max(50, "Password must be less than 50 characters")
    .regex(
        /^(?=.*[a-z])(?=.*\d)/,
        "Password must contain at least one letter and one number"),
    confirmPassword: z.string().min(8, "Confirm Password must be at least 8 characters")
    .max(50, "Confirm Password must be less than 50 characters"),
}).refine(
    (data: {
        password: string;
        confirmPassword: string 
    }) => data.password === data.confirmPassword,
    {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    }
);

export const SignInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password must be at least 8 characters")
    .max(50, "Password must be less than 50 characters")
    .regex(
        /^(?=.*[a-z])(?=.*\d)/,
        "Password must contain at least one letter and one number"
    )
})

export type singInInput = z.infer<typeof SignInSchema>
export type singUpInput = z.infer<typeof SignUpSchema>