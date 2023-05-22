import { DocumentType } from "@aws-sdk/types";
import { PutObjectCommand } from "@stedi/sdk-client-buckets";
import {
  CreateFunctionCommand,
  CreateFunctionCommandOutput,
  DeleteFunctionCommand,
  DeleteFunctionCommandOutput,
  UpdateFunctionCommand,
  UpdateFunctionCommandOutput,
} from "@stedi/sdk-client-functions";
import { bucketsClient } from "../clients/buckets.js";
import { functionsClient } from "../clients/functions.js";
import {
  CreateEventToFunctionBindingCommand,
  UpdateEventToFunctionBindingCommand,
} from "@stedi/sdk-client-events";
import { eventsClient } from "../clients/events.js";

const sharedPackageBucketName =
  process.env.USE_PREVIEW === undefined
    ? "cloud-service-prod-cloudassetscb762b94-1s0pscijv42io"
    : "cloud-service-preprod-cloudassetscb762b94-1ow5rqgquejoh";

const functions = functionsClient();
const buckets = bucketsClient();
const events = eventsClient();

const buildBucketKey = (functionName: string, stediAccountId: string): string =>
  `deployments/${stediAccountId}/${functionName}-${new Date()
    .getTime()
    .toString()}.zip`;

export const createFunction = async (
  functionName: string,
  functionPackage: Uint8Array,
  stediAccountId: string,
  environmentVariables?: Record<string, string>
): Promise<CreateFunctionCommandOutput> => {
  const key = buildBucketKey(functionName, stediAccountId);

  await buckets.send(
    new PutObjectCommand({
      bucketName: sharedPackageBucketName,
      key,
      body: functionPackage,
    })
  );

  return functions.send(
    new CreateFunctionCommand({
      functionName,
      packageBucket: sharedPackageBucketName,
      packageKey: key,
      environmentVariables,
      timeout: 900,
    })
  );
};

export const updateFunction = async (
  functionName: string,
  functionPackage: Uint8Array,
  stediAccountId: string,
  environmentVariables?: Record<string, string>
): Promise<UpdateFunctionCommandOutput> => {
  const key = buildBucketKey(functionName, stediAccountId);

  await buckets.send(
    new PutObjectCommand({
      bucketName: sharedPackageBucketName,
      key,
      body: functionPackage,
    })
  );

  return functions.send(
    new UpdateFunctionCommand({
      functionName,
      packageBucket: sharedPackageBucketName,
      packageKey: key,
      environmentVariables,
      timeout: 900,
    })
  );
};

export const deleteFunction = async (
  functionName: string
): Promise<DeleteFunctionCommandOutput> => {
  return functions.send(
    new DeleteFunctionCommand({
      functionName,
    })
  );
};

export const createFunctionEventBinding = async (
  functionName: string,
  eventPattern: DocumentType,
  eventToFunctionBindingName: string
) => {
  return events.send(
    new CreateEventToFunctionBindingCommand({
      eventPattern,
      functionName,
      eventToFunctionBindingName,
    })
  );
};

export const updateFunctionEventBinding = async (
  functionName: string,
  eventPattern: DocumentType,
  eventToFunctionBindingName: string
) => {
  return events.send(
    new UpdateEventToFunctionBindingCommand({
      eventPattern,
      functionName,
      eventToFunctionBindingName,
    })
  );
};
