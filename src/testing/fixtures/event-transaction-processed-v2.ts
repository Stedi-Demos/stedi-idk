import { type CoreTransactionProcessedV2Event } from "../../schemas/event-transaction-processed-v2.js";

export const sampleTransactionProcessedV2Event =
  (): CoreTransactionProcessedV2Event => ({
    id: "xxx-05d4-b198-2fde-7ededc63b103",
    "detail-type": "transaction.processed.v2",
    source: "stedi.core",
    account: "12345678900",
    time: "2023-08-12T00:00:00Z",
    version: "0",
    region: "us-east-1",
    resources: [
      "https://core.us.stedi.com/2023-08-01/transaction/a542c152-87c5-4916-848d-e60d47fe0e34",
    ],
    detail: {
      direction: "INBOUND",
      mode: "production",
      fileExecutionId: "12d584eb-3a19-42f3-99fa-5526f273d8d",
      transactionId: "a542c152-87c5-4916-848d-e60d47fe0e34",
      processedAt: "2023-08-12T00:00:00Z",
      artifacts: [
        {
          artifactType: "application/edi-x12",
          usage: "input",
          sizeBytes: 123,
          url: "https://core.us.stedi.com/2023-08-01/transaction/a542c152-87c5-4916-848d-e60d47fe0e34/input",
        },
        {
          artifactType: "application/json",
          usage: "output",
          sizeBytes: 234,
          url: "https://core.us.stedi.com/2023-08-01/transaction/a542c152-87c5-4916-848d-e60d47fe0e34/output",
        },
      ],
      partnership: {
        partnershipId: "ThisIsMe-AnotherMerch",
        partnershipType: "x12",
        sender: {
          profileId: "this-is-me",
        },
        receiver: {
          profileId: "another-merch",
        },
      },
      x12: {
        metadata: {
          interchange: {
            acknowledgmentRequestedCode: "0",
            controlNumber: 9,
          },
          functionalGroup: {
            controlNumber: 9,
            date: "2023-08-12",
            release: "008010",
            time: "08:17:42",
            functionalIdentifierCode: "PO",
          },
          transaction: {
            controlNumber: "0002",
            transactionSetIdentifier: "850",
          },
          sender: {
            applicationCode: "ANOTHERMERCH",
            isa: {
              qualifier: "ZZ",
              id: "ANOTHERMERCH",
            },
          },
          receiver: {
            applicationCode: "THISISME",
            isa: {
              qualifier: "ZZ",
              id: "THISISME",
            },
          },
        },
        transactionSetting: {
          transactionSettingId: "004010-850",
          guideId: "01GZP7FRCM6P17XAAQ2JXZZ3C0",
        },
      },
    },
  });
