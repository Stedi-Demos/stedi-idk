import { sdkStreamMixin } from "@smithy/util-stream-node";
import { Readable } from "node:stream";
import { SdkStream } from "@smithy/types";

export const defaultEDIAsJsonExample = { heading: { test: 1 } };

export const mockBucketStreamResponse = (
  input: unknown = defaultEDIAsJsonExample
): SdkStream<Readable> =>
  sdkStreamMixin(
    Readable.from([new TextEncoder().encode(JSON.stringify(input))])
  );
