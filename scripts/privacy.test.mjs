import test from "node:test";
import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import { privacyFindings } from "./privacy.mjs";

test("外部私有词拦截明文和JSON转义，结果不暴露词值", () => {
  const phrase = "ISOLATED_PRIVATE_" + "SENTINEL";
  assert.deepEqual(privacyFindings(Buffer.from(phrase), [phrase]), ["private-term-1"]);
  assert(!JSON.stringify(privacyFindings(Buffer.from(phrase), [phrase])).includes(phrase));
  const path = ["Q:", "Users", "isolated-user"].join("\\");
  assert(privacyFindings(Buffer.from(JSON.stringify(path)), [path]).includes("private-term-1"));
});

test("通用凭据、私人路径与非示例邮箱需审核，测试示例不冒充真人", () => {
  assert(privacyFindings(Buffer.from("ghp_" + "X".repeat(36))).includes("github-token"));
  assert(privacyFindings(Buffer.from(["Q:", "Users", "isolated"].join("/"))).includes("local-user-path"));
  assert(privacyFindings(Buffer.from("sample@" + "mail.invalid-host.net")).includes("email-needs-review"));
  assert.deepEqual(privacyFindings(Buffer.from("user@example.com")), []);
});
