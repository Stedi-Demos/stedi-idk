import * as z from "zod";
export const EventFunctionalGroupSchema = z.strictObject({
    applicationReceiverCode: z.string(),
    applicationSenderCode: z.string(),
    controlNumber: z.number(),
    date: z.string(),
    functionalIdentifierCode: z.string().length(2),
    release: z.string(),
    responsibleAgencyCode: z.enum(["X", "T"]),
    time: z.string(),
});
//# sourceMappingURL=event-functional-group.js.map