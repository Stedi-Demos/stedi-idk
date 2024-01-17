import * as z from "zod";

export const EventBaseTransactionV2Schema = z.object({
  direction: z.enum(["INBOUND", "OUTBOUND"]).or(z.string()),
  mode: z.enum(["production", "test", "other"]).or(z.string()),
  fileExecutionId: z.string(),
  transactionId: z.string(),
  processedAt: z.string(),
  partnership: z.object({
    partnershipId: z.string(),
    partnershipType: z.literal("x12").or(z.string()),
    sender: z.object({ profileId: z.string() }),
    receiver: z.object({ profileId: z.string() }),
  }),
  x12: z.object({
    metadata: z.object({
      interchange: z.object({
        acknowledgmentRequestedCode: z.string(),
        controlNumber: z.number().int(),
      }),
      functionalGroup: z.object({
        controlNumber: z.number().int(),
        date: z.string(),
        release: z.string(),
        time: z.string(),
        functionalIdentifierCode: z.string(),
      }),
      transaction: z.object({
        controlNumber: z.string(),
        transactionSetIdentifier: z.string(),
      }),
      sender: z.object({
        applicationCode: z.string(),
        isa: z.object({ qualifier: z.string(), id: z.string() }),
      }),
      receiver: z.object({
        applicationCode: z.string(),
        isa: z.object({ qualifier: z.string(), id: z.string() }),
      }),
    }),
    transactionSetting: z
      .object({
        transactionSettingId: z.string().optional(),
        guideId: z.string().optional(),
      })
      .optional(),
  }),
});
