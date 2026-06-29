import {defineConfig} from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/app/**/*.ts"
  ],
  format: ["esm"],
  outDir: "dist",
  clean: true,
});
