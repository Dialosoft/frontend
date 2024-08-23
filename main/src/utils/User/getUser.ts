"use server";

import axios from "axios";
import { cookies } from "next/headers";

async function Verify_Cookie() {
	const session = cookies().has("_rtkn");
	if (!session) return false;
	
	const sessionUser = cookies().get("_atkn");
	if (!sessionUser?.value) return false;

	return sessionUser.value;
}

export async function getUser_Simple() {
	const sessionUser = await Verify_Cookie();
	if (!sessionUser) return false;

	try {
		const response = await axios.get("http://gateway-service:8080/dialosoft-api/user-service/get-simpleuser-info",
			{
				headers: {
					"Authorization": "Bearer " + sessionUser,
				},
				timeout: (30 * 1000), // 30 seconds
			}
		);

		return response.data.data;
	} catch (error) {
		return false;
	}
}

export async function getUser() {
	const sessionUser = await Verify_Cookie();
	if (!sessionUser) return false;

	try {
		const response = await axios.get("http://gateway-service:8080/dialosoft-api/user-service/get-user-info",
			{
				headers: {
					"Authorization": "Bearer " + sessionUser,
				},
				timeout: (30 * 1000), // 30 seconds
			}
		);

		return response.data.data;
	} catch (error) {
		return false;
	}
}

export async function getUser_Avatar(id: string) {
	const sessionUser = await Verify_Cookie();
	if (!sessionUser) return false;

	try {
		const response = await axios.get(`http://gateway-service:8080/dialosoft-api/user-service/avatars/${id}.jpg`,
			{
				headers: {
					"Authorization": "Bearer " + sessionUser,
				},
				timeout: (30 * 1000), // 30 seconds
			}
		);

		return response.data.data;
	} catch (error) {
		return false;
	}
}