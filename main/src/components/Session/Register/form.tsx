"use client";

import debounce from "just-debounce-it";
import { useCallback, useState } from "react";

import registerSchema from "@/schemas/Session/register";

export default function Register_Form() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	/* Username */
	const debounced_setUsername = useCallback(debounce((value: string) => setUsername(value), 100), []);
	const handle_Username_Change = (e: React.ChangeEvent<HTMLInputElement>) => debounced_setUsername(e.target.value);

	/* Email */
	const debounced_setEmail = useCallback(debounce((value: string) => setEmail(value), 100), []);
	const handle_Email_Change = (e: React.ChangeEvent<HTMLInputElement>) => debounced_setEmail(e.target.value);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		const result = registerSchema.safeParse({ username, email, password, confirmPassword });
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
				{/* Username */}
				<div className="flex flex-col">
					{errors.username && <span>{errors.username}</span>}
					<label className="select-none" htmlFor="username">Username</label>
					<input className="appearance-none" type="text" value={username} id="username" autoComplete="username" onChange={handle_Username_Change} required />
				</div>

				{/* Email */}
				<div className="flex flex-col">
					{errors.email && <span>{errors.email}</span>}
					<label className="select-none" htmlFor="email">Email</label>
					<input className="appearance-none" type="email" value={email} id="email" autoComplete="email" onChange={handle_Email_Change} required />
				</div>

				{/* Password */}
				<div className="flex flex-col">
					{errors.password && <span>{errors.password}</span>}
					<label className="select-none" htmlFor="password">Password</label>
					<input className="appearance-none" type="password" value={password} id="password" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} required />
				</div>

				{/* Confirm Password */}
				<div className="flex flex-col">
					{errors.confirmPassword && <span>{errors.confirmPassword}</span>}
					<label className="select-none" htmlFor="confirm-password">Confirm Password</label>
					<input className="appearance-none" type="password" value={confirmPassword} id="confirm-password" autoComplete="current-password" onChange={(e) => setConfirmPassword(e.target.value)} required />
				</div>
			</div>

			<button type="submit" disabled={!errors}>
				<span className="select-none">Register</span>
			</button>
		</form>
	);
}