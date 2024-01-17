import * as z from "zod";
import { EventHeaderSchema } from "./partial/event-header.js";

export const CoreFileFailedV2EventSchema = EventHeaderSchema.extend({
  source: z.literal("stedi.core"),
  "detail-type": z.literal("file.failed.v2"),
  account: z.string(),
  detail: z.object({
    fileExecutionId: z.string(),
    processedAt: z.string(),
    direction: z.enum(["INBOUND", "OUTBOUND", "UNKNOWN"]).or(z.string()),
    artifacts: z
      .array(
        z.object({
          artifactType: z
            .enum([
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
            ])
            .or(z.string()),
          usage: z.enum(["input"]).or(z.string()),
          sizeBytes: z.number().int(),
          url: z.string(),
        })
      )
      .min(1),
    errors: z.array(
      z.object({
        message: z.string(),
        faultCode: z.string(),
      })
    ),
    source: z.object({
      name: z.string(),
    }),
  }),
});

export type CoreFileFailedV2Event = z.infer<typeof CoreFileFailedV2EventSchema>;
