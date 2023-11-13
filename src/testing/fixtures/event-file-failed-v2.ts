import { CoreFileFailedV2Event } from "../../schemas/event-file-failed-v2.js";
import { sampleExecutionResourceUrl } from "./event-file-processed-v2.js";

export const sampleFileFailedV2Event = (): CoreFileFailedV2Event => ({
  version: "0",
  id: "xxx-05d4-b198-2fde-7ededc63b103",
  "detail-type": "file.failed.v2",
  source: "stedi.core",
  account: "12345678900",
  region: "us-east-1",
  resources: [sampleExecutionResourceUrl],
  time: "2023-08-12T00:00:00Z",
  detail: {
    fileExecutionId: "12d584eb-3a19-42f3-99fa-5526f273d8dc",
    processedAt: "2023-08-12T00:00:00Z",
    direction: "UNKNOWN",
    artifacts: [
      {
        artifactType: "UNKNOWN",
        usage: "input",
        sizeBytes: 123,
        url: `${sampleExecutionResourceUrl}/input`,
      },
    ],
    errors: [
      {
        message: "some message here",
        faultCode: "UNKNOWN_ERROR",
      },
    ],
    source: {
      name: "input-file.edi",
    },
  },
});
