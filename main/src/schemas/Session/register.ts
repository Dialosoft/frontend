import { z } from "zod";

/* Username */
const usernameRegex = /^[a-zA-Z0-9]+$/;

/* Password */
const pUppercaseRegex = /(?=.*[A-Z])/;
const pLowercaseRegex = /(?=.*[a-z])/;
const pNumberRegex = /(?=.*\d)/;
const pSpecialCharRegex = /(?=.*[@$!%*?&.,;#^_~()[\]{}|\\\-+=<>/'":`])/;

const registerSchema = z
	.object({
		username: z.string().min(4, { message: "Min 4 chars" }).max(20, { message: "Max 20 chars" }).regex(usernameRegex, { message: "Letters & numbers only" }),
		email: z.string().email({ message: "Invalid email" }).max(254, { message: "Invalid email" }),
		password: z
			.string()
			.min(8, { message: "Min 8 chars" })
			.max(50, { message: "Max 50 chars" })
			.regex(pUppercaseRegex, { message: "1 uppercase" })
			.regex(pLowercaseRegex, { message: "1 lowercase" })
			.regex(pNumberRegex, { message: "1 number" })
			.regex(pSpecialCharRegex, { message: "1 special char" }),
		confirmPassword: z.string().min(8, { message: "Min 8 chars" }).max(50, { message: "Max 50 chars" }),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: "Passwords must match",
		path: ["confirmPassword"],
	});

export default registerSchema;
