"use server";

import axios from "axios";
import { cookies } from "next/headers";

export default async function RefreshToken() {
	// Check: Refresh Token
	if (!cookies().has("_rtkn")) {
		return { redirect: true };
	}

	const refreshToken = cookies().get("_rtkn");

	try {
		const response = await axios.post("http://gateway-service:8080/dialosoft-api/auth/refresh-token",
			{
				refreshToken: refreshToken?.value,
			},
			{
				headers: {
					"Content-Type": "application/json",
				},
				timeout: (30 * 1000), // 30 seconds
			}
		);

		const data = response.data.data;
		return { token: data.accessToken, time: data.accessTokenExpiresInSeconds };
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 401) {
				return { status: "delete" };
			}
		}

		return { redirect: true };
	}
}