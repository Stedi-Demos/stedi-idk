import * as z from "zod";
import { EventHeaderSchema } from "./partial/event-header.js";

export const CoreFileProcessedV2EventSchema = EventHeaderSchema.extend({
  source: z.literal("stedi.core"),
  "detail-type": z.literal("file.processed.v2"),
  account: z.string(),
  detail: z.object({
    fileExecutionId: z.string(),
    processedAt: z.string(),
    artifacts: z
      .array(
        z.strictObject({
          artifactType: z.enum([
            "application/edi-x12",
            "application/edifact",
            "application/filepart",
            "application/json",
            "application/xml",
            "application/zip",
            "text/csv",
            "text/psv",
            "text/tsv",
            "UNKNOWN",
          ]),
          usage: z.enum(["input"]),
          sizeBytes: z.number().int(),
          url: z.string(),
        })
      )
      .min(1),
  }),
});

export type CoreFileProcessedV2Event = z.infer<
  typeof CoreFileProcessedV2EventSchema
>;
