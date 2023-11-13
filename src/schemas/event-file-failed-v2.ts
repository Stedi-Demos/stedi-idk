import * as z from "zod";
import { EventHeaderSchema } from "./partial/event-header.js";

export const CoreFileFailedV2EventSchema = EventHeaderSchema.extend({
  source: z.literal("stedi.core"),
  "detail-type": z.literal("file.failed.v2"),
  account: z.string(),
  detail: z.object({
    fileExecutionId: z.string(),
    processedAt: z.string(),
    direction: z.enum(["INBOUND", "OUTBOUND", "UNKNOWN"]),
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
    errors: z.array(
      z.strictObject({
        message: z.string(),
        faultCode: z.string(),
      })
    ),
    source: z.strictObject({
      name: z.string(),
    }),
  }),
});

export type CoreFileFailedV2Event = z.infer<typeof CoreFileFailedV2EventSchema>;
