"use server";

import axios from "axios";
import changePasswordSchema from "@/schemas/Session/changePassword";

interface ChangeProps {
	password: string;
	token: string;
}

export async function Change_Password({ password, token }: ChangeProps) {
	const result = changePasswordSchema.safeParse({ password });
	if (!result.success) {
		return { success: false, message: "Validation failed" };
	}

	const { password: validPassword } = result.data;

	try {
		await axios.put(
			"http://gateway-service:8080/dialosoft-api/auth/recover-password",
			{
				newPassword: validPassword,
			},
			{
				headers: {
					"Content-Type": "application/json",
					Recover: token as string,
				},
				timeout: 30 * 1000, // 30 seconds
			}
		);

		return { success: true };
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.data.message === "Recover password failed") {
				return { success: false, message: "The reset token has expired. Please request a new one." };
			}
		}

		return { success: false, message: "A network error occurred. Please check your connection and try again." };
	}
}
