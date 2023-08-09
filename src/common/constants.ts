import { NodeHttpHandler } from "@smithy/node-http-handler";
import { fromAwsCredentialIdentity } from "@stedi/sdk-token-provider-aws-identity";

interface ClientConfig {
  apiKey?: string;
  region: "us";
  maxAttempts: number;
  requestHandler: NodeHttpHandler;
}

const credentials = process.env.STEDI_API_KEY
  ? { apiKey: process.env.STEDI_API_KEY }
  : { token: fromAwsCredentialIdentity() };

export const DEFAULT_SDK_CLIENT_PROPS: ClientConfig = {
  ...credentials,
  region: "us",
  maxAttempts: 5,
  requestHandler: new NodeHttpHandler({
    connectionTimeout: 5_000,
  }),
};

export const maxWaitTime = 600;

export const FUNCTION_TEMPLATES_REPO_URL =
  "https://github.com/Stedi-Demos/function-templates/tree/main/src/functions";
