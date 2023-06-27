import { CoreFunctionalGroupProcessedEvent } from "../../index.js";

export const sampleFunctionalGroupProcessedEvent =
  (): CoreFunctionalGroupProcessedEvent => ({
    version: "0",
    id: "xxx-05d4-b198-2fde-7ededc63b103",
    "detail-type": "functional_group.processed",
    source: "stedi.core",
    region: "us-east-1",
    resources: [],
    time: "2021-11-12T00:00:00Z",
    detail: {
      version: "2023-02-13",
      direction: "RECEIVED",
      envelopes: {
        interchange: {
          acknowledgmentRequestedCode: "0",
          controlNumber: 1746,
          date: "2022-09-14",
          receiverId: "THISISME",
          receiverQualifier: "ZZ",
          senderId: "ANOTHERMERCH",
          senderQualifier: "ZZ",
          time: "20:22",
          usageIndicatorCode: "T",
          versionNumberCode: "00501",
        },
        functionalGroup: {
          applicationReceiverCode: "THISISME",
          applicationSenderCode: "ANOTHERMERCH",
          controlNumber: 1746,
          date: "2022-09-14",
          functionalIdentifierCode: "PR",
          release: "005010",
          responsibleAgencyCode: "X",
          time: "20:22:22",
        },
      },
      metadata: {
        processedAt: "2023-03-14T19:19:17.950Z",
        fileExecutionId: "1234-4321-1234-4321",
      },
      transactionSetCount: 1,
      transactionSetIds: ["855", "850"],
      input: {
        type: "EDI/X12",
        bucketName: "chain-test",
        key: "855.edi",
      },
      partnership: {
        partnershipId: "ThisIsMe-AnotherMerch",
        sender: {
          isa: {
            qualifier: "ZZ",
            id: "ANOTHERMERCH",
          },
          profileId: "321",
        },
        receiver: {
          isa: {
            qualifier: "ZZ",
            id: "THISISME",
          },
          profileId: "123",
        },
      },
    },
  });
