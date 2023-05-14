// reexport so mocking so idk projects can reuse directly
export { mockClient } from "aws-sdk-client-mock";

// fixtures used in tests
export * from "./fixtures/event-file-failed.js";
export * from "./fixtures/event-transaction-processed.js";
