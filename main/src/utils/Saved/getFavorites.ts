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

export async function getAllSaved(username: string) {
	const sessionUser = await Verify_Cookie();
	if (!sessionUser) {
		return false;
	}
	try {
		const response = await axios.get(`http://gateway-service:8080/dialosoft-api/v1/post-manager/get-favorites-post?username=${username}`, {
			headers: {
				Authorization: `Bearer ${sessionUser}`,
			},
			timeout: 30 * 1000,
		});

		return response.data.data;
	} catch (error) {
		console.error("Error fetching saved posts:", error);
		return false;
	}
}
