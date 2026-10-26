import { readFile, readdir } from "node:fs/promises";
import { join, relative } from "node:path";
import process from "node:process";
import { Buffer } from "node:buffer";

export async function privateTerms() {
  if (!process.env.PORTFOLIO_PRIVATE_TERMS_FILE) return [];
  const data = JSON.parse(await readFile(process.env.PORTFOLIO_PRIVATE_TERMS_FILE, "utf8"));
  if (!Array.isArray(data.terms) || data.terms.some((term) => typeof term !== "string" || !term.trim())) {
    throw new Error("Invalid external privacy word list.");
  }
  return data.terms;
}

// 报告规则与位置，不返回匹配到的姓名、邮箱或凭据。
export function privacyFindings(bytes, terms = []) {
  const findings = [];
  terms.forEach((term, index) => {
    if (bytes.includes(Buffer.from(term)) || bytes.includes(Buffer.from(JSON.stringify(term).slice(1, -1)))) findings.push("private-term-" + (index + 1));
  });
  if (bytes.includes(0)) return findings;
  const text = bytes.toString("utf8");
  const patterns = [
    ["private-key", /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
    ["github-token", /\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{50,})/],
    ["api-token", /\bsk-(?:proj-)?[A-Za-z0-9_-]{30,}/],
    ["aws-key", /\bAKIA[0-9A-Z]{16}\b/],
    ["local-user-path", /[A-Za-z]:[\\/]+(?:Users|vscode|codex|ruanjian)[\\/]+/],
    ["credential-assignment", /(?:api[_-]?key|access[_-]?token|client[_-]?secret|password)\s*[:=]\s*["'][A-Za-z0-9_/-]{16,}["']/i],
  ];
  for (const [kind, pattern] of patterns) if (pattern.test(text)) findings.push(kind);
  const emails = [...text.matchAll(/(?<![\w:])([A-Za-z0-9._%+-]+)@([A-Za-z0-9.-]+\.[A-Za-z]{2,})\b/g)];
  if (emails.some((match) => !/(^|\.)(example\.(com|net|org)|invalid|test)$/i.test(match[2]))) findings.push("email-needs-review");
  return [...new Set(findings)];
}

export async function scanDirectory(root, terms = []) {
  const findings = [];
  let files = 0;
  async function walk(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      if (["node_modules", ".git", "build", "output", ".react-router", ".playwright", ".playwright-cli", ".vercel"].includes(entry.name)) continue;
      const path = join(directory, entry.name);
      if (entry.isDirectory()) await walk(path);
      else if (entry.isFile()) {
        files++;
        for (const kind of privacyFindings(await readFile(path), terms)) findings.push({ file: relative(root, path).replaceAll("\\", "/"), kind });
      } else findings.push({ file: relative(root, path).replaceAll("\\", "/"), kind: "non-regular-file" });
    }
  }
  await walk(root);
  return { files, findings };
}
