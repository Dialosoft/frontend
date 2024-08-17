"use server";

import loginSchema from "@/schemas/Session/login";

interface LoginProps {
	UsernameOrEmail: string,
	password: string
}

export default async function Login_Database({ UsernameOrEmail, password }: LoginProps) {
	const result = loginSchema.safeParse({ UsernameOrEmail, password });
	if (!result.success) {
		return { success: false, message: "Validation failed" };
	}
}