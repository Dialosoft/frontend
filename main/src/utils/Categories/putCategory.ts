"use server";

import axios from "axios";
import categorySchema from "@/schemas/Categories/category";

interface CategoryProps {
	id: string;
	name: string;
	description: string;
}
export async function PutCategory({ name, description, id }:CategoryProps) {
	const result = categorySchema.safeParse({ name, description });
	if (!result.success) {
		return { success: false, message: "Validation failed" };
	}
	try{

		const response = await axios.post("http://gateway-service:8080/dialosoft-api/management-service/create-category",{ id:id,
			name: name,
			description: description,
		},{
			headers: {
				"Content-Type": "application/json",
			},
			timeout: 60 * 1000, // 1 minute
		}
		return response.data.data;

	} catch {
		return false;
	}
}
