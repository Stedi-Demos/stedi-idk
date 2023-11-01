import * as z from "zod";

export const EventBaseTransactionV2Schema = z.strictObject({
  direction: z.enum(["INBOUND", "OUTBOUND"]),
  mode: z.enum(["production", "test", "other"]),
  fileExecutionId: z.string(),
  transactionId: z.string(),
  processedAt: z.string(),
  fragments: z
    .strictObject({
      batchSize: z.number(),
      fragmentCount: z.number(),
      keyName: z.string(),
    })
    .nullish(),
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
        transactionSettingId: z.string().optional(),
        guideId: z.string().optional(),
      })
      .optional(),
  }),
});
