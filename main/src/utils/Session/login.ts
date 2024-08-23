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

	const { UserOrEmail: validUserOrEmail, password: validPassword } = result.data;

	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), (30 * 1000)); // 30 seconds

	try {
		const response = await fetch("http://192.168.0.143:8080/dialosoft-api/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			signal: controller.signal,
			body: JSON.stringify({
				username: validUserOrEmail.toLowerCase(),
				password: validPassword,
			}),
		});

		clearTimeout(timeoutId);

		if (!response.ok) {
			if (response.status === 401) {
				return { success: false, message: "Invalid username, email or password." };
			} else {
				return { success: false, message: "An unexpected error occurred. Please try again later." };
			}
		}

		const data = await response.json();
		const tokens = data.metadata;

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
			path: "/",
		});

		// Access token
		cookieStore.set("_atkn", tokens.accessToken, {
			httpOnly: true,
			secure: false,
			sameSite: "strict",
			maxAge: tokens.accessTokenExpiresInSeconds,
			path: "/",
		});

		return { success: true };
	} catch (error) {
		return { success: false, message: "A network error occurred. Please check your connection and try again." };
	}
}