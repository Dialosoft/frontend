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
		return false;
	}

	try {
		const response = await axios.post(
			`http://gateway-service:8080/dialosoft-api/auth/recover-password`,
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

		return response.data.data;
	} catch (e){
		console.log(e)
		return false;
	}
}
