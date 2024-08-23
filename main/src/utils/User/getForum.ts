"use server";

import axios from "axios";
import { cookies } from "next/headers";

export async function getForums_byUser() {
	const session = cookies().has("_rtkn");
	if (!session) {
		return false;
	}

	const sessionUser = cookies().get("_atkn");
	if (!sessionUser?.value) {
		return false;
	}

	try {
		const response = await axios.get("http://gateway-service:8080/dialosoft-api/user-service/get-user-info", {
			headers: {
				Authorization: "Bearer " + sessionUser.value,
			},
			timeout: 30 * 1000, // 30 seconds
		});

		return response.data.data;
	} catch {
		return false;
	}
}
