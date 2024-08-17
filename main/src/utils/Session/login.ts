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

	try {
		const response = await fetch("http://gateway-service:8080/dialosoft-api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				username: UsernameOrEmail,
				password: password
			})
		});

		if (!response.ok) {
			if (response.status === 401) {
				return { success: false, message: "Invalid username, email or password. Please try again." };
			} else {
				return { success: false, message: "An unexpected error occurred. Please try again later." };
			}
		}

		return { success: true };
	} catch (error) {
		return { success: false, message: "A network error occurred. Please check your connection and try again." };
	}
}