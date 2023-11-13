import { CoreFileProcessedV2Event } from "../../schemas/event-file-processed-v2.js";
import { samplePartnershipId } from "./event-transaction-processed-v2.js";

export const sampleExecutionResourceUrl =
  "https://core.us.stedi.com/2023-08-01/executions/some-execution-id";

export const sampleFileProcessedV2Event = (): CoreFileProcessedV2Event => ({
  version: "0",
  id: "xxx-05d4-b198-2fde-7ededc63b103",
  "detail-type": "file.processed.v2",
  source: "stedi.core",
  account: "12345678900",
  time: "2023-08-12T00:00:00Z",
  region: "us-east-1",
  resources: [sampleExecutionResourceUrl],
  detail: {
    fileExecutionId: "12d584eb-3a19-42f3-99fa-5526f273d8dc",
    processedAt: "2023-08-12T00:00:00Z",
    partnershipId: samplePartnershipId,
    connectionId: "test-connection",
    artifacts: [
      {
        artifactType: "text/csv",
        usage: "input",
        sizeBytes: 123,
        url: `${sampleExecutionResourceUrl}/input`,
      },
    ],
    source: {
      name: "input-file.edi",
    },
  },
});
