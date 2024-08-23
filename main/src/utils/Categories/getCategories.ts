"use server";

import axios from "axios";

export async function getCategories() {
	try {
		const response = await axios.get("http://gateway-service:8080/dialosoft-api/management-service/get-all-categories");
		return response.data.data;
	} catch (e) {
		console.log(e.response);
		return false;
	}
}
