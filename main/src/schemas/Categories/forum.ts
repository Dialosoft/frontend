import { z } from "zod";

const forumSchema = z.object({
	categoryId: z.string(),
	description: z.string(),
	forumName: z.string().min(4, { message: "Min 4 chars" }).max(254, { message: "Invalid title" }),
	type: z.string(),
});

export default forumSchema;
