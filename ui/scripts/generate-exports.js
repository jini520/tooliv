#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 컴포넌트 디렉토리 경로
const atomsDir = path.join(__dirname, "../src/components/atoms");
const moleculesDir = path.join(__dirname, "../src/components/molecules");
const organismsDir = path.join(__dirname, "../src/components/organisms");

// 디렉토리에서 컴포넌트 폴더들을 찾아서 export 문 생성
function generateExports(dirPath, indexFilePath) {
  if (!fs.existsSync(dirPath)) {
    console.log(`Directory ${dirPath} does not exist`);
    return;
  }

  const components = fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
    .sort();

  const exportStatements = components
    .map((component) => `export * from './${component}';`)
    .join("\n");

  const content = exportStatements + "\n";

  fs.writeFileSync(indexFilePath, content);
  console.log(
    `Generated exports for ${components.length} components in ${path.basename(
      dirPath
    )}`
  );
}

// 각 레벨별로 export 파일 생성
generateExports(atomsDir, path.join(atomsDir, "index.ts"));
generateExports(moleculesDir, path.join(moleculesDir, "index.ts"));
generateExports(organismsDir, path.join(organismsDir, "index.ts"));

// 메인 components/index.ts 생성
const componentsDir = path.join(__dirname, "../src/components");
const mainIndexPath = path.join(componentsDir, "index.ts");

const mainExports =
  [
    "export * from './atoms';",
    "export * from './molecules';",
    "export * from './organisms';",
  ].join("\n") + "\n";

fs.writeFileSync(mainIndexPath, mainExports);
console.log("Generated main components/index.ts");

console.log("✅ All export files generated successfully!");
