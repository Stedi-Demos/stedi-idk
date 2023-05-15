import { deployResources } from "../deploy/deploy-resources.js";

export const command = "deploy";

export const desc = "Deploys resources to Stedi";

export const builder = {};

export const handler = async () => {
  console.log(`Deploying...`);
  await deployResources();
};
