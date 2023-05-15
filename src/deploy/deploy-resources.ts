import dotenv from "dotenv";
import { compile, packForDeployment } from "./compile.js";
import { createFunction, updateFunction } from "./functions.js";
import { functionNameFromPath, getFunctionPaths } from "./utils.js";
import { waitUntilFunctionCreateComplete } from "@stedi/sdk-client-functions";
import { functionsClient } from "../clients/functions.js";
import { maxWaitTime } from "../common/constants.js";

const functions = functionsClient();

const createOrUpdateFunction = async (
  functionName: string,
  functionPackage: Uint8Array,
  environmentVariables?: Record<string, string>
) => {
  try {
    await updateFunction(functionName, functionPackage, environmentVariables);
  } catch (e) {
    await createFunction(functionName, functionPackage, environmentVariables);
  }
};

export const deployResources = async (pathMatch?: string) => {
  const functionPaths = getFunctionPaths(pathMatch);

  const FUNCTION_NAMES: string[] = [];
  const promises: Promise<unknown>[] = functionPaths.map(async (fnPath) => {
    const functionName = functionNameFromPath(fnPath);

    console.log(`Deploying ${functionName}`);

    // compiling function code
    const jsPath = await compile(fnPath);
    const code = await packForDeployment(jsPath);

    // deploying functions
    try {
      const functionPackage = new Uint8Array(code);
      const environmentVariables = dotenv.config().parsed ?? {};
      environmentVariables.NODE_OPTIONS = "--enable-source-maps";
      environmentVariables.STEDI_FUNCTION_NAME = functionName;

      await createOrUpdateFunction(
        functionName,
        functionPackage,
        environmentVariables
      );

      await waitUntilFunctionCreateComplete(
        { client: functions, maxWaitTime },
        { functionName }
      );
      FUNCTION_NAMES.push(functionName);

      console.log(`Done ${functionName}`);
    } catch (e: unknown) {
      console.error(
        `Could not update deploy ${functionName}. Error: ${JSON.stringify(
          e,
          null,
          2
        )}`
      );
    }
  });

  console.log("Waiting for function deploys to complete");
  await Promise.all(promises);

  console.log(`Deploy completed at: ${new Date().toLocaleString()}`);
};
