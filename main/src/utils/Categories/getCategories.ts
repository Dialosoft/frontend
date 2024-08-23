"use server";

import axios from "axios";
import { cookies } from "next/headers";

export async function getCategories() {
	const sessionUser = cookies().get("_atkn");

	try {
		const response = await axios.get("http://gateway-service:8080/dialosoft-api/management-service/categories/get-all-categories");

		if (!sessionUser?.value) {
			return { success: true, logged: false, data: response.data.data };
		} else {
			return { success: true, logged: true, data: response.data.data };
		}
	} catch {
		return { success: false };
	}
}

interface CategoryProps {
	name: string;
	description: string;
	id?: string;
}

export async function createCategory({ name, description }: CategoryProps) {
	const sessionUser = cookies().get("_atkn");
	if (!sessionUser?.value) {
		return { success: false };
	}

	try {
		const response = await axios.post(
			"http://gateway-service:8080/dialosoft-api/management-service/categories/create-category",
			{
				categoryName: name,
				description: description,
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + sessionUser.value,
				},
				timeout: 60 * 1000, // 1 minute
			}
		);

		return { success: true, data: response.data.data };
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 409) {
				return { success: false, message: "Duplicate Category" };
			}
		}

		return { success: false, message: "A network error occurred. Please check your connection and try again." };
	}
}

export async function updateCategory({ name, description, id }: CategoryProps) {
	const sessionUser = cookies().get("_atkn");
	if (!sessionUser?.value) {
		return { success: false };
	}

	try {
		const response = await axios.put(
			"http://gateway-service:8080/dialosoft-api/management-service/categories/update-category/" + id,
			{
				categoryName: name,
				description: description,
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + sessionUser.value,
				},
				timeout: 60 * 1000, // 1 minute
			}
		);

		return { success: true, data: response.data.data };
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 400) {
				return { success: false, message: "Invalid UUID" };
			} else if (error.response?.status === 404) {
				return { success: false, message: "Category Not Found" };
			}
		}

		return { success: false, message: "A network error occurred. Please check your connection and try again." };
	}
}

interface CategoryDelete {
	id: string;
}

export async function deleteCategory({ id }: CategoryDelete) {
	const sessionUser = cookies().get("_atkn");
	if (!sessionUser?.value) {
		return { success: false };
	}

	try {
		await axios.delete("http://gateway-service:8080/dialosoft-api/management-service/categories/delete-category/" + id, {
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + sessionUser.value,
			},
			timeout: 60 * 1000, // 1 minute
		});
		return { success: true };
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 400) {
				return { success: false, message: "Invalid UUID" };
			} else if (error.response?.status === 404) {
				return { success: false, message: "Category Not Found" };
			}
		}

		return { success: false, message: "A network error occurred. Please check your connection and try again." };
	}
}

export async function getForums() {
	try {
		const response = await axios.get("http://gateway-service:8080/dialosoft-api/management-service/forums/get-all-forums");
		return response.data.data;
	} catch {
		return false;
	}
}

interface CreateProps {
	name: string;
	category: string;
	description: string;
	type: string;
}

export async function createForum({ name, category, description, type }: CreateProps) {
	const sessionUser = cookies().get("_atkn");
	if (!sessionUser?.value) {
		return { success: false };
	}

	try {
		const response = await axios.post(
			"http://gateway-service:8080/dialosoft-api/management-service/forums/create-forum",
			{
				forumName: name,
				categoryId: category,
				description: description,
				type: type,
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: "Bearer " + sessionUser.value,
				},
				timeout: 60 * 1000, // 1 minute
			}
		);

		return { success: true, data: response.data.data };
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 409) {
				return { success: false, message: "Duplicate Forum" };
			} else if (error.response?.status === 404) {
				return { success: false, message: "Category Not Found" };
			}
		}

		return { success: false, message: "A network error occurred. Please check your connection and try again." };
	}
}
