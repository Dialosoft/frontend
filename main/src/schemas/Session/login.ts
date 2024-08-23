import { z } from "zod";

/* Password */
const pUppercaseRegex = /(?=.*[A-Z])/;
const pLowercaseRegex = /(?=.*[a-z])/;
const pNumberRegex = /(?=.*\d)/;
const pSpecialCharRegex = /(?=.*[@$!%*?&.,;#^_~()[\]{}|\\\-+=<>/'":`])/;

const loginSchema = z.object({
	UserOrEmail: z.string().min(4, { message: "Min 4 chars" }).max(254, { message: "Invalid username or email" }),
	password: z
		.string()
		.min(8, { message: "Min 8 chars" })
		.max(50, { message: "Max 50 chars" })
		.regex(pUppercaseRegex, { message: "1 uppercase" })
		.regex(pLowercaseRegex, { message: "1 lowercase" })
		.regex(pNumberRegex, { message: "1 number" })
		.regex(pSpecialCharRegex, { message: "1 special char" }),
});

export default loginSchema;
