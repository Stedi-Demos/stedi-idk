import fs from "node:fs";
import path from "node:path";
import { Argv } from "yargs";
import cliSelect from "cli-select";
import chalk from "chalk";
import { mkdirpSync } from "fs-extra";
export const command = "new-function <function-name>";

export const desc = "Generate a new function";

export const builder = (yargs: Argv) => {
  return yargs.option("guided", {
    alias: "g",
    describe: "Use guided mode to create a new function",
    type: "boolean",
  });
};

export const handler = async (argv: {
  functionName: string;
  guided: boolean;
}) => {
  const targetPath = path.resolve(
    path.join("src", "functions", argv.functionName)
  );

  if (fs.existsSync(targetPath)) {
    console.error(
      `Cannot continue as function already exists in the specified path, you must supply an alternate function name.\n`
    );

    process.exit(1);
  }

  let stediEventName = "NONE";

  if (argv.guided) {
    console.log("What event type would you like the function to listen for:");
    const {
      value: { name },
    } = await cliSelect({
      values: {
        "0": {
          name: "transaction.processed",
          description:
            "[Core] - Emitted for every transaction processed successfully.",
        },
        "1": {
          name: "functional_group.processed",
          description:
            "[Core] - Emitted for every functional group processed successfully .",
        },
        "2": {
          name: "file.processed",
          description:
            "[Core] - Emitted for every file processed successfully.",
        },
        "3": {
          name: "file.delivered",
          description:
            "[Core] - Emitted for every file delivered to a connection successfully.",
        },
        "4": {
          name: "file.failed",
          description:
            "[Core] - Emitted for every file failed to be processed.",
        },
        "5": {
          name: "file.created",
          description:
            "[Buckets] - Emitted for every file created in a bucket.",
        },
        N: {
          name: "NONE",
          description: "I'll handle the input event type myself.",
        },
      },
      valueRenderer: (value, selected) => {
        return `${
          selected ? chalk.underline(value.name) : value.name
        } - ${chalk.dim(value.description)}`;
      },
    });

    if (typeof name !== "string") {
      console.error("Unexpected error selecting event type");
      process.exit(1);
    }

    stediEventName = name;

    console.log(`   selected: ${chalk.bold(stediEventName)}`);
  }

  const testPath = path.join(targetPath, "tests");
  // ensure we have the directories
  mkdirpSync(targetPath);
  mkdirpSync(testPath);

  let handlerCode = ``;
  let testCode = `import test from "ava";
import { handler } from "../handler.js";\n`;

  if (stediEventName === "NONE") {
    handlerCode += `export const handler = async (event: unknown) => {\n`;

    testCode += `const event = {}; // TODO: replace with your event`;
  } else {
    let eventType = "";
    let sampleGeneratorName = "";
    switch (stediEventName) {
      case "transaction.processed":
        eventType = "CoreTransactionProcessedEvent";
        sampleGeneratorName = "sampleTransactionProcessedEvent";
        break;
      case "functional_group.processed":
        eventType = "CoreFunctionalGroupProcessedEvent";
        sampleGeneratorName = "sampleFunctionalGroupProcessedEvent";
        break;
      case "file.processed":
        eventType = "CoreFileProcessedEvent";
        sampleGeneratorName = "sampleFileProcessedEvent";
        break;
      case "file.delivered":
        eventType = "CoreFileDeliveredEvent";
        sampleGeneratorName = "sampleFileDeliveredEvent";
        break;
      case "file.failed":
        eventType = "CoreFileFailedEvent";
        sampleGeneratorName = "sampleFileFailedEvent";
        break;
      case "file.created":
        eventType = "BucketsFileCreatedEvent";
        sampleGeneratorName = "sampleFileCreatedEvent";
        break;
      default:
        console.error(`Unknown event type: ${stediEventName}`);
        process.exit(1);
    }

    handlerCode += `import { type ${eventType} } from "@stedi/integrations-sdk";

export const handler = async (event: ${eventType}) => {\n`;

    testCode += `import { ${sampleGeneratorName} } from "@stedi/integrations-sdk/testing";

const event = ${sampleGeneratorName}();`;
  }

  handlerCode += `  console.dir(event, { depth: null });
};\n`;

  testCode += `\n\ntest.serial("handler executes successfully", async (t) => {
  const result = await handler(event);
  
  console.dir(result, { depth: null })
  
  t.fail(); // TODO: replace with your assertions
});\n`;

  fs.writeFileSync(`${targetPath}/handler.ts`, handlerCode);
  fs.writeFileSync(`${testPath}/handler.test.ts`, testCode);

  console.log(`\n\n\nYour new function has been created at:\n
     ${chalk.bold(`${targetPath}/handler.ts`)}\n


You can run the test for this function with:\n
    ${chalk.bold(`npm run test -- ${testPath}`)}
    
`);
};
