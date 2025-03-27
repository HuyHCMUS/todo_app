const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Add this configuration for path aliases
config.resolver.alias = {
  '@': __dirname + '/app'
};

module.exports = withNativeWind(config, { input: './app/global.css' });
