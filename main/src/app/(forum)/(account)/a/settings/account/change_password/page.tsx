"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import changePassSchema from "@/schemas/Session/changePass";

const AccountSideNav = dynamic(() => import("@/components/Forum/Account/sidenav"));
const SettingsNav = dynamic(() => import("@/components/Forum/Account/Settings_Section/settingsnav"));
const AccountMovileNav = dynamic(() => import("@/components/Forum/Account/movilenav"));

export default function StgsChangePass() {
	const [actualPass, setActualPass] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [hasChanges, setHasChanges] = useState(false);
	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isDisabled, setIsDisabled] = useState(true);

	type FieldName = "password" | "confirmPassword";

	const validateField = (field: FieldName, value: string) => {
		const data = { password, confirmPassword };
		data[field] = value;

		const result = changePassSchema.safeParse({
			...data,
			password: field === "password" ? value : password,
			confirmPassword: field === "confirmPassword" ? value : confirmPassword,
		});

		if (result.success) {
			setErrors(prev => {
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

			if (field === "password" || field === "confirmPassword") {
				if (data.password !== data.confirmPassword) {
					setErrors(prev => ({ ...prev, confirmPassword: "Passwords must match" }));
				}
			}
		}
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
		validateField("password", e.target.value);
		setHasChanges(true);
	};

	const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setConfirmPassword(e.target.value);
		validateField("confirmPassword", e.target.value);
		setHasChanges(true);
	};

	useEffect(() => {
		const noErrors = Object.keys(errors).length === 0;
		const allFieldsFilled = password && confirmPassword;
		setIsDisabled(!(noErrors && allFieldsFilled));
	}, [errors, password, confirmPassword]);

	const tw_label = "select-none font-medium text-sm lg:text-base";
	const tw_input = "appearance-none placeholder:font-light placeholder:text-sm focus:outline-none bg-black-300 bg-opacity-25 border border-black-300 rounded-md px-[.6rem] py-[.4rem]";
	const tw_error = "select-none text-red text-sm";

	return (
		<div className="lg:container max-lg:mx-4 max-sm:flex-col flex mt-8 lg:mt-16 mb-4 max-sm:mb-20">
			<AccountMovileNav />
			<div className="xl:max-w-[317px] w-fit mr-4 xl:w-full min-w-[60px] max-sm:hidden max-xl:sm:mr-4">
				<AccountSideNav />
			</div>
			<div className="max-w-[317px] w-96 lg:w-full space-y-4 mr-4 max-sm:hidden">
				<div className="h-10 rounded-full bg-black-300 bg-opacity-25"></div>
				<SettingsNav />
			</div>

			<div id="account" className="xl:max-w-[778px] w-full space-y-4">
				<Link href={"/a/settings/account"}>
					<button className="flex mb-2 h-9 items-center bg-black-300 bg-opacity-25 border border-black-300 border-opacity-25 rounded-lg px-2 py-1 text-black-500 hover:text-secondary">
						<ChevronLeft className="w-4 h-4" />
						<span>Return</span>
					</button>
				</Link>

				<div className="flex justify-between items-end">
					<h2 className="text-4xl font-semibold">Change Password</h2>
				</div>

				<div className="bg-black-300 bg-opacity-25 space-y-4 rounded-lg p-4 h-fit">
					<div className="w-full flex flex-col space-y-[.2rem] ">
						<div>
							<label className={tw_label}>Actual Password</label>
						</div>

						<input
							type="password"
							placeholder="Write actual password..."
							onChange={e => setActualPass(e.target.value)}
							className={
								"w-full appearance-none placeholder:font-light placeholder:text-sm focus:outline-none bg-black-300 bg-opacity-25 border border-black-300 rounded-md  px-[.6rem] py-[.4rem]"
							}
							required
						/>
					</div>
					<div className="w-full flex justify-end">
						<Link href="/reset-password">Forget Password?</Link>
					</div>

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
								placeholder="Create a password"
								type={showPassword ? "text" : "password"}
								value={password}
								id="password"
								autoComplete="current-password"
								onChange={handlePasswordChange}
								minLength={8}
								maxLength={50}
								required
							/>
							<button type="button" onClick={togglePasswordVisibility}>
								{showPassword ? (
									<EyeOff className="stroke-black-300 transition-colors ease-in-out duration-300 hover:stroke-secondary" size={20} />
								) : (
									<Eye className="stroke-black-300 transition-colors ease-in-out duration-300 hover:stroke-secondary" size={20} />
								)}
							</button>
						</div>
					</div>

					<div className="w-full flex flex-col space-y-[.2rem]">
						<div className="flex items-center justify-between">
							<label className={tw_label} htmlFor="confirm-password">
								Confirm Password
							</label>
							{errors.confirmPassword && <span className={tw_error}>{errors.confirmPassword}</span>}
						</div>

						<input
							className={`${tw_input} ${errors.confirmPassword && "border-red"}`}
							placeholder="Repeat your password"
							type={showPassword ? "text" : "password"}
							value={confirmPassword}
							id="confirm-password"
							autoComplete="current-password"
							onChange={handleConfirmPasswordChange}
							minLength={8}
							maxLength={50}
							required
						/>
					</div>
				</div>

				<div className="w-full flex justify-end">
					<button
						className={`w-fit bg-primary-400 px-2 rounded-md py-[.4rem] group disabled:bg-black-300 ${isSubmitting && "animate-pulse"}`}
						type="submit"
						disabled={isDisabled || isSubmitting}
					>
						<span className="select-none text-black-900 font-normal text-sm lg:text-base group-disabled:text-secondary">{isSubmitting ? "Submitting..." : "Update"}</span>
					</button>
				</div>
			</div>
		</div>
	);
}
