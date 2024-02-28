import { failureResponse } from "./index.js";
import {
  StediPluginInvocationEventBase,
  StediPluginInvocationResult,
} from "./types.js";

type PluginFunction<T extends StediPluginInvocationEventBase> = (
  event: T
) => Promise<StediPluginInvocationResult>;

export const pluginOperation =
  <T extends StediPluginInvocationEventBase>(
    func: PluginFunction<T>
  ): PluginFunction<T> =>
  async (event: T) => {
    try {
      // we await here, so we can catch any unmanaged exceptions
      return await func(event);
    } catch (error) {
      const details: Record<string, unknown> = {
        exceptionMessage: "Unknown error.",
      };
      if (error instanceof Error) {
        details.exceptionMessage = error.message;
        details.exceptionStack = error.stack;
      }

      return failureResponse({
        invocationIds: event,
        message: "Unmanaged exception returned from plugin function.",
        details,
      });
    }
  };
