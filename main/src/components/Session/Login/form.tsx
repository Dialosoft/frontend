"use client";

import debounce from "just-debounce-it";
import { useCallback, useState } from "react";

import loginSchema from "@/schemas/Session/login";

export default function Login_Form() {
	const [UserOrEmail, setUserOrEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [isDisabled, setIsDisabled] = useState(true);

	/* Username or Email */
	const debounced_setUserOrEmail = useCallback(debounce((value: string) => {
		setUserOrEmail(value);
		validateField("username", value);
	}, 30), [setUserOrEmail]);
	const handle_UserOrEmail_Change = (e: React.ChangeEvent<HTMLInputElement>) => debounced_setUserOrEmail(e.target.value);

	/* Password */

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		const result = loginSchema.safeParse({ UserOrEmail, password });
		if (result.success) {
			// AQUI VA EL CODIGO DE ENVIO AL BACKEND
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

	/* Styles */
	const tw_label = "select-none font-medium text-sm lg:text-base";
	const tw_input = "appearance-none placeholder:font-light placeholder:text-sm focus:outline-none bg-black-300 bg-opacity-25 border border-black-300 rounded-md px-[.6rem] py-[.4rem]";
	const tw_error = "text-red text-sm";

	return (
		<form onSubmit={handleSubmit} className="w-[90%] md:w-1/2 lg:w-[25rem] flex flex-col items-center justify-center space-y-[2rem]" noValidate>
			<div className="w-full flex flex-col items-center justify-center space-y-[1rem]">
				{/* Username or Email */}
				<div className="w-full flex flex-col space-y-[.2rem]">
					<div className="flex items-center justify-between">
						<label className={tw_label} htmlFor="UsernameOrEmail">Email or Username</label>
						{errors.UserOrEmail && <span className={tw_error}>{errors.UserOrEmail}</span>}
					</div>
					<input className={`${tw_input} ${errors.UserOrEmail && "border-red"}`} placeholder="Enter your email or username" type="text" value={UserOrEmail} id="UsernameOrEmail" autoComplete="username" onChange={handle_UserOrEmail_Change} maxLength={254} required />
				</div>

				{/* Password */}
				<div className="w-full flex flex-col space-y-[.2rem]">
					<div className="flex items-center justify-between">
						<label className={tw_label} htmlFor="password">Password</label>
						{errors.password && <span className={tw_error}>{errors.password}</span>}
					</div>
					<input className={`${tw_input} ${errors.password && "border-red"}`} placeholder="Enter your password" type="password" value={password} id="password" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} minLength={8} maxLength={50} required />
				</div>
			</div>

			<button className="w-full bg-primary-400 rounded-md py-[.4rem] group disabled:bg-black-300" type="submit" disabled={!!Object.keys(errors).length}>
				<span className="select-none text-black-900 font-normal text-sm lg:text-base group-disabled:text-secondary">Login</span>
			</button>
		</form>
	);
}