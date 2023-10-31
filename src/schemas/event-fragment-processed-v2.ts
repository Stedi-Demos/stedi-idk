import * as z from "zod";
import { EventHeaderSchema } from "./partial/event-header.js";

export const CoreFragmentProcessedV2EventSchema = EventHeaderSchema.extend({
  source: z.literal("stedi.core"),
  "detail-type": z.literal("fragment.processed.v2"),
  account: z.string(),
  detail: z.strictObject({
    direction: z.literal("INBOUND"),
    mode: z.enum(["production", "test", "other"]),
    fileExecutionId: z.string(),
    transactionId: z.string(),
    processedAt: z.string(),
    fragments: z.strictObject({
      batchSize: z.number(),
      fragmentCount: z.number(),
      keyName: z.string(),
    }),
    fragmentIndex: z.number(),
    artifacts: z
      .array(
        z.strictObject({
          artifactType: z.literal("application/json"),
          usage: z.literal("output"),
          sizeBytes: z.number().int(),
          url: z.string(),
          model: z.literal("fragment"),
        })
      )
      .min(2),
    partnership: z.strictObject({
      partnershipId: z.string(),
      partnershipType: z.literal("x12"),
      sender: z.strictObject({ profileId: z.string() }),
      receiver: z.strictObject({ profileId: z.string() }),
    }),
    x12: z.strictObject({
      metadata: z.strictObject({
        interchange: z.strictObject({
          acknowledgmentRequestedCode: z.string(),
          controlNumber: z.number().int(),
        }),
        functionalGroup: z.strictObject({
          controlNumber: z.number().int(),
          date: z.string(),
          release: z.string(),
          time: z.string(),
          functionalIdentifierCode: z.string(),
        }),
        transaction: z.strictObject({
          controlNumber: z.string(),
          transactionSetIdentifier: z.string(),
        }),
        sender: z.strictObject({
          applicationCode: z.string(),
          isa: z.strictObject({ qualifier: z.string(), id: z.string() }),
        }),
        receiver: z.strictObject({
          applicationCode: z.string(),
          isa: z.strictObject({ qualifier: z.string(), id: z.string() }),
        }),
      }),
      transactionSetting: z
        .strictObject({
          transactionSettingId: z.string(),
          guideId: z.string().optional(),
        })
        .optional(),
    }),
  }),
});

export type CoreFragmentProcessedV2Event = z.infer<
  typeof CoreFragmentProcessedV2EventSchema
>;
