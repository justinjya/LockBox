module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module-resolver', {
        alias: {
          "@fonts": "./assets/fonts",
          "@values": "./values",
          "@components": "./src/components",
          "@screens": "./src/screens",
        }
      }]
    ]
  };
};