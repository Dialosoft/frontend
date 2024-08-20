"use server";

import { cookies } from "next/headers";

export default async function RefreshToken() {
	// Check: Refresh Token
	if (!cookies().has("_rtkn")) {
		return { redirect: true };
	}

	const refreshToken = cookies().get("_rtkn");
	
	try {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), (30 * 1000)); // 30 seconds

		const response = await fetch("http://gateway-service:8080/dialosoft-api/auth/refresh-token", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			signal: controller.signal,
			body: JSON.stringify({
				refreshToken: refreshToken?.value
			})
		});

		clearTimeout(timeoutId);

		if (!response.ok) {
			if (response.status === 401) {
				return { status: "delete" };
			} else {
				return { redirect: true };
			}
		}

		const data = await response.json();
		return { token: data.data.accessToken, time: data.data.accessTokenExpiresInSeconds };
	} catch (error) {
		return { redirect: true };
	}
}