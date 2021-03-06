const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  mode: "development", // 出力ファイルのモードを選択。
  devtool: "source-map", // コードを分かりやすくする。
  entry: "./src/javascripts/main.js",
  output: {
    path: path.resolve(__dirname, "./dist"), // 絶対パスに変換する。
    filename: "./javascripts/main.js",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.vue/,
        exclude: /node_modules/, // 対象外のファイル
        use: [
          {
            loader: "vue-loader",
          },
        ],
      },
      // jsファイルをトランスパイル(ES6 → ES5へ変換する)
      {
        test: /\.js/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                ["@babel/preset-env", { targets: "> 0.25%, not dead" }],
                "@babel/preset-react",
              ],
            },
          },
        ],
      },
      // cssファイルを読込
      {
        test: /\.(css|sass|scss)/,
        use: [
          // loaderは下から適用される為、記述する順番に注意。
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true, // 元のsassファイルを表示させる。 動作が重くなるので本番環境ではfalseにする。
            },
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      // 画像ファイルを読込
      {
        test: /\.(png|jpg|jpeg)/,
        use: [
          {
            loader: "file-loader",
            options: {
              esModule: false,
              name: "images/[name].[ext]",
            },
          },
          {
            loader: "image-webpack-loader", // 自動的に画像を圧縮
            options: {
              mozjpeg: {
                progressive: true,
                quality: 50,
              },
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
    new VueLoaderPlugin(),
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
    new HtmlWebpackPlugin({
      template: "./src/templates/members/taro.pug",
      filename: "members/taro.html",
    }),

    new CleanWebpackPlugin(),
  ],
};
