"use server";

import axios from "axios";
import categorySchema from "@/schemas/Categories/category"
import { cookies } from "next/headers";

interface CategoryProps{
	name:string,
	description:string
}
export async function PostCategory({name, description}:CategoryProps) {
const result = categorySchema.safeParse({ name, description });
	if (!result.success) {
		return { success: false, message: "Validation failed" };
	}
try{

		const response = await axios.post('http://gateway-service:8080/dialosoft-api/management-service/create-category',{
				name: name.toLowerCase(),
				description: description,
			},)
const tokens = response.data.data;
const cookieStore = cookies();
if (cookieStore.has("_rtkn")) {
			return { success: true };
		}
		return { success: true };
	}catch{
		return false
	}
	
}