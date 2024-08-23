import { z } from "zod";

const categorySchema = z.object({
	title: z.string().min(4, { message: "Min 4 chars" }).max(254, { message: "Invalid title" }),
	description: z.string(),
});

export default categorySchema;
