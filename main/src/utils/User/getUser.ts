"use server";

interface UserSimpleProps {
	accessToken: string
}

export async function getUser_Simple({ accessToken }: UserSimpleProps) {
	if (accessToken === "") return false;

	try {
		const controller = new AbortController();
		const timeoutId = setTimeout(() => controller.abort(), (1 * 60 * 1000)); // 1 minute

		const response = await fetch("http://gateway-service:8080/dialosoft-api/user-service/get-simpleuser-info", {
			method: "GET",
			headers: {
				"Authorization": "Bearer " + accessToken
			},
			signal: controller.signal,
			next: {
				revalidate: (5 * 60) // 5 minutes
			}
		});

		clearTimeout(timeoutId);

		if (!response.ok) {
			return false;
		}

		const data = await response.json();
		return data.data;
	} catch (error) {
		return false;
	}
}

export async function getUser({ accessToken }: UserSimpleProps) {
	console.log(accessToken);
}