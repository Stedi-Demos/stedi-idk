import dotenv from "dotenv";
import { compile, packForDeployment } from "./compile.js";
import { createFunction, updateFunction } from "./functions.js";
import {
  splitFunctionNameAndPath,
  getFunctionPaths,
  getPackageJSON,
} from "./utils.js";
import { waitUntilFunctionCreateComplete } from "@stedi/sdk-client-functions";

import { functionsClient } from "../clients/functions.js";
import { maxWaitTime } from "../common/constants.js";
import { requiredEnvVar } from "../common/environment.js";
import { resolveAccountId } from "../common/resolve-account-id.js";

const createOrUpdateFunction = async (
  functionName: string,
  functionPackage: Uint8Array,
  stediAccountId: string,
  environmentVariables?: Record<string, string>
) => {
  try {
    await updateFunction(
      functionName,
      functionPackage,
      stediAccountId,
      environmentVariables
    );
  } catch (error) {
    if (
      typeof error === "object" &&
      error !== null &&
      "name" in error &&
      error.name === "ResourceNotFoundException"
    )
      await createFunction(
        functionName,
        functionPackage,
        stediAccountId,
        environmentVariables
      );
    else throw error;
  }
};

export const deployResources = async (pathMatch?: string) => {
  const stediApiKey = requiredEnvVar("STEDI_API_KEY");
  if (stediApiKey === "<YOUR_STEDI_API_KEY_HERE>") {
    console.log(
      `Failed: You must first set the STEDI_API_KEY environment variable in the .env file.
 
You can generate a new API key here: https://www.stedi.com/app/settings/api-keys`
    );
    process.exit(1);
  }
  const stediAccountId = await resolveAccountId();
  const functionPaths = getFunctionPaths(pathMatch);

  const promises: Promise<unknown>[] = functionPaths.map(async (fnPath) => {
    const { functionPath, functionName } = splitFunctionNaneAndPath(fnPath);

    console.log(`Deploying ${functionName}`);

    // check if the function has a package.json
    const packageJSON = getPackageJSON(functionPath);
    // exclude any dependencies as they will be bundled into zip separately
    const externals =
      packageJSON !== undefined ? Object.keys(packageJSON.dependencies) : [];

    // compiling function code
    const jsPath = await compile(fnPath, externals, false);

    const code = await packForDeployment(jsPath, packageJSON);

    // deploying functions
    try {
      const functionPackage = new Uint8Array(code);
      const environmentVariables = dotenv.config().parsed ?? {};
      environmentVariables.NODE_OPTIONS = "--enable-source-maps";
      environmentVariables.STEDI_FUNCTION_NAME = functionName;

      // The API key is not needed when running in the context of a Stedi function
      delete environmentVariables.STEDI_API_KEY;

      await createOrUpdateFunction(
        functionName,
        functionPackage,
        stediAccountId,
        environmentVariables
      );

      await waitUntilFunctionCreateComplete(
        { client: functionsClient(), maxWaitTime },
        { functionName }
      );

      console.log(`Done ${functionName}`);
    } catch (e: unknown) {
      console.error(e);
    }
  });

  console.log("Waiting for function deploys to complete");
  await Promise.all(promises);

  console.log(`Deploy completed at: ${new Date().toLocaleString()}`);
};
