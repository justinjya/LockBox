module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module-resolver', {
        alias: {
          "@fonts": "./assets/fonts",
          "@values": "./src/values",
          "@components": "./src/components",
          "@screens": "./src/screens",
          "@utils": "./src/utils",
          "@navigation": "./src/navigation",
        }
      }]
    ]
  };
};