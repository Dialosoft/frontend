"use server";

import axios from "axios";
import { cookies } from "next/headers";

async function Verify_Cookie() {
	const session = cookies().has("_rtkn");
	if (!session) {
		return false;
	}

	const sessionUser = cookies().get("_atkn");
	if (!sessionUser?.value) {
		return false;
	}

	return sessionUser.value;
}

export async function changePass(newPassword: string, actualPassword: string) {
	const sessionUser = await Verify_Cookie();
	if (!sessionUser) {
		return { success: false };
	}

	try {
		await axios.put(
			`http://gateway-service:8080/dialosoft-api/auth/change-password`,
			{
				oldPassword: actualPassword,
				newPassword: newPassword, 
			},
			{
				headers: {
					Authorization: "Bearer " + sessionUser,
				},
				timeout: 30 * 1000, 
			}
		);

		return { success: true };
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 401) {
				return { success: false, message: "Error" };
			}
		}

		return { success: false, message: "A network error occurred. Please check your connection and try again." };
	}
}
