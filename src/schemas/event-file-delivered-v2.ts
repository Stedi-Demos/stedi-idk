import * as z from "zod";
import { EventHeaderSchema } from "./partial/event-header.js";

export const CoreFileDeliveredV2EventSchema = EventHeaderSchema.extend({
  source: z.literal("stedi.core"),
  "detail-type": z.literal("file.delivered.v2"),
  account: z.string(),
  detail: z.object({
    fileExecutionId: z.string(),
    processedAt: z.string(),
    artifacts: z
      .array(
        z.strictObject({
          artifactType: z.literal("application/edi-x12"),
          usage: z.literal("output"),
          sizeBytes: z.number().int(),
          url: z.string(),
        })
      )
      .min(1),
    connection: z.object({
      connectionType: z.enum([
        "AS2",
        "BUCKET",
        "SFTP",
        "STEDI_FTP",
        "REMOTE_FTP",
      ]),
      connectionId: z.string(),
    }),
    delivery: z.object({
      status: z.literal("DELIVERED"),
      message: z.string(),
      artifactId: z.string(),
    }),
  }),
});

export type CoreFileDeliveredV2Event = z.infer<
  typeof CoreFileDeliveredV2EventSchema
>;
