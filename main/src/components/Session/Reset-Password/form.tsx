"use client";

import debounce from "just-debounce-it";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Reset_Password } from "@/utils/Session/resetPassword";
import resetPasswordSchema from "@/schemas/Session/resetPassword";

export default function Login_Form() {
	const router = useRouter();
	const [recoverList, setRecoverList] = useState(Array(12).fill(""));
	const [username, setUsername] = useState("");
	const [seeds, setSeeds] = useState("");

	const [errors, setErrors] = useState<{ [key: string]: string }>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isDisabled, setIsDisabled] = useState(true);

	const [showErrorModal, setShowErrorModal] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	/* Username */
	const debounced_setUsername = useCallback(
		debounce((value: string) => {
			setUsername(value);
			validateField("username", value);
		}, 30),
		[setUsername]
	);
	const handle_Username_Change = (e: React.ChangeEvent<HTMLInputElement>) => debounced_setUsername(e.target.value);

	/* Seeds */
	const handle_Seeds_Change = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const value = e.target.value
			.replace(/[^a-zA-Z0-9\s]/g, "")
			.replace(/^\s+/g, "")
			.replace(/\s+/g, " ");
		setSeeds(value);
		validateField("seeds", value);
	};

	const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
		event.preventDefault();
		const pastedData = event.clipboardData.getData("text");
		const words = pastedData.split(/\s+/).slice(0, 12); // Split by whitespace and limit to 15 words
		const newList = [...recoverList];

		words.forEach((word, index) => {
			if (index < newList.length) {
				newList[index] = word;
			}
		});

		setRecoverList(newList);
	};

	/* Validate individual fields */
	const validateField = (field: string, value: string) => {
		const formValues = {
			username: field === "username" ? value : username,
			seeds: field === "seeds" ? value : seeds,
		};

		const result = resetPasswordSchema.safeParse(formValues);

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
		const allFieldsFilled = username && recoverList.every(item => item.trim() !== "");
		setIsDisabled(!(noErrors && allFieldsFilled));
	}, [errors, username, recoverList]);

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault();
		setIsSubmitting(true);
		const seedsValue = recoverList.join(" ");
		const result = resetPasswordSchema.safeParse({
			username,
			seeds: seedsValue,
		});

		if (result.success) {
			const status = await Reset_Password({ username: username, seeds: seedsValue });
			if (!status.success) {
				setErrorMessage(status.message as string);
				setShowErrorModal(true);
				setIsSubmitting(false);

				return setTimeout(() => {
					setShowErrorModal(false);
				}, 10 * 1000); // 10 seconds
			}

			router.push("/reset-password/token?id=" + status.token + "&user=" + username);
			setIsSubmitting(false);
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
	const handleInputChange = (value: string, index: number) => {
		setRecoverList(currentList => {
			const newList = [...currentList];
			newList[index] = value;
			return newList;
		});
	};
	/* Styles */
	const tw_label = "select-none font-medium text-sm lg:text-base";
	const tw_input =
		"appearance-none placeholder:font-light placeholder:text-sm focus:outline-none bg-black-300 bg-opacity-25 border border-black-300 border-opacity-25 rounded-md px-[.6rem] py-[.4rem]";
	const tw_error = "select-none text-red text-sm";

	return (
		<>
			<form onSubmit={handleSubmit} className="max-w-[750px] mx-1 sm:mx-4 flex flex-col items-center justify-center space-y-[2rem]" noValidate>
				<div className="w-full flex flex-col items-center justify-center space-y-[1rem]">
					{/* Username or Email */}
					<div className="w-full flex flex-col space-y-[.2rem]">
						<div className="flex items-center justify-between">
							<label className={tw_label} htmlFor="UsernameOrEmail">
								Username
							</label>
							{errors.username && <span className={tw_error}>{errors.username}</span>}
						</div>

						<input
							className={`${tw_input} ${errors.username && "border-red"}`}
							placeholder="Enter your username"
							type="text"
							value={username}
							id="username"
							autoComplete="username"
							onChange={handle_Username_Change}
							maxLength={20}
							required
						/>
					</div>

					{/* Seeds */}
					<div className="w-full flex flex-col space-y-[.2rem]">
						<div className="flex items-center justify-between">
							<label className={tw_label} htmlFor="seeds">
								Seeds
							</label>
							{errors.seeds && <span className={tw_error}>{errors.seeds}</span>}
						</div>
						<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4    gap-4 p-5  bg-black-300 bg-opacity-25 border border-black-300 border-opacity-25 rounded-lg">
							{Array.from({ length: 12 }).map((_, index) => (
								<div key={index} className="flex items-center text-center rounded-lg w-40 space-x-2 text-secondary">
									<div className="text-black w-4">{index + 1}</div>
									<input
										type="text"
										className="rounded-lg h-12 w-32 bg-black-900 outline-none pl-2"
										value={recoverList[index]}
										onChange={e => handleInputChange(e.target.value, index)}
										onPaste={index === 0 ? handlePaste : undefined}
									/>
								</div>
							))}
						</div>
					</div>
				</div>

				<button
					className={`w-full bg-primary-400 rounded-md py-[.4rem] group disabled:bg-black-300 ${isSubmitting && "animate-pulse"}`}
					type="submit"
					disabled={isDisabled || isSubmitting}
				>
					<span className="select-none text-black-900 font-normal text-sm lg:text-base group-disabled:text-secondary">
						{isSubmitting ? "Submitting..." : "Reset Password"}
					</span>
				</button>
			</form>

			{showErrorModal && (
				<div className="fixed right-[2rem] bottom-[2rem] bg-red py-[1rem] px-[1.5rem] rounded-md shadow-lg transition-opacity duration-1000 opacity-100">
					<span>{errorMessage}</span>
				</div>
			)}
		</>
	);
}
