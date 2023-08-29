// reexport so mocking so idk projects can reuse directly
export { mockClient } from "aws-sdk-client-mock";

// fixtures used in tests
export * from "./fixtures/event-transaction-processed.js";
export * from "./fixtures/event-transaction-processed-v2.js";
export * from "./fixtures/event-functional-group-processed.js";
export * from "./fixtures/event-file-processed.js";
export * from "./fixtures/event-file-failed.js";
export * from "./fixtures/event-file-delivered.js";
export * from "./fixtures/event-file-created.js";
export * from "./fixtures/mock-bucket-stream-response.js";
