const { getDefaultConfig: getExpoConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getExpoConfig(__dirname, { isCSSEnabled: true });


module.exports = withNativeWind(config, { input: "./global.css" });