module.exports = function (api) {
  // Disable babel caching so .env file changes are always detected
  api.cache(false);

  return {
    presets: ['module:@react-native/babel-preset', 'nativewind/babel'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@app': './src/app',
            '@features': './src/features',
            '@shared': './src/shared',
            '@hooks': './src/hooks',
            '@assets': './assets',
            '@navigation': './src/navigation',
            '@screens': './src/screens',
            '@components': './src/components',
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
