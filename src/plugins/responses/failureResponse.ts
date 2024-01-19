import {
  StediPluginInvocationIdentifiers,
  StediPluginInvocationResult,
} from "../types.js";

export const failureResponse = (
  invocationIds: StediPluginInvocationIdentifiers,
  message: string,
  details?: Record<string, unknown>
): StediPluginInvocationResult => {
  return {
    invocationId: invocationIds.invocationId,
    namespace: invocationIds.namespace,
    operationName: invocationIds.operationName,
    configurationId: invocationIds.configurationId,
    status: "ERROR",
    output: [],
    logs: [
      {
        level: "ERROR",
        message,
        details,
      },
    ],
  };
};
