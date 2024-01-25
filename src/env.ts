import { z } from "zod";

const envSchema = z.object({
	CLIENT_ID: z.string().min(1),
	CLIENT_SECRET: z.string().min(1),
	REDIRECT_URL: z.string().url(),
	DATABASE_URL: z.string().min(1),
});

export const env = envSchema.parse(process.env);
