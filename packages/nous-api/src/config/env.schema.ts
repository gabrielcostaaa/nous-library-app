import { z } from "zod";

export const envSchema = z.object({
  DATABASE_URL: z.url(),
  JWT_SECRET: z.string(),
  JWT_PRIVATE_KEY: z.string().optional(),
  JWT_PUBLIC_KEY: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(config: Record<string, unknown>) {
  const result = envSchema.safeParse(config);
  if (!result.success) {
    console.error("❌ Invalid environment variables:", result.error.format());
    throw new Error("Invalid environment configuration");
  }
  return result.data;
}
