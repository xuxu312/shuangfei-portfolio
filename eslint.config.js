import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig([
  {
    ignores: ["node_modules/**", "build/**", ".react-router/**", "output/**", ".playwright/**", ".playwright-cli/**"],
  },
  {
    files: ["src/**/*.{ts,tsx}", "*.config.{js,ts}"],
    extends: [js.configs.recommended, tseslint.configs.recommended],
  },
  {
    files: ["scripts/**/*.mjs"],
    extends: [js.configs.recommended],
  },
]);
