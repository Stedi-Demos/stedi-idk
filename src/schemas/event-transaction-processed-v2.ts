import * as z from "zod";
import { EventHeaderSchema } from "./partial/event-header.js";
import { EventBaseTransactionV2Schema } from "./partial/event-base-transaction-v2.js";

export const CoreTransactionV2Schema = EventBaseTransactionV2Schema.extend({
  artifacts: z
    .array(
      z.strictObject({
        artifactType: z.enum(["application/edi-x12", "application/json"]),
        usage: z.enum(["input", "output"]),
        model: z.literal("transaction").optional(),
        sizeBytes: z.number().int(),
        url: z.string(),
      })
    )
    .min(2),
  fragments: z
    .strictObject({
      batchSize: z.number(),
      fragmentCount: z.number(),
      keyName: z.string(),
    })
    .nullish(),
});

export const CoreTransactionProcessedV2EventSchema = EventHeaderSchema.extend({
  source: z.literal("stedi.core"),
  "detail-type": z.literal("transaction.processed.v2"),
  account: z.string(),
  detail: CoreTransactionV2Schema,
});

export type CoreTransactionProcessedV2Event = z.infer<
  typeof CoreTransactionProcessedV2EventSchema
>;
