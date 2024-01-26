import { Response } from "node-fetch";
import {
  StediPluginInvocationEventBase,
  failureResponse,
} from "@stedi/integrations-sdk/plugins";

export const buildFailureFromHTTPResponse = async (
  invocationIds: StediPluginInvocationEventBase,
  response: Response
) => {
  return failureResponse({
    invocationIds,
    message: "API returned a non-200 response.",
    details: {
      status: response.status,
      statusText: response.statusText,
      body: response.headers.get("content-type")?.includes("json")
        ? await response.json()
        : await response.text(),
    },
  });
};
