"use server";

import axios from "axios";
import forumSchema from "@/schemas/Categories/forum";

interface favoriteProps {
	isFavorite: boolean;
	postId: string;
}

export async function changeFavorite({ postId, isFavorite }: favoriteProps) {
	const result = forumSchema.safeParse({ postId, isFavorite });
	if (!result.success) {
		return { success: false, message: "Validation failed", errors: result.error.errors };
	}

	try {
		const response = await axios.post(
			"http://gateway-service:8080/dialosoft-api/management-service/create-category",
			{ postId, isFavorite },
			{
				headers: {
					"Content-Type": "application/json",
				},
				timeout: 60 * 1000,
			}
		);

		return { success: true, data: response.data.data };
	} catch (error) {
		console.error("Error in PostCategory:", error);
		return false;
	}
}
