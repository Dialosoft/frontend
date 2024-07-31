"use client";

import { useCallback, useState } from "react";
import debounce from "just-debounce-it";

export default function Register_Form() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	/* Username */
	const debounced_setUsername = useCallback(debounce((value: string) => setUsername(value), 150), []);
	const handle_Username_Change = (e: React.ChangeEvent<HTMLInputElement>) => debounced_setUsername(e.target.value);

	/* Email */
	const debounced_setEmail = useCallback(debounce((value: string) => setEmail(value), 150), []);
	const handle_Email_Change = (e: React.ChangeEvent<HTMLInputElement>) => debounced_setEmail(e.target.value);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();
		console.log({ username, email, password, confirmPassword });
	};

	return (
		<form onSubmit={handleSubmit}>
			{/* Username */}
			<div className="flex flex-col">
				<label className="select-none" htmlFor="username">Username</label>
				<input type="text" value={username} id="username" autoComplete="username" onChange={handle_Username_Change} required />
			</div>

			{/* Email */}
			<div className="flex flex-col">
				<label className="select-none" htmlFor="email">Email</label>
				<input type="email" value={email} id="email" autoComplete="email" onChange={handle_Email_Change} required />
			</div>

			{/* Password */}
			<div className="flex flex-col">
				<label className="select-none" htmlFor="password">Password</label>
				<input type="password" value={password} id="password" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} required />
			</div>

			{/* Confirm Password */}
			<div className="flex flex-col">
				<label className="select-none" htmlFor="confirm-password">Confirm Password</label>
				<input type="password" value={confirmPassword} id="confirm-password" onChange={(e) => setConfirmPassword(e.target.value)} required />
			</div>

			<button type="submit">
				<span className="select-none">Register</span>
			</button>
		</form>
	);
}