import * as deploy from "./deploy.js";
import * as installTemplate from "./install-template.js";
import * as migrateSftpUser from "./migrate-sftp-user.js";
import * as newFunction from "./new-function.js";

export const commands = [deploy, installTemplate, migrateSftpUser, newFunction];
