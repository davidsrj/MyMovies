const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');

const defaultConfig = getDefaultConfig(__dirname);

const config = mergeConfig(defaultConfig, {
  resolver: {
    extraNodeModules: {
      '@app': __dirname + '/src/app',
      '@features': __dirname + '/src/features',
      '@shared': __dirname + '/src/shared',
      '@hooks': __dirname + '/src/hooks',
      '@components': __dirname + '/src/components',
    },
  },
});

module.exports = withNativeWind(config, { input: './global.css' });
