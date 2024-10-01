"use server";
import axios from "axios";

// Usar la interfaz ApiResponse para el tipo de retorno
export async function getPost(id: string) {
	try {
		const response = await axios.get(
			`http://gateway-service:8080/dialosoft-api/v1/post-manager/get-post/${id}`,
			{
				timeout: 60 * 1000, // 1 minute
			}
		);
		console.log(response);
		return { success: true, data: response.data };
	} catch (error) {
		console.error("Error fetching post:", error);
		if (axios.isAxiosError(error)) {
			console.error("Axios error details:", error.response?.data);
		}
		return { success: false, error: (error as Error).message };
	}
}