import {
  ExchangeCredentialsClient,
  ExchangeCredentialsClientConfig,
} from "@stedi/sdk-client-exchange-credentials";
import { DEFAULT_SDK_CLIENT_PROPS } from "../common/constants.js";

let _credsClient: ExchangeCredentialsClient | undefined;

export const credsClient = () => {
  if (_credsClient === undefined) {
    const config: ExchangeCredentialsClientConfig = {
      ...DEFAULT_SDK_CLIENT_PROPS,
    };

    if (process.env.USE_PREVIEW !== undefined) {
      config.stage = "preproduction";
    }

    _credsClient = new ExchangeCredentialsClient(config);
  }

  return _credsClient;
};
