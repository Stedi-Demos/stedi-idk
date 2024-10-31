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
    partnership: z
      .object({
        partnershipId: z.string(),
        partnershipType: z.literal("x12").or(z.string()),
        sender: z.object({ profileId: z.string() }),
        receiver: z.object({ profileId: z.string() }),
      })
      .optional(),
    errors: z.array(
      z.object({
        message: z.string(),
        faultCode: z.string(),
      })
    ),
    source: z.object({
      name: z.string(),
    }),
    x12: z
      .object({
        metadata: z.object({
          interchange: z.object({
            acknowledgmentRequestedCode: z.string(),
            controlNumber: z.number().int(),
          }),
          sender: z.object({
            isa: z.object({ qualifier: z.string(), id: z.string() }),
          }),
          receiver: z.object({
            isa: z.object({ qualifier: z.string(), id: z.string() }),
          }),
        }),
      })
      .optional(),
  }),
});

export type CoreFileFailedV2Event = z.infer<typeof CoreFileFailedV2EventSchema>;
