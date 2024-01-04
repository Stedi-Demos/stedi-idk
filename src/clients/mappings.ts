import {
  MappingsClient,
  MappingsClientConfig,
} from "@stedi/sdk-client-mappings";
import { DEFAULT_SDK_CLIENT_PROPS } from "../common/constants.js";

let _mappingsClient: MappingsClient | undefined;

export const mappingsClient = (): MappingsClient => {
  if (_mappingsClient == undefined) {
    const config: MappingsClientConfig = {
      ...DEFAULT_SDK_CLIENT_PROPS,
    };

    if (process.env.USE_PREVIEW !== undefined) {
      config.endpoint =
        "https://mappings.us.preproduction.stedi.com/2021-06-01";
    }

    _mappingsClient = new MappingsClient(config);
  }

  return _mappingsClient;
};
