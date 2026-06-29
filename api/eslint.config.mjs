import boundaries from "eslint-plugin-boundaries";
import tsParser from "@typescript-eslint/parser";
import tseslint from "@typescript-eslint/eslint-plugin";

export default [
  {
    files: ["src/**/*.{ts,js}"],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },

    plugins: {
      boundaries,
      "@typescript-eslint": tseslint,
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
    },
  },

  {
    files: ["src/**/*.{ts,js}"],

    plugins: {
      boundaries,
    },

    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },

      "boundaries/include": ["src/**/*"],

      "boundaries/elements": [
        {type: "lib", pattern: "src/lib/**/*"},
        {type: "element", pattern: "src/elements/**/*"},
        {type: "app", pattern: "src/app/**/*"},
        {
          mode: "full",
          type: "module",
          pattern: "src/modules/*/**/*",
          capture: ["name", "_", "file"],
        },
      ],
    },

    rules: {
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            {
              from: "app",
              allow: ["lib", "element", ["module", {file: "index.*"}]],
            },
            {
              from: "module",
              allow: ["lib", "element", ["module", {name: "${from.name}"}]],
            },
            {
              from: "element",
              allow: ["element", "lib", ["module", {file: "index.*"}]],
            },
            {
              from: "lib",
              allow: ["element", "lib", ["module", {file: "index.*"}]],
            },
          ],
        },
      ],
    },
  },

  {
    ignores: ["node_modules/**", "dist/**", "build/**"],
  },
];
