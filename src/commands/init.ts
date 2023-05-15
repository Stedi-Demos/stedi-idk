import fs from "node:fs";
import path from "node:path";
import cp from "node:child_process";

interface PackageType {
  devDependencies: Record<string, string>;
  prettier: Record<string, unknown>;
  ava: Record<string, unknown>;
  volta: Record<string, unknown>;
}

const npm = process.platform === "win32" ? "npm.cmd" : "npm";

export const command = "init <repo-path>";

export const desc = "Creates new IDK project at path";

export const builder = {};

export const handler = (argv: { repoPath: string }) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const packageJson = JSON.parse(
    fs.readFileSync("./package.json", "utf8")
  ) as PackageType;

  const pathExists = fs.existsSync(argv.repoPath);

  if (!pathExists) {
    fs.mkdirSync(argv.repoPath);
    fs.mkdirSync(path.join(argv.repoPath, "src"));
    fs.mkdirSync(path.join(argv.repoPath, "src", "functions"));
  }

  const pkg = {
    name: "my-idk",
    description: "Stedi Integration Development Kit",
    version: "0.0.1",
    type: "module",
    devDependencies: {
      "@ava/typescript": packageJson.devDependencies["@ava/typescript"],
      "@stedi/idk": "file:../stedi-idk",
      "@stedi/sdk-client-buckets":
        packageJson.devDependencies["@stedi/sdk-client-identity"],
      "@stedi/sdk-client-functions":
        packageJson.devDependencies["@stedi/sdk-client-identity"],
      "@stedi/sdk-client-events":
        packageJson.devDependencies["@stedi/sdk-client-identity"],
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
    volta: packageJson.volta,
    scripts: {
      test: "ava",
    },
  };
  console.log(pkg);

  const projectBasePath = path.join(process.cwd(), argv.repoPath);

  const packageJSONExists = fs.existsSync(
    path.join(projectBasePath, "package.json")
  );

  if (packageJSONExists) {
    console.error(
      "Cannot continue as package.json already exists in the specified path, you must supply an empty directory."
    );
    process.exit(1);
  }

  fs.writeFileSync(
    path.join(projectBasePath, "package.json"),
    JSON.stringify(pkg, null, 2)
  );

  ["tsconfig.json", "src/fetch.d.ts"].forEach((file) => {
    fs.copyFileSync(`./${file}`, path.join(projectBasePath, file));
  });

  fs.copyFileSync(`./.env.example`, path.join(projectBasePath, ".env"));

  cp.spawnSync(npm, ["install"], {
    cwd: projectBasePath,
    stdio: [0, 1, 2],
  });
};
