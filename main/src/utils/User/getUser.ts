"use server";

<<<<<<< HEAD
interface UserSimpleProps {
	accessToken: string;
}

export async function getUser_Simple({ accessToken }: UserSimpleProps) {
	if (accessToken === "") {return false;}

	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 30 * 1000); // 30 seconds

	try {
		const response = await fetch(
			"http://gateway-service:8080/dialosoft-api/user-service/get-simpleuser-info",
			{
				method: "GET",
				headers: {
					Authorization: "Bearer " + accessToken,
				},
				signal: controller.signal,
				next: {
					revalidate: 5 * 60, // 5 minutes
				},
			}
		);
=======
import axios from "axios";
import { cookies } from "next/headers";

async function Verify_Cookie() {
	const session = cookies().has("_rtkn");
	if (!session) {
		return false;
	}

	const sessionUser = cookies().get("_atkn");
	if (!sessionUser?.value) {
		return false;
	}

	return sessionUser.value;
}

export async function getUser_Simple() {
	const sessionUser = await Verify_Cookie();
	if (!sessionUser) {
		return false;
	}

	try {
		const response = await axios.get("http://gateway-service:8080/dialosoft-api/user-service/get-simpleuser-info", {
			headers: {
				Authorization: "Bearer " + sessionUser,
			},
			timeout: 30 * 1000, // 30 seconds
		});
>>>>>>> 44ea55c50ce7b94e68336a682c78472099261e2c

		return response.data.data;
	} catch {
		return false;
	}
}

<<<<<<< HEAD
export async function getUser({ accessToken }: UserSimpleProps) {
	console.log(accessToken);
=======
export async function getUser() {
	const sessionUser = await Verify_Cookie();
	if (!sessionUser) {
		return false;
	}

	try {
		const response = await axios.get("http://gateway-service:8080/dialosoft-api/user-service/get-user-info", {
			headers: {
				Authorization: "Bearer " + sessionUser,
			},
			timeout: 30 * 1000, // 30 seconds
		});

		return response.data.data;
	} catch {
		return false;
	}
}

export async function getUser_Avatar(id: string) {
	const sessionUser = await Verify_Cookie();
	if (!sessionUser) {
		return false;
	}

	try {
		const response = await axios.get(`http://gateway-service:8080/dialosoft-api/user-service/avatars/${id}.jpg`, {
			headers: {
				Authorization: "Bearer " + sessionUser,
			},
			timeout: 30 * 1000, // 30 seconds
		});

		return response.data.data;
	} catch {
		return false;
	}
>>>>>>> 44ea55c50ce7b94e68336a682c78472099261e2c
}
