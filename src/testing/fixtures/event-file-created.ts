import { BucketsFileCreatedEvent } from "../../schemas/event-file-created.js";

export const sampleFileCreatedEvent = (): BucketsFileCreatedEvent => ({
  version: "0",
  id: "xxx-05d4-b198-2fde-7ededc63b103",
  "detail-type": "file.created",
  source: "stedi.buckets",
  region: "us-east-1",
  resources: [],
  time: "2021-11-12T00:00:00Z",
  detail: {
    version: "2023-02-13",
    metadata: {
      processedAt: "2023-03-14T19:19:17.950Z",
    },
    source: {
      type: "bucket",
      bucketName: "xxxxxxx-sftp",
      key: "trading-partner/xxxx/xxxx.edi",
      size: 123,
    },
  },
});
