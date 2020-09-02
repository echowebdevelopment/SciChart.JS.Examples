const fs = require("fs");
const path = require("path");

async function getFiles(pathUrl) {
    const entries = await fs.promises.readdir(pathUrl, { withFileTypes: true });

    // Get files within the current directory and add a path key to the file objects
    const files = entries
        .filter((file) => !file.isDirectory())
        .map((file) => ({
            fileName: file.name,
            fileDir: pathUrl,
            filePath: path.join(pathUrl, file.name),
        }));

    // Get folders within the current directory
    const folders = entries.filter((folder) => folder.isDirectory());

    // Add the found files within the subdirectory to the files array
    for (const folder of folders) files.push(...(await getFiles(path.join(pathUrl, folder.name))));

    return files;
}

function updateExample(targetFileDir, srcText) {
    const targetFileSrc = path.join(targetFileDir, "GENERATED_SRC.ts");
    fs.writeFileSync(
        targetFileSrc,
        `export const code = \`
${srcText}
\`;
`
    );

    const targetFileGithubUrl = path.join(targetFileDir, "GENERATED_GITHUB_URL.ts");
    const position = targetFileDir.search("/components/Examples");
    const githubUrl = targetFileDir.substring(position) + "/index.tsx";
    fs.writeFileSync(targetFileGithubUrl, `export const githubUrl = "${githubUrl}";`);
}

(async function () {
    const examplesPath = path.join(__dirname, "src", "components", "Examples");
    const files = await getFiles(examplesPath);
    const srcFiles = files.filter((f) => f.fileName === "index.tsx");
    srcFiles.forEach((f) => {
        const srcText = fs.readFileSync(f.filePath, "utf-8");
        updateExample(f.fileDir, srcText);
    });
})();
