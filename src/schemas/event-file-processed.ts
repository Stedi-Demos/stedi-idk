import * as z from "zod";
import { EventHeaderSchema } from "./partial/event-header.js";

export const CoreFileProcessedEventSchema = EventHeaderSchema.extend({
  source: z.literal("stedi.core"),
  "detail-type": z.literal("file.processed"),
  detail: z.object({
    version: z.literal("2023-02-13"),
    metadata: z.object({
      processedAt: z.string(),
      fileExecutionId: z.string(),
    }),
    source: z.object({
      type: z.string(),
      bucketName: z.string(),
      key: z.string(),
    }),
  }),
});

export type CoreFileProcessedEvent = z.infer<
  typeof CoreFileProcessedEventSchema
>;
