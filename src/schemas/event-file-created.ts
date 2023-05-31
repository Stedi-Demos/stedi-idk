import * as z from "zod";
import { EventHeaderSchema } from "./partial/event-header.js";

export const BucketsFileCreatedEventSchema = EventHeaderSchema.extend({
  source: z.literal("stedi.buckets"),
  "detail-type": z.literal("file.created"),
  detail: z.object({
    version: z.literal("2023-02-13"),
    metadata: z.object({
      processedAt: z.string(),
    }),
    source: z.object({
      type: z.string(),
      bucketName: z.string(),
      key: z.string(),
      size: z.number(),
    }),
  }),
});

export type BucketsFileCreatedEvent = z.infer<
  typeof BucketsFileCreatedEventSchema
>;
