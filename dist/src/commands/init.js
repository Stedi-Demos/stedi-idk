import fs from "node:fs";
import path from "node:path";
import cp from "node:child_process";
import packageJson from "../../package.json" assert { type: "json" };
const npm = process.platform === "win32" ? "npm.cmd" : "npm";
export const command = "init <repo-path>";
export const desc = "Creates new IDK project at path";
export const builder = {};
export const handler = (argv) => {
    const pathExists = fs.existsSync(argv.repoPath);
    if (!pathExists)
        fs.mkdirSync(argv.repoPath);
    const pkg = {
        name: "my-idk",
        description: "Stedi Integration Development Kit",
        version: "0.0.1",
        devDependencies: {
            "@ava/typescript": packageJson.devDependencies["@ava/typescript"],
            "@stedi/idk": "file:../stedi-idk",
            "@stedi/sdk-client-buckets": packageJson.devDependencies["@stedi/sdk-client-identity"],
            "@stedi/sdk-client-functions": packageJson.devDependencies["@stedi/sdk-client-identity"],
            "@stedi/sdk-client-events": packageJson.devDependencies["@stedi/sdk-client-identity"],
            "@types/node": packageJson.devDependencies["@types/node"],
            ava: packageJson.devDependencies.ava,
            c8: packageJson.devDependencies.c8,
            "ts-node": packageJson.devDependencies["ts-node"],
            typescript: packageJson.devDependencies.typescript,
            undici: packageJson.devDependencies.undici,
            zod: packageJson.devDependencies.zod,
        },
        prettier: packageJson.prettier,
        ava: packageJson.ava,
        volta: {
            node: packageJson.volta.node,
            npm: packageJson.volta.npm,
        },
    };
    console.log(pkg);
    const projectBasePath = path.join(process.cwd(), argv.repoPath);
    const packageJSONExists = fs.existsSync(path.join(projectBasePath, "package.json"));
    if (packageJSONExists) {
        console.error("Cannot continue as package.json already exists in the specified path, you must supply an empty directory.");
        process.exit(1);
    }
    fs.writeFileSync(path.join(projectBasePath, "package.json"), JSON.stringify(pkg, null, 2));
    fs.copyFileSync("./tsconfig.json", path.join(projectBasePath, "tsconfig.json"));
    cp.spawnSync(npm, ["install"], {
        cwd: projectBasePath,
        stdio: [0, 1, 2],
    });
};
//# sourceMappingURL=init.js.map