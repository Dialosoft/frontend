"use client";

import debounce from "just-debounce-it";
import { useCallback, useEffect, useState } from "react";

import registerSchema from "@/schemas/Session/register";

export default function Register_Form() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [isDisabled, setIsDisabled] = useState(true);

	/* Username */
	const debounced_setUsername = useCallback(debounce((value: string) => {
		setUsername(value);
		validateField("username", value);
	}, 30), [setUsername]);
	const handle_Username_Change = (e: React.ChangeEvent<HTMLInputElement>) => debounced_setUsername(e.target.value);

	/* Email */
	const debounced_setEmail = useCallback(debounce((value: string) => {
		setEmail(value);
		validateField("email", value);
	}, 30), [setEmail]);
	const handle_Email_Change = (e: React.ChangeEvent<HTMLInputElement>) => debounced_setEmail(e.target.value);

	/* Password */
	const handle_Password_Change = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
		validateField("password", e.target.value);
	};

	/* Confirm Password */
	const handle_ConfirmPassword_Change = (e: React.ChangeEvent<HTMLInputElement>) => {
		setConfirmPassword(e.target.value);
		validateField("confirmPassword", e.target.value);
	};

	/* Validate individual fields */
	const validateField = (field: string, value: string) => {
		const result = registerSchema.safeParse({
			username: field === "username" ? value : username,
			email: field === "email" ? value : email,
			password: field === "password" ? value : password,
			confirmPassword: field === "confirmPassword" ? value : confirmPassword
		});

		if (result.success) {
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors[field];
				return newErrors;
			});
		} else {
			const fieldError = result.error.errors.find((error) => error.path[0] === field);

			if (fieldError) {
				setErrors((prev) => ({ ...prev, [field]: fieldError.message }));
			} else {
				setErrors((prev) => {
					const newErrors = { ...prev };
					delete newErrors[field];
					return newErrors;
				});
			}
		}
	};

	/* Button */
	useEffect(() => {
		const noErrors = Object.keys(errors).length === 0;
		const allFieldsFilled = username && email && password && confirmPassword;
		setIsDisabled(!(noErrors && allFieldsFilled));
	}, [errors, username, email, password, confirmPassword]);

	const handleSubmit = (event: React.FormEvent) => {
		event.preventDefault();

		const result = registerSchema.safeParse({ username, email, password, confirmPassword });
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
		<form onSubmit={handleSubmit} className="w-[90%] md:w-1/2 font-light lg:w-[25rem] flex flex-col items-center justify-center space-y-[2rem]" noValidate>
			<div className="w-full flex flex-col items-center justify-center space-y-[1rem]">
				{/* Username */}
				<div className="w-full flex flex-col space-y-[.2rem]">
					<div className="flex items-center justify-between">
						<label className={tw_label} htmlFor="username">Username</label>
						{errors.username && <span className={tw_error}>{errors.username}</span>}
					</div>
					<input className={`${tw_input} ${errors.username && "border-red"}`} placeholder="Choose your username" type="text" value={username} id="username" autoComplete="username" onChange={handle_Username_Change} maxLength={20} required />
				</div>

				{/* Email */}
				<div className="w-full flex flex-col space-y-[.2rem]">
					<div className="flex items-center justify-between">
						<label className={tw_label} htmlFor="email">Email</label>
						{errors.email && <span className={tw_error}>{errors.email}</span>}
					</div>
					<input className={`${tw_input} ${errors.email && "border-red"}`} placeholder="Enter your email" type="email" value={email} id="email" autoComplete="email" onChange={handle_Email_Change} maxLength={254} required />
				</div>

				{/* Password */}
				<div className="w-full flex flex-col space-y-[.2rem]">
					<div className="flex items-center justify-between">
						<label className={tw_label} htmlFor="password">Password</label>
						{errors.password && <span className={tw_error}>{errors.password}</span>}
					</div>
					<input className={`${tw_input} ${errors.password && "border-red"}`} placeholder="Create a password" type="password" value={password} id="password" autoComplete="current-password" onChange={handle_Password_Change} minLength={8} maxLength={50} required />
				</div>

				{/* Confirm Password */}
				<div className="w-full flex flex-col space-y-[.2rem]">
					<div className="flex items-center justify-between">
						<label className={tw_label} htmlFor="confirm-password">Confirm Password</label>
						{errors.confirmPassword && <span className={tw_error}>{errors.confirmPassword}</span>}
					</div>
					<input className={`${tw_input} ${errors.confirmPassword && "border-red"}`} placeholder="Repeat your password" type="password" value={confirmPassword} id="confirm-password" autoComplete="current-password" onChange={handle_ConfirmPassword_Change} minLength={8} maxLength={50} required />
				</div>
			</div>

			<button className="w-full bg-primary-400 rounded-md py-[.4rem] group disabled:bg-black-300" type="submit" disabled={isDisabled}>
				<span className="select-none text-black-900 font-normal text-sm lg:text-base group-disabled:text-secondary">Register</span>
			</button>
		</form>
	);
}