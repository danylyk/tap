// https://docs.expo.dev/guides/using-eslint/
const {defineConfig} = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
const simpleImportSort = require("eslint-plugin-simple-import-sort");
const unusedImports = require("eslint-plugin-unused-imports");

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
    },
    rules: {
      yoda: ["error"],
      semi: ["error"],
      curly: ["error"],
      quotes: ["error", "double"],
      "func-style": ["error", "declaration"],
      "prefer-arrow-callback": ["error"],
      "prefer-destructuring": ["error"],
      "prefer-rest-params": ["error"],
      "consistent-return": ["error"],
      "prefer-template": ["error"],
      "no-else-return": ["error"],
      "import/no-anonymous-default-export": ["off"],
      "jsx-a11y/alt-text": ["off"],
      "react/jsx-curly-brace-presence": ["error", {props: "never"}],
      "prettier/prettier": ["warn"],
      "simple-import-sort/imports": ["warn"],
      "unused-imports/no-unused-imports": ["warn"],
    },
  },
  {
    ignores: [
      "dist/*",
      "node_modules/*",
      ".expo/*",
      "expo-env.d.ts",
      "uniwind-types.d.ts",
    ],
  },
]);
