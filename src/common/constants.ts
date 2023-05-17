import { NodeHttpHandler } from "@aws-sdk/node-http-handler";
import { requiredEnvVar } from "./environment.js";

export const DEFAULT_SDK_CLIENT_PROPS = {
  apiKey: requiredEnvVar("STEDI_API_KEY"),
  region: "us",
  maxAttempts: 5,
  requestHandler: new NodeHttpHandler({
    connectionTimeout: 5_000,
  }),
};

export const maxWaitTime = 600;

export const FUNCTION_TEMPLATES_REPO_URL =
  "https://github.com/Stedi-Demos/function-templates/tree/idk/src/functions";
