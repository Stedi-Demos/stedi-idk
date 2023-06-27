import { CoreFileProcessedEvent } from "../../schemas/event-file-processed.js";

export const sampleFileProcessedEvent = (): CoreFileProcessedEvent => ({
  version: "0",
  id: "xxx-05d4-b198-2fde-7ededc63b103",
  "detail-type": "file.processed",
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
      type: "CSV",
      bucketName: "test-bucket",
      key: "123ABC/1746-1746-1.txt",
    },
  },
});
