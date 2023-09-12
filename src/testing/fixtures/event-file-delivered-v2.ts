import { CoreFileDeliveredV2Event } from "../../schemas/event-file-delivered-v2.js";
import { sampleExecutionResourceUrl } from "./event-file-processed-v2.js";

export const sampleFileDeliveredV2Event = (): CoreFileDeliveredV2Event => ({
  version: "0",
  id: "xxx-05d4-b198-2fde-7ededc63b103",
  "detail-type": "file.delivered.v2",
  source: "stedi.core",
  account: "12345678900",
  region: "us-east-1",
  resources: [],
  time: "2023-08-12T00:00:00Z",
  detail: {
    fileExecutionId: "12d584eb-3a19-42f3-99fa-5526f273d8dc",
    processedAt: "2023-08-12T00:00:00Z",
    artifacts: [
      {
        artifactType: "application/edi-x12",
        usage: "output",
        sizeBytes: 123,
        url: `${sampleExecutionResourceUrl}/output`,
      },
    ],
    connection: {
      connectionType: "REMOTE_FTP",
      connectionId: "ff42c152-87c5-4916-848d-e60d47fe0e21",
    },
    delivery: {
      status: "DELIVERED",
      message: "File was delivered to 'some-bucket/path/a-file.edi'",
      artifactId: "c5d6835f-24c4-4bed-8c1b-7e199d6d0f39",
    },
  },
});
