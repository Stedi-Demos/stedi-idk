import { QueuesClient, QueuesClientConfig } from "@stedi/sdk-client-queues";

import { DEFAULT_SDK_CLIENT_PROPS } from "../common/constants.js";

let _queuesClient: QueuesClient | undefined;

export const queuesClient = (): QueuesClient => {
  if (_queuesClient === undefined) {
    const config: QueuesClientConfig = {
      ...DEFAULT_SDK_CLIENT_PROPS,
    };

    if (process.env.USE_PREVIEW !== undefined) {
      config.stage = "preproduction";
    }

    _queuesClient = new QueuesClient(config);
  }

  return _queuesClient;
};
