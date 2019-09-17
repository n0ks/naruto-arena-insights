module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        cwd: "babelrc",
        extensions: [".ts", ".tsx", ".js", ".ios.js", ".android.js"],
        root: ["./src"],
        alias: {
          utils: ["./src/utils"],
          src: ["./src/"]
        }
      }
    ]
  ]
};
