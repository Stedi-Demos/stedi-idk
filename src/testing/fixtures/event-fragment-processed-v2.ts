import { type CoreFragmentProcessedV2Event } from "../../schemas/event-fragment-processed-v2.js";
import {
  sampleOutputArtifactUrl,
  samplePartnershipId,
  sampleTransactionId,
  sampleTransactionResourceUrl,
  sampleTransactionSetIdentifier,
} from "./event-transaction-processed-v2.js";

export const sampleFragmentProcessedV2Event =
  (): CoreFragmentProcessedV2Event => ({
    id: "xxx-05d4-b198-2fde-7ededc63b103",
    "detail-type": "fragment.processed.v2",
    source: "stedi.core",
    account: "12345678900",
    time: "2023-08-12T00:00:00Z",
    version: "0",
    region: "us-east-1",
    resources: [sampleTransactionResourceUrl],
    detail: {
      direction: "INBOUND",
      mode: "production",
      fileExecutionId: "12d584eb-3a19-42f3-99fa-5526f273d8d",
      transactionId: sampleTransactionId,
      processedAt: "2023-08-12T00:00:00Z",
      fragments: {
        fragmentCount: 1,
        batchSize: 800,
        keyName: "item_identification_LIN_loop",
      },
      fragmentIndex: 0,
      artifacts: [
        {
          artifactType: "application/json",
          usage: "output",
          sizeBytes: 234,
          url: sampleOutputArtifactUrl,
          model: "fragment",
        },
      ],
      partnership: {
        partnershipId: samplePartnershipId,
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
            transactionSetIdentifier: sampleTransactionSetIdentifier,
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
