const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/javascripts/main.js",
  output: {
    path: path.resolve(__dirname, "./dist"), // 絶対パスに変換する。
    filename: "./javascripts/main.js",
  },
  module: {
    rules: [
      {
        test: /\.css/, // cssファイルがあったら以下を使用する。
        use: [
          // loaderは下から適用される為、記述する順番に注意。
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./stylesheets/main.css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/index.html",
    }),
    new CleanWebpackPlugin(),
  ],
};
