import { FUNCTION_TEMPLATES_REPO_URL } from "../common/constants.js";
import { download } from "../github/download.js";
import fs from "node:fs";
import path from "node:path";

export const command =
  "install-template <template-name> [local-function-name] [namespace]";

export const desc = "Installs new template function";

export const builder = {};

export const handler = async (argv: {
  templateName: string;
  localFunctionName?: string;
  namespace?: string;
}) => {
  const targetPath = path.resolve(
    path.join(
      "src",
      "functions",
      argv.namespace ?? "",
      argv.localFunctionName ?? argv.templateName
    )
  );

  if (fs.existsSync(targetPath)) {
    console.error(
      `Cannot continue as template already exists in the specified path, you must supply an alternate function name if you want to download a second copy of this template: \n
Path '${targetPath}' already exists. \n`
    );

    process.exit(1);
  }

  console.log(
    `Installing template '${argv.templateName}'
  from: '${FUNCTION_TEMPLATES_REPO_URL}/${argv.templateName}'
  to  : '${targetPath}'
`
  );

  await download(
    `${FUNCTION_TEMPLATES_REPO_URL}/${argv.templateName}`,
    targetPath
  );
};
