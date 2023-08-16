import dotenv from "dotenv";

dotenv.config({ override: true, path: process.env.DOTENV_CONFIG_PATH });

export const requiredEnvVar = (key: string): string => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};
