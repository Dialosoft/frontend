"use server";

import axios from "axios";
import registerSchema from "@/schemas/Session/register";

interface RegisterProps {
	username: string,
	email: string,
	password: string,
	confirmPassword: string
}

export default async function Register_Database({ username, email, password, confirmPassword }: RegisterProps) {
	const result = registerSchema.safeParse({ username, email, password, confirmPassword });
	if (!result.success) {
		return { success: false, message: "Validation failed" };
	}

	const { username: validUsername, email: validEmail, password: validPassword } = result.data;

	try {
		await axios.post("http://gateway-service:8080/dialosoft-api/auth/register",
			{
				username: validUsername.toLowerCase(),
				email: validEmail.toLowerCase(),
				password: validPassword
			},
			{
				headers: {
					"Content-Type": "application/json"
				},
				timeout: (60 * 1000) // 1 minute
			}
		);

		return { success: true };
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 409) {
				return { success: false, message: "Username or Email already exists." };
			}
		}

		return { success: false, message: "A network error occurred. Please check your connection and try again." };
	}

}