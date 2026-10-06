import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "generated/**",
      "uploads/**",
      "reports/**",
      "temp-gemini-vision/**",
      "temp-ocr/**",
      "package-lock.json",
      "pnpm-lock.yaml",
      // Bundled reference datasets, not source. Parsing these with the JSON
      // plugin exhausted the heap (FRANCE.json alone is ~46 MB).
      "FRANCE.json",
      "AUSTRALIA.json",
      "USA.json",
      "australia_nga_all_tables_2025.json",
      "data/*.json",
      "scripts_and_tests/UK(1).json",
    ],
  },
  { files: ["**/*.{js,mjs,cjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.node } },
  tseslint.configs.recommended,
  { files: ["**/*.json"], plugins: { json }, language: "json/json", extends: ["json/recommended"] },
  { files: ["**/*.jsonc"], plugins: { json }, language: "json/jsonc", extends: ["json/recommended"] },
  { files: ["**/*.json5"], plugins: { json }, language: "json/json5", extends: ["json/recommended"] },
  { files: ["**/*.md"], plugins: { markdown }, language: "markdown/gfm", extends: ["markdown/recommended"] },
  { files: ["**/*.css"], plugins: { css }, language: "css/css", extends: ["css/recommended"] },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    rules: {
      // The service layer works with untyped external payloads (ERP multipart
      // responses, OCR output, Climatiq tables). `any` is the deliberate
      // boundary type there and is validated at runtime instead.
      "@typescript-eslint/no-explicit-any": "warn",
      // Express handlers and helper signatures take positional params they do
      // not use; `_`-prefixing marks them intentionally.
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
  {
    // These are CommonJS by definition, so require() is the only option.
    files: ["**/*.cjs"],
    rules: { "@typescript-eslint/no-require-imports": "off" },
  },
]);
