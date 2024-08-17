"use server";

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

	try {
		const response = await fetch("http://gateway-service:8080/dialosoft-api/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				username: username,
				email: email,
				password: password
			})
		});

		if (!response.ok) {
			if (response.status === 409) {
				return { success: false, message: "Username or Email already exists." };
			} else {
				return { success: false, message: "An unexpected error occurred. Please try again later." };
			}
		}

		return { success: true };
	} catch (error) {
		return { success: false, message: "An unexpected error occurred. Please try again later." };
	}

}