import { credsClient } from "../clients/credentials.js";
import { GetAwsAccessCommand } from "@stedi/sdk-client-exchange-credentials";

export const resolveAccountId = async (): Promise<string> => {
  const response = await credsClient().send(new GetAwsAccessCommand({}));
  if (response.webIdentityToken === undefined)
    throw new Error("failure trying to authenticate");

  const base64Payload = response.webIdentityToken.split(".")[1];
  if (base64Payload === undefined)
    throw new Error("failure trying to authenticate");

  const payload = Buffer.from(base64Payload, "base64");
  const decodedJWT = JSON.parse(payload.toString()) as Record<string, string>;

  const accountId = decodedJWT["stedi:accountId"];
  if (accountId === undefined)
    throw new Error("failure trying to determine Stedi account id");

  return accountId;
};
