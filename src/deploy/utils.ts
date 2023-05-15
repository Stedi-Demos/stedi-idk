import fs from "fs";
import dotenv from "dotenv";

const DEFAULT_DOT_ENV_FILE_PATH = "./.env";

interface ResourceFile {
  basePath: string;
  fileName?: string;
}

export interface ResourceDetails {
  name: string;
  id: string;
}

// TODO: replace this with dynamic directory listing
export const getEnabledTransactionSets = (): string[] => [
  "X12-5010-850",
  "X12-5010-855",
];

export const functionNameFromPath = (fnPath: string): string => {
  // get function name excluding extension
  // path-a/path-b/path-never-ends/nice/function/handler.ts
  // => nice-function
  const functionName = fnPath.split("/").slice(-3, -1).join("-");

  // path-a/functions/my-func/handler.ts
  // => my-func
  if (functionName.startsWith("functions-")) return functionName.slice(10);

  return functionName;
};

export const getFunctionPaths = (pathMatch?: string) => {
  const functionsRoot = "./src/functions";
  const namespaces = fs.readdirSync(functionsRoot);

  const allFunctionPaths = namespaces.reduce((paths: string[], namespace) => {
    if (fs.lstatSync(`${functionsRoot}/${namespace}`).isFile()) return paths;

    return paths.concat(
      getAssetPaths({
        basePath: `${functionsRoot}/${namespace}`,
        fileName: "handler.ts",
      })
    );
  }, []);

  return filterPaths(allFunctionPaths, pathMatch);
};

// generic asset path retrieval (internal helper used for getting function
// paths as well as resource paths for transaction sets
const getAssetPaths = (resourceFile: Required<ResourceFile>): string[] => {
  const assets = fs.readdirSync(resourceFile.basePath);

  return assets.reduce((collectedAssets: string[], assetName) => {
    // root functions
    if (assetName === resourceFile.fileName)
      return [`${resourceFile.basePath}/${assetName}`];

    // namespaced functions
    if (
      fs.lstatSync(`${resourceFile.basePath}/${assetName}`).isFile() ||
      !fs.existsSync(
        `${resourceFile.basePath}/${assetName}/${resourceFile.fileName}`
      )
    ) {
      return collectedAssets;
    }

    return collectedAssets.concat(
      `${resourceFile.basePath}/${assetName}/${resourceFile.fileName}`
    );
  }, []);
};

// helper function to filter out paths that don't include the `pathMatch` string, and to check for `no match`
const filterPaths = (paths: string[], pathMatch?: string): string[] => {
  if (pathMatch) paths = paths.filter((path) => path.includes(`/${pathMatch}`));

  return paths;
};

export const updateDotEnvFile = (envVars: dotenv.DotenvParseOutput) => {
  const envVarEntries = Object.entries(envVars).reduce(
    (fileContents: string, [key, value]) => {
      return fileContents.concat(`${key}=${value}\n`);
    },
    ""
  );

  fs.writeFileSync(DEFAULT_DOT_ENV_FILE_PATH, envVarEntries);
};
