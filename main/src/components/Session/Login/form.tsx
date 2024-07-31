"use client";

import { useCallback, useState } from "react";
import debounce from "just-debounce-it";

export default function Login_Form() {
	const [UserOrEmail, setUserOrEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		console.log({ UserOrEmail, password });
	};

	/* Username or Email */
	const debounced_setUserOrEmail = useCallback(debounce((value: string) => setUserOrEmail(value), 150), []);
	const handle_UserOrEmail_Change = (e: React.ChangeEvent<HTMLInputElement>) => {
		debounced_setUserOrEmail(e.target.value);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="flex flex-col">
				<label className="select-none" htmlFor="UsernameOrEmail">Email or Username</label>
				<input type="text" value={UserOrEmail} id="UsernameOrEmail" autoComplete="username" onChange={handle_UserOrEmail_Change} required />
			</div>

			<div className="flex flex-col">
				<label className="select-none" htmlFor="password">Password</label>
				<input type="password" value={password} id="password" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} required />
			</div>

			<button type="submit">
				<span className="select-none">Login</span>
			</button>
		</form>
	);
}