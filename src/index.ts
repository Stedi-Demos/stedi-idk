#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { commands } from "./commands/index.js";

// silences node warnings (JSON imports)
console.clear();

await yargs(hideBin(process.argv))
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-argument
  .command(commands as any)
  .showHelpOnFail(true)
  .strict()
  .demandCommand().argv;
