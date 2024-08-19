"use server";

import { cookies } from "next/headers";
import loginSchema from "@/schemas/Session/login";

interface LoginProps {
	UserOrEmail: string,
	password: string
}

export default async function Login_Database({ UserOrEmail, password }: LoginProps) {
	const result = loginSchema.safeParse({ UserOrEmail, password });
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
				username: UserOrEmail,
				password: password
			})
		});

		if (!response.ok) {
			if (response.status === 401) {
				return { success: false, message: "Invalid username, email or password." };
			} else {
				return { success: false, message: "An unexpected error occurred. Please try again later." };
			}
		}

		const data = await response.json();
		const tokens = data.data;
		
		// Set cookies
		const cookieStore = cookies();

		// Search refresh token
		if (cookieStore.has("_rtkn")) {
			return { success: true };
		}
		
		// Refresh token
		cookieStore.set("_rtkn", tokens.refreshToken, {
			httpOnly: true,
			secure: false,
			sameSite: "strict",
			maxAge: tokens.refreshTokenExpiresInSeconds,
			path: "/"
		});

		// Access token
		cookieStore.set("_atkn", tokens.accessToken, {
			httpOnly: true,
			secure: false,
			sameSite: "strict",
			maxAge: tokens.accessTokenExpiresInSeconds,
			path: "/"
		});
		
		return { success: true };
	} catch (error) {
		return { success: false, message: "A network error occurred. Please check your connection and try again." };
	}
}