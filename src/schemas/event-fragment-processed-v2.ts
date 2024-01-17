import * as z from "zod";
import { EventHeaderSchema } from "./partial/event-header.js";
import { EventBaseTransactionV2Schema } from "./partial/event-base-transaction-v2.js";

export const CoreFragmentV2Schema = EventBaseTransactionV2Schema.extend({
  fragmentIndex: z.number(),
  artifacts: z
    .array(
      z.object({
        artifactType: z.literal("application/json").or(z.string()),
        usage: z.literal("output").or(z.string()),
        sizeBytes: z.number().int(),
        url: z.string(),
        model: z.literal("fragment").or(z.string()),
      })
    )
    .length(1),
  fragments: z.object({
    batchSize: z.number(),
    fragmentCount: z.number(),
    keyName: z.string(),
  }),
});

export const CoreFragmentProcessedV2EventSchema = EventHeaderSchema.extend({
  source: z.literal("stedi.core"),
  "detail-type": z.literal("fragment.processed.v2"),
  account: z.string(),
  detail: CoreFragmentV2Schema,
});

export type CoreFragmentProcessedV2Event = z.infer<
  typeof CoreFragmentProcessedV2EventSchema
>;
