"use server";

import axios from "axios";
import { cookies } from "next/headers";

interface PostProps {
	id: string;
	username: string;
	content: string;
	image: string;
	forumId: string;
}

export async function createPost({ id, username, content, image, forumId }: PostProps) {
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

	console.log(id, username, content, image, forumId)

	return { success: true }
	// try {
	// 	const response = await axios.post(
	// 		"http://gateway-service:8080/dialosoft-api/v1/post-manager/create-post",
	// 		{
	// 			id: id,
	// 			username: username,
	// 			content: content,
	// 			image: image,
	// 			forumId: forumId,
	// 		},
	// 		{
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 				Authorization: "Bearer " + sessionUser.value,
	// 			},
	// 			timeout: 60 * 1000, // 1 minute
	// 		}
	// 	);

	// 	return { success: true, data: response.data.data };
	// } catch (error) {
	// 	if (axios.isAxiosError(error)) {
	// 		if (error.response?.status === 400) {
	// 			return { success: false, message: "Invalid input data" };
	// 		}
	// 	}

	// 	return { success: false, message: "A network error occurred. Please check your connection and try again." };
	// }
}
