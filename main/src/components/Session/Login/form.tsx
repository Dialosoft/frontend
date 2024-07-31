"use client";

import debounce from "just-debounce-it";
import { useCallback, useState } from "react";

import loginSchema from "@/schemas/Session/login";

export default function Login_Form() {
	const [UserOrEmail, setUserOrEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	/* Username or Email */
	const debounced_setUserOrEmail = useCallback(debounce((value: string) => setUserOrEmail(value), 50), []);
	const handle_UserOrEmail_Change = (e: React.ChangeEvent<HTMLInputElement>) => debounced_setUserOrEmail(e.target.value);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		const result = loginSchema.safeParse({ UserOrEmail, password });
		if (result.success) {
			console.log(result.data, "VALID");
		} else {
			const fieldErrors: { [key: string]: string } = {};

			result.error.errors.forEach((error) => {
				if (error.path.length) {
					fieldErrors[error.path[0]] = error.message;
				}
			});

			setErrors(fieldErrors);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col items-center justify-center space-y-[2rem]">
			<div className="flex flex-col items-center justify-center space-y-[1rem]">
				<div className="flex flex-col">
					<label className="select-none" htmlFor="UsernameOrEmail">Email or Username</label>
					<input className="appearance-none" type="text" value={UserOrEmail} id="UsernameOrEmail" autoComplete="username" onChange={handle_UserOrEmail_Change} minLength={1} maxLength={254} required />
				</div>

				<div className="flex flex-col">
					<label className="select-none" htmlFor="password">Password</label>
					<input className="appearance-none" type="password" value={password} id="password" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} minLength={8} maxLength={50} required />
				</div>
			</div>

			<button type="submit" disabled={!!Object.keys(errors).length}>
				<span className="select-none">Login</span>
			</button>
		</form>
	);
}