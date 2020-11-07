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
      // cssファイルを読込
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
      // 画像ファイルを読込
      {
        test: /\.(png|jpg)/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
              name: "images/[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.pug/,
        use: [
          {
            loader: "html-loader",
          },
          {
            loader: "pug-html-loader",
            options: {
              pretty: true,
            },
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
      template: "./src/templates/index.pug",
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/access.pug",
      filename: "access.html",
    }),

    new CleanWebpackPlugin(),
  ],
};
