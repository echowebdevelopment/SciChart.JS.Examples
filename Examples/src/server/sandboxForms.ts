import * as path from "path";
import * as fs from "fs";
import { getParameters } from "codesandbox/lib/api/define";
import { IFiles, csStyles } from "./sandboxDependencyUtils";
import { type TExampleInfo } from "../components/AppRouter/examplePages";
import { EPageFramework } from "../components/AppRouter/pages";
import { NotFoundError } from "./Errors";
const pj = require("../../package.json");

const includeImportedModules = async (folderPath: string, files: IFiles, code: string) => {
    const localImports = Array.from(code.matchAll(/import.*from ["']\.\/(.*)["'];/g));

    for (const localImport of localImports) {
        if (localImport.length > 1) {
            let content: string = "";
            try {
                const filepath = path.join(folderPath, localImport[1] + ".ts");
                const csPath = "src/" + localImport[1] + ".ts";
                content = await fs.promises.readFile(filepath, "utf8");
                files[csPath] = { content, isBinary: false };
            } catch (e) {
                const filepath = path.join(folderPath, localImport[1] + ".tsx");
                const csPath = "src/" + localImport[1] + ".tsx";
                content = await fs.promises.readFile(filepath, "utf8");
                files[csPath] = { content, isBinary: false };
            }
            const nestedImports = Array.from(content.matchAll(/import.*from "\.\/(.*)";/g));
            if (nestedImports.length > 0) {
                localImports.push(...nestedImports);
            }
        }
    }
};

const getCodeSandBoxForm = async (folderPath: string, currentExample: TExampleInfo) => {
    const tsPath = path.join(folderPath, "index.tsx");
    let code = await fs.promises.readFile(tsPath, "utf8");
    let files: IFiles = {};
    await includeImportedModules(folderPath, files, code);

    code = code.replace(/\.\.\/.*styles\/Examples\.module\.scss/, `./styles/Examples.module.scss`);
    files = {
        ...commonFiles,
        ...files,
        "package.json": {
            // @ts-ignore
            content: {
                name: currentExample.path.replace("/", ""),
                version: "1.0.0",
                main: "src/index.tsx",
                scripts: {
                    start: "react-scripts start",
                    build: "react-scripts build",
                    test: "react-scripts test --env=jsdom",
                    eject: "react-scripts eject",
                },
                dependencies: {
                    "@material-ui/core": "4.12.4",
                    "@material-ui/lab": "4.0.0-alpha.61",
                    sass: "^1.49.9",
                    "loader-utils": "3.2.1",
                    react: "^17.0.2",
                    "react-dom": "^17.0.2",
                    "react-scripts": "5.0.1",
                    scichart: pj.dependencies.scichart,
                    "scichart-react": pj.dependencies["scichart-react"],
                    "scichart-example-dependencies": pj.dependencies["scichart-example-dependencies"],
                    ...currentExample.extraDependencies,
                },
                devDependencies: {
                    "@types/react": "^17.0.52",
                    "@types/react-dom": "18.0.9",
                    "@babel/runtime": "7.13.8",
                    typescript: "4.9.5",
                },
                browserslist: [">0.2%", "not dead", "not ie <= 11", "not op_mini all"],
            },
        },
        "src/App.tsx": {
            content: code,
            isBinary: false,
        },
        "src/index.tsx": {
            content: `
            import { hydrate } from "react-dom";
import { SciChartSurface, SciChart3DSurface } from "scichart";

import App from "./App";

const rootElement = document.getElementById("root");
SciChartSurface.loadWasmFromCDN();
SciChart3DSurface.loadWasmFromCDN();
hydrate( <App />, rootElement);
`,
            isBinary: false,
        },
        "public/index.html": {
            content: `<!DOCTYPE html>
        <html lang="en">
          <head>
          <title>React App</title>
          </head>
          <body>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="root"></div>
          </body>
        </html>`,
            isBinary: false,
        },
    };

    if (currentExample.sandboxConfig) {
        files["sandbox.config.json"] = {
            // @ts-ignore
            content: currentExample.sandboxConfig,
            isBinary: false,
        };
    }
    files = { ...files, ...csStyles };

    const parameters = getParameters({ files });
    return `<form name="codesandbox" id="codesandbox" action="https://codesandbox.io/api/v1/sandboxes/define" method="POST">
        <input type="hidden" name="parameters" value="${parameters}" />
    </form>`;
};

const getVanillaTsCodeSandBoxForm = async (folderPath: string, currentExample: TExampleInfo) => {
    const tsPath = path.join(folderPath, "vanilla.ts");
    let code: string;
    try {
        code = await fs.promises.readFile(tsPath, "utf8");
    } catch (err) {
        throw new NotFoundError("Vanilla version not found! Try using different framework.");
    }
    code = code.replace(/\.\.\/.*styles\/Examples\.module\.scss/, `./styles/Examples.module.scss`);
    const template = "parcel";

    let files: IFiles = {
        "package.json": {
            // @ts-ignore
            content: {
                name: currentExample.path.replace("/", ""),
                version: "1.0.0",
                main: "src/index.ts",
                scripts: {
                    start: "parcel index.html",
                    build: "parcel build index.html",
                },
                dependencies: {
                    scichart: pj.dependencies.scichart,
                    "scichart-example-dependencies": pj.dependencies["scichart-example-dependencies"],
                    "parcel-bundler": "1.6.1",
                    ...currentExample.extraDependencies,
                },
                devDependencies: {
                    typescript: "4.9.5",
                },
                browserslist: [">0.2%", "not ie <= 11", "not op_mini all"],
                resolutions: {
                    "@babel/preset-env": "7.13.8",
                },
                keywords: ["typescript", "javascript", "chart", "scichart"],
            },
        },
        "src/index.ts": {
            content: code,
            isBinary: false,
        },
        "tsconfig.json": {
            content: `{
  "include": [
      "./src/**/*"
  ],
  "compilerOptions": {
      "strict": false,
      "esModuleInterop": true,
      "target": "es5",
      "downlevelIteration": true,
      "lib": [
          "dom",
          "es2015"
      ],
      "typeRoots": ["./src/types", "./node_modules/@types"],
      "jsx": "react-jsx"
  }
}`,
            isBinary: false,
        },
        "sandbox.config.json": {
            content: `{
    "infiniteLoopProtection": false,
    "hardReloadOnChange": false,
    "view": "browser"
}`,
            isBinary: false,
        },
        "src/types/declaration.d.ts": {
            content: `declare module "*.scss" {
            const content: Record<string, string>;
            export default content;
        }`,
            isBinary: false,
        },
        "src/types/jpg.d.ts": {
            content: `declare module "*.jpg" {
            const value: any;
            export default value;
        }`,
            isBinary: false,
        },
        "src/types/png.d.ts": {
            content: `declare module "*.png" {
            const value: any;
            export default value;
        } `,
            isBinary: false,
        },
        "src/types/svg.d.ts": {
            content: `declare module "*.svg" {
            const value: any;
            export default value;
        }`,
            isBinary: false,
        },
        "index.html": {
            content: `<!DOCTYPE html>
        <html lang="en">
          <head>
          <title>SciChart Example</title>
          <script async type="text/javascript" src="src/index.ts"></script>
          </head>
          <body>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="chart"></div>
          </body>
        </html>`,
            isBinary: false,
        },
    };

    if (currentExample.sandboxConfig) {
        files["sandbox.config.json"] = {
            // @ts-ignore
            content: currentExample.sandboxConfig,
            isBinary: false,
        };
    }
    files = { ...files, ...csStyles };

    await includeImportedModules(folderPath, files, code);
    const parameters = getParameters({ files, template });
    return `<form name="codesandbox" id="codesandbox" action="https://codesandbox.io/api/v1/sandboxes/define" method="POST">
        <input type="hidden" name="parameters" value="${parameters}" />
    </form>`;
};

const commonFiles: IFiles = {
    "tsconfig.json": {
        content: `{
"include": [
  "./src/**/*"
],
"compilerOptions": {
  "strict": false,
  "esModuleInterop": true,
  "target": "es5",
  "downlevelIteration": true,
  "lib": [
      "dom",
      "es2015"
  ],
  "typeRoots": ["./src/types", "./node_modules/@types"],
  "jsx": "react-jsx"
}
}`,
        isBinary: false,
    },
    "sandbox.config.json": {
        content: `{
"infiniteLoopProtection": false,
"hardReloadOnChange": false,
"view": "browser"
}`,
        isBinary: false,
    },
    "src/types/declaration.d.ts": {
        content: `declare module "*.scss" {
        const content: Record<string, string>;
        export default content;
    }`,
        isBinary: false,
    },
    "src/types/jpg.d.ts": {
        content: `declare module "*.jpg" {
        const value: any;
        export default value;
    }`,
        isBinary: false,
    },
    "src/types/png.d.ts": {
        content: `declare module "*.png" {
        const value: any;
        export default value;
    } `,
        isBinary: false,
    },
    "src/types/svg.d.ts": {
        content: `declare module "*.svg" {
        const value: any;
        export default value;
    }`,
        isBinary: false,
    },
};

export const getSandboxWithTemplate = (folderPath: string, currentExample: TExampleInfo, framework: EPageFramework) => {
    switch (framework) {
        case EPageFramework.Angular:
            throw new Error("Not Implemented");
        case EPageFramework.Vue:
            throw new Error("Not Implemented");
        case EPageFramework.React:
            return getCodeSandBoxForm(folderPath, currentExample);
        case EPageFramework.Vanilla:
            return getVanillaTsCodeSandBoxForm(folderPath, currentExample);
        default:
            return handleInvalidFrameworkValue(framework);
    }
};

const handleInvalidFrameworkValue = (value: never): never => {
    throw new Error("Invalid framework value!");
};
