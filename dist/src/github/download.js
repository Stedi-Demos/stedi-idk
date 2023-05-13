import fs from "fs-extra";
import { dirname, isAbsolute, resolve } from "path";
import { Readable } from "node:stream";
import { finished } from "node:stream/promises";
import { fetch } from "undici";
// Matches '/<re/po>/tree/<ref>/<dir>'
const urlParserRegex = /^[/]([^/]+)[/]([^/]+)[/]tree[/]([^/]+)[/](.*)/;
const fetchRepoInfo = async (repo, token) => {
    const response = await fetch(`https://api.github.com/repos/${repo}`, token
        ? {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
        : {});
    switch (response.status) {
        case 401:
            console.log("⚠ The token provided is invalid or has been revoked.", {
                token: token,
            });
            throw new Error("Invalid token");
        case 403:
            // See https://developer.github.com/v3/#rate-limiting
            if (response.headers.get("X-RateLimit-Remaining") === "0") {
                console.log("⚠ Your token rate limit has been exceeded.", {
                    token: token,
                });
                throw new Error("Rate limit exceeded");
            }
            break;
        case 404:
            console.log("⚠ Repository was not found.", { repo });
            throw new Error("Repository not found");
        default:
    }
    if (!response.ok) {
        console.log("⚠ Could not obtain repository data from the GitHub API.", {
            repo,
            response,
        });
        throw new Error("Fetch error");
    }
    return (await response.json());
};
const viaTreesApi = async ({ user, repository, ref = "HEAD", directory, token, }) => {
    if (!directory.endsWith("/")) {
        directory += "/";
    }
    const files = [];
    const contents = await fetchRepoInfo(`${user}/${repository}/git/trees/${ref}?recursive=1`, token);
    if (contents.message) {
        throw new Error(contents.message);
    }
    for (const item of contents.tree) {
        if (item.type === "blob" && item.path.startsWith(directory)) {
            files.push(item);
        }
    }
    return files;
};
const getRepoMeta = async (user, repository, ref, dir, config) => {
    const repoIsPrivate = (await fetchRepoInfo(`${user}/${repository}`, config?.token)).private;
    const files = await viaTreesApi({
        user,
        repository,
        ref,
        directory: decodeURIComponent(dir),
        token: config?.token,
    });
    return {
        files,
        repoIsPrivate,
    };
};
const parseUrl = (source) => {
    const parseComponents = urlParserRegex.exec(new URL(source).pathname);
    if (parseComponents === null ||
        !Array.isArray(parseComponents) ||
        parseComponents.length < 5)
        throw new Error("Invalid url");
    const [, user, repository, ref, dir] = parseComponents;
    if (user === undefined ||
        repository === undefined ||
        ref === undefined ||
        dir === undefined)
        throw new Error("Invalid url");
    return [user, repository, ref, dir];
};
export const download = async (source, saveTo, config) => {
    const stats = { files: {}, downloaded: 0, success: false };
    const [user, repository, ref, dir] = parseUrl(source);
    if (!user || !repository) {
        stats.error = "Invalid url";
        return stats;
    }
    if (!saveTo) {
        saveTo = resolve(process.cwd(), dir);
    }
    if (!isAbsolute(saveTo))
        saveTo = resolve(process.cwd(), saveTo);
    let meta;
    try {
        meta = await getRepoMeta(user, repository, ref, dir, config);
    }
    catch (e) {
        console.error("Failed to fetch repo meta info: ", e);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        try {
            meta = await getRepoMeta(user, repository, ref, dir, config);
        }
        catch (e) {
            console.error("Failed to fetch repo meta info after second attempt: ", e);
            stats.error = e;
            return stats;
        }
    }
    const { files } = meta;
    if (files.length === 0) {
        console.log("No template function found with this name.");
        stats.success = true;
        return stats;
    }
    console.log(`Downloading ${files.length} files…`);
    const fetchFile = async (file) => {
        const response = await fetch(`https://raw.githubusercontent.com/${user}/${repository}/${ref}/${file.path}`, config?.token
            ? {
                headers: {
                    Authorization: `Bearer ${config?.token}`,
                },
            }
            : undefined);
        if (!response.ok) {
            throw new Error(`HTTP ${response.statusText} for ${file.path}`);
        }
        return response;
    };
    let downloaded = 0;
    const download = async (file) => {
        let response;
        try {
            response = await fetchFile(file);
        }
        catch (e) {
            console.log("⚠ Failed to download file: " + file.path, e);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            try {
                response = await fetchFile(file);
            }
            catch (e) {
                console.log("⚠ Failed to download file after second attempt: " + file.path, e);
                return;
            }
        }
        if (response.body === null)
            return;
        try {
            downloaded++;
            const fileName = resolve(saveTo, file.path.replace(dir + "/", ""));
            await fs.ensureDir(dirname(fileName));
            const fileStream = fs.createWriteStream(fileName, { flags: "wx" });
            await finished(Readable.fromWeb(response.body).pipe(fileStream));
            stats.files[file.path] = fileName;
        }
        catch (e) {
            console.error("Failed to write file: " + file.path, e);
        }
    };
    const requests = config?.requests ?? 10;
    const statuses = [];
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file === undefined)
            continue;
        const num = i % requests;
        if (statuses[num]) {
            await statuses[num];
        }
        statuses[num] = download(file);
    }
    await Promise.all(statuses);
    console.log(`Downloaded ${downloaded}/${files.length} files`);
    stats.downloaded = downloaded;
    if (files.length === downloaded)
        stats.success = true;
    return stats;
};
//# sourceMappingURL=download.js.map