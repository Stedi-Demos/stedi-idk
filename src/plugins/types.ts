export interface StediPluginInvocationIdentifiers {
  invocationId: string;
  configurationId: string;
  operationName: string;
  namespace: string;
}

export type StediPluginInvocationEventBase =
  StediPluginInvocationIdentifiers & {
    credentials?: Record<string, unknown>;
    parameters?: Record<string, unknown>;
    state?: Record<string, unknown>;
    input: unknown;
  };

export interface StediPluginInvocationLog {
  level: "INFO" | "WARN" | "ERROR";
  message: string;
  details?: unknown;
  errors?: unknown;
}

export type StediPluginInvocationResult = StediPluginInvocationIdentifiers & {
  status: "SUCCESS" | "ERROR";
  output?: unknown[];
  logs?: StediPluginInvocationLog[];
  state?: Record<string, unknown>;
};
