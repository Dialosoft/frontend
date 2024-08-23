import { z } from "zod";

/* Username */
const usernameRegex = /^[a-zA-Z0-9]+$/;

/* Seeds */
const seedRegex = /^[a-zA-Z0-9\s]+$/;

const resetPasswordSchema = z.object({
	username: z.string().min(1, { message: "Required" }).max(20, { message: "Max 20 chars" }).regex(usernameRegex, { message: "Letters & numbers only" }),
	seeds: z
		.string()
		.min(1, { message: "Required" })
		.regex(seedRegex, { message: "Letters & numbers only" })
		.refine(value => value.trim().split(/\s+/).length === 12, { message: "Exactly 12 words" }),
});

export default resetPasswordSchema;
