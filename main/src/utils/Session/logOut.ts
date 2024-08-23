"use server";

import axios from "axios";
import { cookies } from "next/headers";

export default async function Session_LogOut() {
	// Refresh Token
	const refreshToken = cookies().get("_rtkn");
	cookies().delete("_rtkn");

	// Access Token
	cookies().delete("_atkn");

	try {
		await axios.get("http://gateway-service:8080/dialosoft-api/auth/logout", {
			headers: {
				Authorization: "Bearer " + refreshToken?.value,
			},
			timeout: 30 * 1000, // 30 seconds
		});

		return true;
	} catch (error) {
		return false;
	}
}
