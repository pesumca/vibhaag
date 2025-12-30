import js from "@eslint/js";
import importPlugin from "eslint-plugin-import";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  js.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parser: tsParser,
      globals: {
        console: "readonly",
        process: "readonly",
      },
    },
    plugins: {
      import: importPlugin,
      "@typescript-eslint": tseslint,
    },
    rules: {
      "import/order": ["warn", { "newlines-between": "always" }],
      "no-unused-vars": "off",
    },
  },
];
