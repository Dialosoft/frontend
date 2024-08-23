"use server";

import axios from "axios";
import forumSchema from "@/schemas/Categories/forum";
interface CategoryProps {
	categoryId: string;
	name: string;
	description: string;
	type: string;
}
export async function PostCategory({ name, description, categoryId, type }: CategoryProps) {
	const result = forumSchema.safeParse({ categoryId, description, name });
	if (!result.success) {
		return { success: false, message: "Validation failed" };
	}

	try {
		const response = await axios.post(
			"http://gateway-service:8080/dialosoft-api/management-service/create-category",
			{ categoryId: categoryId, description: description, name: name, type: type },
			{
				headers: {
					"Content-Type": "application/json",
				},
				timeout: 60 * 1000, // 1 minute
			}
		);
		return response.data.data;
	} catch {
		return false;
	}
}
