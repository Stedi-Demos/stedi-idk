import {
  StediPluginInvocationIdentifiers,
  StediPluginInvocationResult,
} from "../types.js";

interface SuccessResponseParams {
  invocationIds: StediPluginInvocationIdentifiers;
  output?: unknown[];
  state?: Record<string, unknown>;
  logs?: StediPluginInvocationResult["logs"];
}

export const successResponse = ({
  invocationIds,
  output,
  state,
  logs = [],
}: SuccessResponseParams): StediPluginInvocationResult => {
  return {
    invocationId: invocationIds.invocationId,
    namespace: invocationIds.namespace,
    operationName: invocationIds.operationName,
    configurationId: invocationIds.configurationId,
    status: "SUCCESS",
    state,
    logs,
    output,
  };
};
