"use server";

import axios from "axios";
import registerSchema from "@/schemas/Session/register";

interface RegisterProps {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export default async function Register_Database({ username, email, password, confirmPassword }: RegisterProps) {
	const result = registerSchema.safeParse({ username, email, password, confirmPassword });
	if (!result.success) {
		return { success: false, message: "Validation failed" };
	}

	const { username: validUsername, email: validEmail, password: validPassword } = result.data;

	try {
<<<<<<< HEAD
		const response = await fetch("http://192.168.0.143:8080/dialosoft-api/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			signal: controller.signal,
			body: JSON.stringify({
				username: validUsername.toLowerCase(),
				email: validEmail.toLowerCase(),
				password: validPassword,
			}),
		});
=======
		const response = await axios.post(
			"http://gateway-service:8080/dialosoft-api/auth/register",
			{
				username: validUsername.toLowerCase(),
				email: validEmail.toLowerCase(),
				password: validPassword,
			},
			{
				headers: {
					"Content-Type": "application/json",
				},
				timeout: 60 * 1000, // 1 minute
			}
		);
>>>>>>> 44ea55c50ce7b94e68336a682c78472099261e2c

		return { success: true, seeds: response.data.data.seedPhrase };
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 409) {
				return { success: false, message: "Username or Email already exists." };
			}
		}

		return { success: false, message: "A network error occurred. Please check your connection and try again." };
	}
}
