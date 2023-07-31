import { deployResources } from "../deploy/deploy-resources.js";
import { requiredEnvVar } from "../common/environment.js";

export const command = "deploy";

export const desc = "Deploys resources to Stedi";

export const builder = {
  path: {
    default: "",
    describe:
      "deploy a subset of resources by specifying a folder path containing functions to deploy",
  },
};

export const handler = async (argv: { path?: string; }) => {
  requiredEnvVar("STEDI_API_KEY");
  console.log(`Deploying...`);
  await deployResources(argv.path);
};
