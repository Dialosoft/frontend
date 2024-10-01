"use server";

import axios from "axios";
import { cookies } from "next/headers";

interface PostProps {
	id: string;
	title: string;
	username: string;
	content: string;
	image: string;
	forumId: string;
}

export async function createPost({ id, title, username, content, image, forumId }: PostProps) {
	const sessionUser = cookies().get("_atkn");
	if (!sessionUser?.value) {
		return { success: false };
	}

	try {
		const response = await axios.get("http://gateway-service:8080/dialosoft-api/user-service/get-user-info", {
			headers: {
				Authorization: "Bearer " + sessionUser.value,
			},
			timeout: 30 * 1000, // 30 seconds
		});

		username = response.data.data.username;
	} catch (error) {
		return { success: false, message: "A network error occurred. Please check your connection and try again." };
	}

	try {
		await axios.post(
			"http://gateway-service:8080/dialosoft-api/v1/post-manager/create-post",
			{
				// id: id,
				username: username,
				title: title,
				content: content,
				image: image,
				forumId: forumId,
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + sessionUser.value,
				},
				timeout: 60 * 1000, // 1 minute
			}
		);

		return { success: true };
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 400) {
				return { success: false, message: "Invalid input data" };
			} else if (error.response?.status === 401) {
				return { success: false, message: "JWT token is missing or invalid" };
			}
		}

		return { success: false, message: "A network error occurred. Please check your connection and try again." };
	}
}

export async function getPost(id: string) {
	try {
		const response = await axios.post(
			"http://gateway-service:8080/dialosoft-api/v1/post-manager/get-post/" + id,
			{
				timeout: 60 * 1000, // 1 minute
			}
		);
console.log(response)
		return { success: true, data: response.data.data };
	} catch (error) {
		console.error("Error fetching post:", error);
		if (axios.isAxiosError(error)) {
			console.error("Axios error details:", error.response?.data);
		}
		return { success: false, error: (error as Error).message };
	}
}