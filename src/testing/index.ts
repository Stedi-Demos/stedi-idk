// reexport so mocking so idk projects can reuse directly
export { mockClient } from "aws-sdk-client-mock";

// jwt-encoded representation of: `{ "id_token": "test-token" }`
export const testJwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF90b2tlbiI6InRlc3QtdG9rZW4ifQ.dvGf0OC2P2j7hB4gFqwyqmUJ1SJSpOzsPwIrNzDAy8E";

// fixtures used in tests
export * from "./fixtures/event-transaction-processed.js";
export * from "./fixtures/event-transaction-processed-v2.js";
export * from "./fixtures/event-functional-group-processed.js";
export * from "./fixtures/event-file-processed.js";
export * from "./fixtures/event-file-processed-v2.js";
export * from "./fixtures/event-fragment-processed-v2.js";
export * from "./fixtures/event-file-failed.js";
export * from "./fixtures/event-file-failed-v2.js";
export * from "./fixtures/event-file-delivered.js";
export * from "./fixtures/event-file-delivered-v2.js";
export * from "./fixtures/event-file-created.js";
export * from "./fixtures/mock-bucket-stream-response.js";
