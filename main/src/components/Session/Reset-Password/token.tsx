"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { Eye, EyeOff } from "lucide-react";

import { Change_Password } from "@/utils/Session/resetPassword";
import changePasswordSchema from "@/schemas/Session/changePassword";

export default function Reset_Token() {
	const router = useRouter();

	const searchParams = useSearchParams();
	const token = searchParams.get("id");
	const username = searchParams.get("user");

	if (!token || !username) {
		return null;
	}

	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isDisabled, setIsDisabled] = useState(true);

	const [showOkModal, setShowOkModal] = useState(false);
	const [showErrorModal, setShowErrorModal] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

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
		const result = changePasswordSchema.safeParse({ password: field === "password" ? value : password });

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
		const allFieldsFilled = password;
		setIsDisabled(!(noErrors && allFieldsFilled));
	}, [errors, password]);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setIsSubmitting(true);

		const result = changePasswordSchema.safeParse({ password });
		if (result.success) {
			const status = await Change_Password({ password: password, token: token as string });
			if (!status.success) {
				setErrorMessage(status.message as string);
				setShowErrorModal(true);
				setIsSubmitting(false);
				setIsDisabled(true);
				
				return setTimeout(() => {
					setShowErrorModal(false);
					router.push("/reset-password");
				}, 5 * 1000); // 5 seconds
			}

			setShowOkModal(true);
			setIsSubmitting(false);
			setIsDisabled(true);

			return setTimeout(() => {
				setShowOkModal(false);
				router.push("/login");
			}, 5 * 1000); // 5 seconds
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
	const tw_error = "select-none text-red text-sm";

	return (
		<>
		<form onSubmit={handleSubmit} className="w-[90%] md:w-1/2 lg:w-[25rem] flex flex-col items-center justify-center space-y-[2rem]" noValidate>
			<div className="w-full flex flex-col items-center justify-center space-y-[1rem]">
				{/* Username */}
				<div className="w-full flex flex-col space-y-[.2rem]">
					<div className="flex items-center justify-between">
						<label className={tw_label}>Username</label>
					</div>

					<input className={tw_input} type="text" value={username.substring(0, 20)} autoComplete="off" maxLength={20} disabled />
				</div>

				{/* New Password */}
				<div className="w-full flex flex-col space-y-[.2rem]">
					<div className="flex items-center justify-between">
						<label className={tw_label} htmlFor="password">New Password</label>
						{errors.password && <span className={tw_error}>{errors.password}</span>}
					</div>
					
					<div className={`${tw_input} ${errors.password && "border-red"} flex items-center justify-between`}>
						<input className="w-full appearance-none placeholder:font-light placeholder:text-sm focus:outline-none bg-transparent mr-2" placeholder="Enter your password" type={showPassword ? "text" : "password"} value={password} id="password" autoComplete="current-password" onChange={handle_Password_Change} minLength={8} maxLength={50} required />
						<button type="button" onClick={togglePasswordVisibility}>{showPassword ? <EyeOff className="stroke-black-300 transition-colors ease-in-out duration-300 hover:stroke-secondary" size={20} /> : <Eye className="stroke-black-300 transition-colors ease-in-out duration-300 hover:stroke-secondary" size={20} />}</button>
					</div>
				</div>
			</div>

			<button className={`w-full bg-primary-400 rounded-md py-[.4rem] group disabled:bg-black-300 ${isSubmitting && "animate-pulse"}`} type="submit" disabled={isDisabled || isSubmitting}>
				<span className="select-none text-black-900 font-normal text-sm lg:text-base group-disabled:text-secondary">{isSubmitting ? "Submitting..." : "Change Password"}</span>
			</button>
		</form>

		{showErrorModal && (
			<div className="fixed right-[2rem] bottom-[2rem] bg-red py-[1rem] px-[1.5rem] rounded-md shadow-lg transition-opacity duration-1000 opacity-100">
				<span>{errorMessage}</span>
			</div>
		)}

		{showOkModal && (
			<div className="fixed right-[2rem] bottom-[2rem] bg-green py-[1rem] px-[1.5rem] rounded-md shadow-lg transition-opacity duration-1000 opacity-100">
				<span>Your password has been changed successfully.</span>
			</div>
		)}
		</>
	);
}