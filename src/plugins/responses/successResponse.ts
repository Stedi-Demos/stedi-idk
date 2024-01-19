import {
  StediPluginInvocationIdentifiers,
  StediPluginInvocationResult,
} from "../types.js";

export const successResponse = (
  invocationIds: StediPluginInvocationIdentifiers,
  output: unknown[],
  logs: StediPluginInvocationResult["logs"] = []
): StediPluginInvocationResult => {
  return {
    invocationId: invocationIds.invocationId,
    namespace: invocationIds.namespace,
    operationName: invocationIds.operationName,
    configurationId: invocationIds.configurationId,
    status: "SUCCESS",
    logs,
    output,
  };
};
