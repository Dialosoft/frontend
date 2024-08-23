"use server";

import axios from "axios";
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

	try {
		const response = await axios.post("http://gateway-service:8080/dialosoft-api/auth/login",
			{
				username: validUserOrEmail.toLowerCase(),
				password: validPassword,
			},
			{
				headers: {
					"Content-Type": "application/json",
				},
				timeout: (30 * 1000), // 30 seconds
			}
		);

		const tokens = response.data.data;

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
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 401) {
				return { success: false, message: "Invalid username, email or password." };
			}
		}

		return { success: false, message: "A network error occurred. Please check your connection and try again." };
	}
}