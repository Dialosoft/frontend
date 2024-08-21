"use server";

import axios from "axios";
import resetPasswordSchema from "@/schemas/Session/resetPassword";

interface ResetProps {
	username: string,
	seeds: string
}

export default async function Reset_Password({ username, seeds }: ResetProps) {
	const result = resetPasswordSchema.safeParse({ username, seeds });
	if (!result.success) {
		return { success: false, message: "Validation failed" };
	}

	const { username: validUsername, seeds: validSeeds } = result.data;

	try {
		const response = await axios.post("http://gateway-service:8080/dialosoft-api/auth/recover-token",
			{
				username: validUsername.toLowerCase(),
				seedPhrase: validSeeds.split(" ")
			},
			{
				headers: {
					"Content-Type": "application/json"
				},
				timeout: (30 * 1000) // 30 seconds
			}
		);

		return { success: true, token: response.data.data.recoverToken };
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 404) {
				return { success: false, message: "Invalid username or seeds." };
			}
		}
		
		return { success: false, message: "A network error occurred. Please check your connection and try again." };
	}

}