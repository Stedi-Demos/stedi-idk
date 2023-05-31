import * as z from "zod";
import { EventHeaderSchema } from "./partial/event-header.js";

export const CoreFileDeliveredEventSchema = EventHeaderSchema.extend({
  source: z.literal("stedi.core"),
  "detail-type": z.literal("file.delivered"),
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
    connection: z.object({
      connectionType: z.union([z.literal("BUCKET"), z.literal("SFTP")]),
      connectionId: z.string(),
    }),
    delivery: z.object({
      status: z.literal("DELIVERED"),
      message: z.string(),
      artifactId: z.string(),
    }),
  }),
});

export type CoreFileDeliveredEvent = z.infer<
  typeof CoreFileDeliveredEventSchema
>;
