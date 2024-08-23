"use server";
import { cookies } from "next/headers";

interface PostControllerProps {
	postId: string,
}

export async function getPostById({ postId }: PostControllerProps) {
	const session = cookies().has("_rtkn");
	if (!session) {return null;}

	const sessionPost = cookies().get("_atkn");
	if (!sessionPost?.value) {return null;}

	const accessToken = sessionPost.value;

	if (accessToken === "") {return false;}

	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), (30 * 1000)); // 30 seconds

	try {
		const response = await fetch(`http://192.168.0.143:8080/dialosoft-api/v1/post-manager/get-post/${postId}`, {
			method: "GET",
			headers: {
				"Authorization": "Bearer " + accessToken,
			},
			// signal: controller.signal,
			// next: {
			// 	revalidate: (5 * 60), // 5 minutes
			// },
		});

		clearTimeout(timeoutId);

		if (!response.ok) {
			return false;
		}

		const data = await response.json();
		return data;
	} catch (error) {
		return false;
	}
}

// export async function getAllPostsByUser({  }: PostControllerProps) {
// 	console.log();
// }