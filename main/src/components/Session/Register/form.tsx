"use client";

import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import debounce from "just-debounce-it";
import { useCallback, useEffect, useState } from "react";

import { Eye, EyeOff } from "lucide-react";

import registerSchema from "@/schemas/Session/register";
import registerDatabase from "@/utils/Session/register";

export default function Register_Form() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState("");

	const [seeds, setSeeds] = useState<string[]>([]);
	const [showSeedsModal, setShowSeedsModal] = useState(false);
	
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isDisabled, setIsDisabled] = useState(true);

	const [showErrorModal, setShowErrorModal] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

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

	/* Toggle Password Visibility */
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	/* Confirm Password */
	const handle_ConfirmPassword_Change = (e: React.ChangeEvent<HTMLInputElement>) => {
		setConfirmPassword(e.target.value);
		validateField("confirmPassword", e.target.value);
	};

	/* Validate individual fields */
	type FieldName = "username" | "email" | "password" | "confirmPassword";
	const validateField = (field: FieldName, value: string) => {
		const data = { username, email, password, confirmPassword };
		data[field] = value;

		const result = registerSchema.safeParse({
			...data,
			password: field === "password" ? value : password,
			confirmPassword: field === "confirmPassword" ? value : confirmPassword
		});

		if (result.success) {
			setErrors((prev) => {
				const newErrors = { ...prev };
				delete newErrors[field];

				if (field === "password" || field === "confirmPassword") {
					if (data.password === data.confirmPassword) {
						delete newErrors["confirmPassword"];
					}
				}

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

			if (field === "password" || field === "confirmPassword") {
				if (data.password !== data.confirmPassword) {
					setErrors((prev) => ({ ...prev, confirmPassword: "Passwords must match" }));
				}
			}
		}
	};

	/* Button */
	useEffect(() => {
		const noErrors = Object.keys(errors).length === 0;
		const allFieldsFilled = username && email && password && confirmPassword;
		setIsDisabled(!(noErrors && allFieldsFilled));
	}, [errors, username, email, password, confirmPassword]);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setIsSubmitting(true);

		const result = registerSchema.safeParse({ username, email, password, confirmPassword });
		if (result.success) {
			const status = await registerDatabase({ username: username, email: email, password: password, confirmPassword: confirmPassword });
			if (!status.success) {
				setErrorMessage(status.message as string);
				setShowErrorModal(true);
				setIsSubmitting(false);
				
				return setTimeout(() => {
					setShowErrorModal(false);
				}, 10 * 1000); // 10 seconds
			}

			setSeeds(status.seeds);
			setShowSeedsModal(true);

			setUsername("");
			setEmail("");
			setPassword("");
			setConfirmPassword("");

			setIsSubmitting(false);
		} else {
			const fieldErrors: { [key: string]: string } = {};

			result.error.errors.forEach((error) => {
				if (error.path.length) {
					fieldErrors[error.path[0]] = error.message;
				}
			});

			setErrors(fieldErrors);
			setIsSubmitting(false);
		}
	};

	/* Styles */
	const tw_label = "select-none font-medium text-sm lg:text-base";
	const tw_input = "appearance-none placeholder:font-light placeholder:text-sm focus:outline-none bg-black-300 bg-opacity-25 border border-black-300 rounded-md px-[.6rem] py-[.4rem]";
	const tw_error = "text-red text-sm";

	return (
		<>
		<form onSubmit={handleSubmit} className="w-[90%] md:w-1/2 lg:w-[25rem] flex flex-col items-center justify-center space-y-[2rem]" noValidate>
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

					<div className={`${tw_input} ${errors.password && "border-red"} flex items-center justify-between`}>
						<input className="w-full appearance-none placeholder:font-light placeholder:text-sm focus:outline-none bg-transparent mr-2" placeholder="Create a password" type={showPassword ? "text" : "password"} value={password} id="password" autoComplete="current-password" onChange={handle_Password_Change} minLength={8} maxLength={50} required />
						<button type="button" onClick={togglePasswordVisibility}>{showPassword ? <EyeOff className="stroke-black-300 transition-colors ease-in-out duration-300 hover:stroke-secondary" size={20} /> : <Eye className="stroke-black-300 transition-colors ease-in-out duration-300 hover:stroke-secondary" size={20} />}</button>
					</div>
				</div>

				{/* Confirm Password */}
				<div className="w-full flex flex-col space-y-[.2rem]">
					<div className="flex items-center justify-between">
						<label className={tw_label} htmlFor="confirm-password">Confirm Password</label>
						{errors.confirmPassword && <span className={tw_error}>{errors.confirmPassword}</span>}
					</div>

					<input className={`${tw_input} ${errors.confirmPassword && "border-red"}`} placeholder="Repeat your password" type={showPassword ? "text" : "password"} value={confirmPassword} id="confirm-password" autoComplete="current-password" onChange={handle_ConfirmPassword_Change} minLength={8} maxLength={50} required />
				</div>
			</div>

			<div className="w-full flex flex-col items-center space-y-[.5rem]">
				<button className={`w-full bg-primary-400 rounded-md py-[.4rem] group disabled:bg-black-300 ${isSubmitting && "animate-pulse"}`} type="submit" disabled={isDisabled || isSubmitting}>
					<span className="select-none text-black-900 font-normal text-sm lg:text-base group-disabled:text-secondary">{isSubmitting ? "Submitting..." : "Register"}</span>
				</button>

				<div className="select-none flex space-x-2">
					<p className="text-black-500">Already have an account?</p>
					<Link className="inline-block text-primary-400 opacity-80 transition-opacity ease-in-out duration-300 hover:opacity-100" href="/login">Login</Link>
				</div>
			</div>
		</form>

		{showSeedsModal && (
			<div className="fixed inset-0 bg-black-900 bg-opacity-80 flex items-center justify-center z-50">
				<div className="container flex flex-col items-center justify-center">
					<div>
						<span className="font-semibold text-red">IMPORTANT</span>
						<span>Here are your recovery words in case you forget your password. It's crucial to keep them safe and secure. Don't lose them.</span>
					</div>
				</div>
				{/* <div className="bg-darkgray text-whitebg w-[60rem] h-[32rem] flex flex-col justify-between rounded-lg items-center p-10 space-y-5">
					<div className="font-bold text-2xl">
						Congratulations!
					</div>

					<div className="flex space-x-2 ">
						<div className="font-semibold text-red">IMPORTANT:
						</div>
						<div className="text-whitegray">
							These are the recovery words in case you forget your password, it is important that you keep it in a safe place and do not lose it.
						</div>
					</div>

					<div className="grid grid-cols-5 gap-4 p-5 bg-whitegray rounded-lg">
						</div>
							{seeds.map((seed, index) => (
                                    <div className=" flex items-center wtext-center rounded-lg w-40 space-x-2 text-whitebg" key={index}>
                                        <div className="text-black w-4">
                                            {`${index + 1}`}
                                        </div>
                                        <div className="h-12 w-32 flex items-center justify-center bg-darkgray rounded-lg">
                                            {` ${seed}`}
                                        </div>
                                    </div>
                            ))}
						<div className="w-full px-24">
					</div>
				</div> */}
			</div>
		)}

		{showErrorModal && (
			<div className="fixed right-[2rem] bottom-[2rem] bg-red py-[1rem] px-[1.5rem] rounded-md shadow-lg transition-opacity duration-1000 opacity-100">
				<span>{errorMessage}</span>
			</div>
		)}
		</>
	);
}