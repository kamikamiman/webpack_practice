const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"), // 絶対パスに変換する。
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.css/, // cssファイルがあったら以下を使用する。
        use: [
          // loaderは下から適用される為、記述する順番に注意。
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
};
