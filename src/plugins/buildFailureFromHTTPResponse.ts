import { Response } from "node-fetch";
import {
  StediPluginInvocationEventBase,
  StediPluginInvocationLog,
  StediPluginInvocationResult,
} from "@stedi/integrations-sdk/plugins";

export const buildFailureFromHTTPResponse = async (
  invocationIds: StediPluginInvocationEventBase,
  response: Response,
  logs: StediPluginInvocationLog[] = []
): Promise<StediPluginInvocationResult> => {
  logs.push({
    level: "ERROR",
    message: "API returned a non-200 response.",
    details: {
      status: response.status,
      statusText: response.statusText,
      body: response.headers.get("content-type")?.includes("json")
        ? await response.json()
        : await response.text(),
    },
  });
  return {
    invocationId: invocationIds.invocationId,
    namespace: invocationIds.namespace,
    operationName: invocationIds.operationName,
    configurationId: invocationIds.configurationId,
    status: "ERROR",
    output: [],
    logs,
  };
};
