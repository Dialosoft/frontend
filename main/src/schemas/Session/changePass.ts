import { z } from "zod";

/* Password validation regexes */
const pUppercaseRegex = /(?=.*[A-Z])/;
const pLowercaseRegex = /(?=.*[a-z])/;
const pNumberRegex = /(?=.*\d)/;
const pSpecialCharRegex = /(?=.*[@$!%*?&.,;#^_~()[\]{}|\\\-+=<>/'":`])/;

const changePassSchema = z
    .object({
        actualPassword: z
            .string()
            .min(8, { message: "Min 8 chars" })
            .max(50, { message: "Max 50 chars" }),
        password: z
            .string()
            .min(8, { message: "Min 8 chars" })
            .max(50, { message: "Max 50 chars" })
            .regex(pUppercaseRegex, { message: "1 uppercase" })
            .regex(pLowercaseRegex, { message: "1 lowercase" })
            .regex(pNumberRegex, { message: "1 number" })
            .regex(pSpecialCharRegex, { message: "1 special char" }),
        confirmPassword: z
            .string()
            .min(8, { message: "Min 8 chars" })
            .max(50, { message: "Max 50 chars" }),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"],
    });

export default changePassSchema;