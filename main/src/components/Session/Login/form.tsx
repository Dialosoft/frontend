"use client";

import debounce from "just-debounce-it";
import { useCallback, useState } from "react";

import loginSchema from "@/schemas/Session/login";

export default function Login_Form() {
	const [UserOrEmail, setUserOrEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState<{ [key: string]: string }>({});

	/* Username or Email */
	const debounced_setUserOrEmail = useCallback(debounce((value: string) => setUserOrEmail(value), 50),[setUserOrEmail]);
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
		<form onSubmit={handleSubmit} className="w-[20rem] flex flex-col items-center justify-center space-y-[2rem]">
			<div className="w-full flex flex-col items-center justify-center space-y-[1rem]">
				<div className="w-full flex flex-col space-y-[.2rem]">
					<div className="flex items-center justify-between">
						<label className="select-none font-medium" htmlFor="UsernameOrEmail">Email or Username</label>
						{errors.UserOrEmail && <span className="text-red">{errors.UserOrEmail}</span>}
					</div>
					<input className="appearance-none focus:outline-none bg-black-300 bg-opacity-25 border border-black-300 rounded-md px-[.6rem] py-[.4rem]" type="text" value={UserOrEmail} id="UsernameOrEmail" autoComplete="username" onChange={handle_UserOrEmail_Change} minLength={1} maxLength={254} required />
				</div>

				<div className="w-full flex flex-col space-y-[.2rem]">
					<div className="flex items-center justify-between">
						<label className="select-none font-medium" htmlFor="password">Password</label>
						{errors.password && <span className="text-red">{errors.password}</span>}
					</div>
					<input className={`appearance-none focus:outline-none bg-black-300 bg-opacity-25 border border-black-300 rounded-md px-[.6rem] py-[.4rem] ${errors.password && 'border-red'}`} type="password" value={password} id="password" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} minLength={8} maxLength={50} required />
				</div>
			</div>

			<button className="w-full bg-primary-400 rounded-md py-[.4rem] group disabled:bg-black-300" type="submit" disabled={!!Object.keys(errors).length}>
				<span className="select-none text-black-900 group-disabled:text-secondary">Login</span>
			</button>
		</form>
	);
}