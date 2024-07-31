"use server";

import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.,;]).*$/;

export const registerSchema = z.object({
	username: z.string().min(1, { message: "Username is required" }).max(20, { message: "Username must be 20 characters or less" }),
	email: z.string().email({ message: "Invalid email address" }),
	password: z.string().min(8, { message: "Password must be at least 8 characters long" }).max(50, { message: "Password must be 50 characters or less" }).regex(passwordRegex, { message: "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character" }),
	confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters long" }).max(50, { message: "Password must be 50 characters or less" })
}).refine((data) => data.password === data.confirmPassword, { message: "Passwords don't match", path: ["confirmPassword"] });