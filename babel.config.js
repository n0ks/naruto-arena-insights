module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        cwd: "babelrc",
        extensions: [".ts", ".tsx", ".js", ".ios.js", ".android.js"],
        // root: ["./src"],
        alias: {
          "@app": ["./src"]
          // utils: ["./src/utils/*"],
          // components: ["./src/components/*"],
          // screen: ["./src/screen/*"],
          // hooks: ["./src/hooks/*"],
          // navigation: ["./src/navigation/*"]
        }
      }
    ]
  ]
};
