import { resolve } from "node:path";
import { existsSync } from "node:fs";
import { log } from "node:console";
import { privateTerms, scanDirectory } from "./privacy.mjs";

const terms = await privateTerms();
const source = await scanDirectory(resolve("."), terms);
const output = existsSync("build/client") ? await scanDirectory(resolve("build/client"), terms) : null;
const findings = [...source.findings.map((row) => ({ scope: "source", ...row })), ...(output?.findings ?? []).map((row) => ({ scope: "output", ...row }))];
if (findings.length) throw new Error("Privacy review required: " + JSON.stringify(findings));
log(JSON.stringify({ sourceFiles: source.files, outputFiles: output?.files ?? 0, privateWordListEnabled: terms.length > 0, findings: 0 }));
