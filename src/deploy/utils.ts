import fs from "fs";
import path from "path";

interface ResourceFile {
  basePath: string;
  fileName?: string;
}

interface SimplePackageJSON {
  dependencies: Record<string, string>;
}

export const getPackageJSON = (
  pathName: string
): undefined | SimplePackageJSON => {
  const packagePath = path.join(pathName, "package.json");

  if (fs.existsSync(packagePath)) {
    return JSON.parse(
      fs.readFileSync(packagePath, "utf-8")
    ) as SimplePackageJSON;
  }

  return undefined;
};

export const splitFunctionNameAndPath = (
  fnPath: string
): { functionPath: string; functionName: string } => {
  // get function name excluding extension
  // path-a/path-b/path-never-ends/nice/function/handler.ts
  // => nice-function
  const pathParts = fnPath.split(path.sep);
  let functionName = pathParts.slice(-3, -1).join("-");

  // path-a/functions/my-func/handler.ts
  // => my-func
  if (functionName.startsWith("functions-"))
    functionName = functionName.slice(10);

  const functionPath = pathParts.slice(0, -1).join(path.sep);

  return { functionPath, functionName };
};

export const getFunctionPaths = (pathMatch?: string) => {
  const functionsRoot = `.${path.sep}src${path.sep}functions`;
  const namespaces = fs.readdirSync(functionsRoot);

  const allFunctionPaths = namespaces.reduce((paths: string[], namespace) => {
    if (fs.lstatSync(`${functionsRoot}${path.sep}${namespace}`).isFile()) {
      return paths;
    }

    return paths.concat(
      getAssetPaths({
        basePath: `${functionsRoot}${path.sep}${namespace}`,
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
      return [`${resourceFile.basePath}${path.sep}${assetName}`];

    // namespaced functions
    if (
      fs
        .lstatSync(`${resourceFile.basePath}${path.sep}${assetName}`)
        .isFile() ||
      !fs.existsSync(
        `${resourceFile.basePath}${path.sep}${assetName}${path.sep}${resourceFile.fileName}`
      )
    ) {
      return collectedAssets;
    }

    return collectedAssets.concat(
      `${resourceFile.basePath}${path.sep}${assetName}${path.sep}${resourceFile.fileName}`
    );
  }, []);
};

// helper function to filter out paths that don't include the `pathMatch` string, and to check for `no match`
const filterPaths = (paths: string[], pathMatch?: string): string[] => {
  if (pathMatch) {
    paths = paths.filter((p) => p.includes(`${path.sep}${pathMatch}`));
  }

  return paths;
};
