import { FUNCTION_TEMPLATES_REPO_URL } from "../common/constants.js";
import { download } from "../github/download.js";

export const command = "install-template <template-name>";

export const desc = "Installs new template function";

export const builder = {};

export const handler = async (argv: { templateName: string }) => {
  console.log(`Installing template ${argv.templateName}...`);

  await download(
    `${FUNCTION_TEMPLATES_REPO_URL}/${argv.templateName}`,
    `./src/functions/${argv.templateName}`
  );
};
