import {
  StediPluginInvocationIdentifiers,
  StediPluginInvocationResult,
} from "../types.js";

interface FailureResponseParams {
  invocationIds: StediPluginInvocationIdentifiers;
  message: string;
  details?: Record<string, unknown>;
}

export const failureResponse = ({
  invocationIds,
  message,
  details,
}: FailureResponseParams): StediPluginInvocationResult => {
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
