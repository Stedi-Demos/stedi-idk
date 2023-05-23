import * as z from "zod";
import { EventInterchangeSchema } from "./partial/event-interchange.js";
import { EventPartnershipSchema } from "./partial/event-partnership.js";
import { EventFunctionalGroupSchema } from "./partial/event-functional-group.js";
import { EventHeaderSchema } from "./partial/event-header.js";

export const UsageIndicatorCodeSchema = z.enum(["P", "T", "I"]);
export type UsageIndicatorCode = z.infer<typeof UsageIndicatorCodeSchema>;

export const CoreTransactionProcessedEventSchema = EventHeaderSchema.extend({
  source: z.literal("stedi.core"),
  "detail-type": z.literal("transaction.processed"),
  detail: z.object({
    version: z.literal("2023-02-13"),
    direction: z.literal("SENT").or(z.literal("RECEIVED")),
    envelopes: z.object({
      interchange: EventInterchangeSchema,
      functionalGroup: EventFunctionalGroupSchema,
    }),
    transaction: z.object({
      controlNumber: z.number(),
      id: z.string(),
      transactionSetIdentifier: z.string(),
      guideId: z.string().optional(),
    }),
    metadata: z.object({
      processedAt: z.string(),
    }),
    input: z.object({
      type: z.string(),
      bucketName: z.string(),
      key: z.string(),
    }),
    output: z.object({
      type: z.string(),
      bucketName: z.string(),
      key: z.string(),
    }),
    partnership: EventPartnershipSchema,
  }),
});

export type CoreTransactionProcessedEvent = z.infer<
  typeof CoreTransactionProcessedEventSchema
>;
