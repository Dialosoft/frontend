"use client";

import Link from "next/link";
import debounce from "just-debounce-it";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Eye, EyeOff } from "lucide-react";

import loginSchema from "@/schemas/Session/login";
import loginDatabase from "@/utils/Session/login";

export default function Login_Form() {
	const router = useRouter();

	const [UserOrEmail, setUserOrEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isDisabled, setIsDisabled] = useState(true);

	const [showErrorModal, setShowErrorModal] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	/* Username or Email */
	const debounced_setUserOrEmail = useCallback(
		debounce((value: string) => {
			setUserOrEmail(value);
			validateField("UserOrEmail", value);
		}, 30),
		[setUserOrEmail]
	);
	const handle_UserOrEmail_Change = (e: React.ChangeEvent<HTMLInputElement>) => debounced_setUserOrEmail(e.target.value);

	/* Password */
	const handle_Password_Change = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
		validateField("password", e.target.value);
	};

	/* Toggle Password Visibility */
	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	/* Validate individual fields */
	const validateField = (field: string, value: string) => {
		const result = loginSchema.safeParse({
			UserOrEmail: field === "UserOrEmail" ? value : UserOrEmail,
			password: field === "password" ? value : password,
		});

		if (result.success) {
			setErrors(prev => {
				const newErrors = { ...prev };
				delete newErrors[field];
				return newErrors;
			});
		} else {
			const fieldError = result.error.errors.find(error => error.path[0] === field);

			if (fieldError) {
				setErrors(prev => ({ ...prev, [field]: fieldError.message }));
			} else {
				setErrors(prev => {
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
		const allFieldsFilled = UserOrEmail && password;
		setIsDisabled(!(noErrors && allFieldsFilled));
	}, [errors, UserOrEmail, password]);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setIsSubmitting(true);

		const result = loginSchema.safeParse({ UserOrEmail, password });
		if (result.success) {
			const status = await loginDatabase({ UserOrEmail: UserOrEmail, password: password });
			if (!status.success) {
				setErrorMessage(status.message as string);
				setShowErrorModal(true);
				setIsSubmitting(false);

				return setTimeout(() => {
					setShowErrorModal(false);
				}, 10 * 1000); // 10 seconds
			}

			router.push("/");
		} else {
			const fieldErrors: { [key: string]: string } = {};

			result.error.errors.forEach(error => {
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
	const tw_input =
		"appearance-none placeholder:font-light placeholder:text-sm focus:outline-none bg-black-300 bg-opacity-25 border border-black-300 rounded-md px-[.6rem] py-[.4rem]";
	const tw_error = "select-none text-red text-sm";

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className="w-[90%] md:w-1/2 lg:w-[25rem] flex flex-col items-center justify-center space-y-[2rem]"
				noValidate
			>
				<div className="w-full flex flex-col items-center justify-center space-y-[1rem]">
					{/* Username or Email */}
					<div className="w-full flex flex-col space-y-[.2rem]">
						<div className="flex items-center justify-between">
							<label className={tw_label} htmlFor="UsernameOrEmail">
								Username
							</label>
							{errors.UserOrEmail && <span className={tw_error}>{errors.UserOrEmail}</span>}
						</div>

						<input
							className={`${tw_input} ${errors.UserOrEmail && "border-red"}`}
							placeholder="Enter your username"
							type="text"
							value={UserOrEmail}
							id="UsernameOrEmail"
							autoComplete="username"
							onChange={handle_UserOrEmail_Change}
							minLength={4}
							maxLength={254}
							required
						/>
					</div>

					{/* Password */}
					<div className="w-full flex flex-col space-y-[.2rem]">
						<div className="flex items-center justify-between">
							<label className={tw_label} htmlFor="password">
								Password
							</label>
							{errors.password && <span className={tw_error}>{errors.password}</span>}
						</div>

						<div className={`${tw_input} ${errors.password && "border-red"} flex items-center justify-between`}>
							<input
								className="w-full appearance-none placeholder:font-light placeholder:text-sm focus:outline-none bg-transparent mr-2"
								placeholder="Enter your password"
								type={showPassword ? "text" : "password"}
								value={password}
								id="password"
								autoComplete="current-password"
								onChange={handle_Password_Change}
								minLength={8}
								maxLength={50}
								required
							/>
							<button type="button" onClick={togglePasswordVisibility}>
								{showPassword ? (
									<EyeOff
										className="stroke-black-300 transition-colors ease-in-out duration-300 hover:stroke-secondary"
										size={20}
									/>
								) : (
									<Eye className="stroke-black-300 transition-colors ease-in-out duration-300 hover:stroke-secondary" size={20} />
								)}
							</button>
						</div>
					</div>
				</div>

				<div className="w-full flex flex-col items-center space-y-[.5rem]">
					<button
						className={`w-full bg-primary-400 rounded-md py-[.4rem] group disabled:bg-black-300 ${isSubmitting && "animate-pulse"}`}
						type="submit"
						disabled={isDisabled || isSubmitting}
					>
						<span className="select-none text-black-900 font-normal text-sm lg:text-base group-disabled:text-secondary">
							{isSubmitting ? "Submitting..." : "Login"}
						</span>
					</button>

					<div className="w-full flex flex-col items-center">
						<Link
							className="inline-block text-black-500 transition-colors ease-in-out duration-300 hover:text-primary-400"
							href="/reset-password"
							prefetch={false}
						>
							<span>Forgot your password?</span>
						</Link>

						<div className="select-none flex space-x-2">
							<p className="text-black-500">Don't have an account?</p>
							<Link
								className="inline-block text-primary-400 opacity-80 transition-opacity ease-in-out duration-300 hover:opacity-100"
								href="/register"
							>
								Register
							</Link>
						</div>
					</div>
				</div>
			</form>

			{showErrorModal && (
				<div className="fixed right-[2rem] bottom-[2rem] bg-red py-[1rem] px-[1.5rem] rounded-md shadow-lg transition-opacity duration-1000 opacity-100">
					<span>{errorMessage}</span>
				</div>
			)}
		</>
	);
}
