import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  js.configs.recommended,
  {
    ignores: ["dist/**"],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parser: tsParser,
      globals: {
        document: "readonly",
        window: "readonly",
        localStorage: "readonly",
        fetch: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "off",
      "no-undef": "off",
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
  },
];
