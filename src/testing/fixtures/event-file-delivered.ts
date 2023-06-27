import { CoreFileDeliveredEvent } from "../../schemas/event-file-delivered.js";

export const sampleFileDeliveredEvent = (): CoreFileDeliveredEvent => ({
  version: "0",
  id: "xxx-05d4-b198-2fde-7ededc63b103",
  "detail-type": "file.delivered",
  source: "stedi.core",
  region: "us-east-1",
  resources: [],
  time: "2021-11-12T00:00:00Z",
  detail: {
    version: "2023-02-13",
    metadata: {
      processedAt: "2023-03-14T19:19:17.950Z",
      fileExecutionId: "1234-4321-1234-4321",
    },
    source: {
      type: "bucket",
      bucketName: "xxxxxxx-sftp",
      key: "trading-partner/xxxx/xxxx.edi",
    },
    connection: {
      connectionType: "BUCKET",
      connectionId: "ff42c152-87c5-4916-848d-e60d47fe0e21",
    },
    delivery: {
      status: "DELIVERED",
      message: "File was delivered to 'some-bucket/path/a-file.edi'",
      artifactId: "c5d6835f-24c4-4bed-8c1b-7e199d6d0f39",
    },
  },
});
