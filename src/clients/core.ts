import { CoreClient, CoreClientConfig } from "@stedi/sdk-client-core";

import { DEFAULT_SDK_CLIENT_PROPS } from "../common/constants.js";

let _coreClient: CoreClient | undefined;

export const coreClient = () => {
  if (_coreClient === undefined) {
    const config: CoreClientConfig = {
      ...DEFAULT_SDK_CLIENT_PROPS,
    };

    if (process.env.USE_PREVIEW !== undefined) {
      config.stage = "preproduction";
    }

    _coreClient = new CoreClient(config);
  }

  return _coreClient;
};
