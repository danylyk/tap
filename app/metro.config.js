// Learn more https://docs.expo.io/guides/customizing-metro
const {getDefaultConfig} = require("expo/metro-config");
const {withUniwindConfig} = require("uniwind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

["js", "jsx", "json", "ts", "tsx", "cjs", "mjs"].forEach((ext) => {
  if (!config.resolver.sourceExts.includes(ext)) {
    config.resolver.sourceExts.push(ext);
  }
});

["glb", "gltf", "png", "jpg"].forEach((ext) => {
  if (!config.resolver.assetExts.includes(ext)) {
    config.resolver.assetExts.push(ext);
  }
});

module.exports = withUniwindConfig(config, {
  cssEntryFile: "./public/assets/global.css",
});
