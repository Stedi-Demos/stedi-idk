import {
  PartnersClient,
  PartnersClientConfig,
} from "@stedi/sdk-client-partners";
import { DEFAULT_SDK_CLIENT_PROPS } from "../common/constants.js";

let _partnersClient: PartnersClient | undefined;

export const partnersClient = () => {
  if (_partnersClient === undefined) {
    const config: PartnersClientConfig = {
      ...DEFAULT_SDK_CLIENT_PROPS,
      endpoint: "https://core.us.stedi.com/2023-08-01",
    };

    if (process.env.USE_PREVIEW !== undefined) {
      config.endpoint = "https://core.us.preproduction.stedi.com/2023-08-01";
    }

    _partnersClient = new PartnersClient(config);
  }

  return _partnersClient;
};
