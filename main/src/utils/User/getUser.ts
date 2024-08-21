"use server";

import axios from "axios";

interface UserSimpleProps {
	accessToken: string
}

export async function getUser_Simple({ accessToken }: UserSimpleProps) {
	if (accessToken === "") return false;

	try {
		const response = await axios.get("http://gateway-service:8080/dialosoft-api/user-service/get-simpleuser-info",
			{
				headers: {
					"Authorization": "Bearer " + accessToken,
				},
				timeout: (30 * 1000), // 30 seconds
			}
		);

		return response.data.data;
	} catch (error) {
		return false;
	}
}

export async function getUser({ accessToken }: UserSimpleProps) {
	console.log(accessToken);
}