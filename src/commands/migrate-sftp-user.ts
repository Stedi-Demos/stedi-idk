import { partnersClient, sftpClient } from "../clients/index.js";
import { UpdateUserCommand } from "@stedi/sdk-client-sftp";
import { CreateStediFtpConnectionCommand } from "@stedi/sdk-client-partners";
import { resolveAccountId } from "../common/resolve-account-id.js";

export const command =
  "migrate-sftp-user <sftp-username> <partnership-id> [inbound-directory] [outbound-directory]";

export const desc = "Migrates existing SFTP user to Core Stedi SFTP connection";

export const builder = {};

export const handler = async (argv: {
  sftpUsername: string;
  partnershipId: string;
  inboundDirectory?: string;
  outboundDirectory?: string;
}) => {
  const stediAccountId = await resolveAccountId();
  const sftpUsername = argv.sftpUsername;
  const partnershipId = argv.partnershipId;
  const inboundDirectoryOverride = argv.inboundDirectory;
  const outboundDirectoryOverride = argv.outboundDirectory;

  // update existing SFTP user
  const bucketName = `${stediAccountId}-core-sftp`;
  const defaultCoreSftpRoot = "/partnerships";
  const homeDirectory = `${defaultCoreSftpRoot}/${partnershipId}`;
  const description = `Stedi SFTP User for Partnership ${partnershipId}`;

  const sftpUser = await sftpClient().send(
    new UpdateUserCommand({
      username: sftpUsername,
      bucketName,
      homeDirectory,
      description,
    })
  );

  console.log(`update user result: ${JSON.stringify(sftpUser, null, 2)}`);

  // create core connection using updated SFTP user
  const sftpConnection = await partnersClient().send(
    new CreateStediFtpConnectionCommand({
      name: `${partnershipId} SFTP`,
      inboundSubdirectory: inboundDirectoryOverride ?? "/inbound",
      outboundSubdirectory: outboundDirectoryOverride ?? "/outbound",
      deleteInboundFilesOnReceipt: true,
      username: sftpUsername,
      bucketName,
      homeDirectory,
      partnershipId,
    })
  );

  console.log(
    `create connection result: ${JSON.stringify(sftpConnection, null, 2)}`
  );
};
