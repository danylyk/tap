// https://docs.expo.dev/guides/using-eslint/
const {defineConfig} = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
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
    },
  },
  {
    ignores: ["dist/*", "node_modules/*", ".expo/*"],
  },
]);
