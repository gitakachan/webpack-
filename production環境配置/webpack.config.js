const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //打包html
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //抽取出css
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); //壓縮css
const TerserPlugin = require("terser-webpack-plugin"); //壓縮js

//設置nodejs環境變量，決定要用package.jso中browserslist的哪個環境
process.env.NODE_ENV = "production"; //不寫也是會用預設的生產模式，若改成"development則變為開發模式"

module.exports = {
  entry: "./src/main.js",

  output: {
    filename: "bundle.js",
    path: resolve(__dirname, "dist"),
    assetModuleFilename: "images/[hash:10][ext]", //把圖片統一放到這裡，且以哈希值前十位命名
  },

  module: {
    rules: [
      //loader 配置
      //scss -> css
      {
        test: /\.s[ac]ss$/,

        use: [
          MiniCssExtractPlugin.loader, //取代style-loader，會把css單獨提取出來
          "css-loader",
          {
            loader: "postcss-loader", //處理css兼容性 需要在package.json中定義browserslist!
            options: {
              postcssOptions: {
                //打包后有兼容性样式代码
                plugins: [require("postcss-preset-env")()],
              },
            },
          },
          "scss-loader",
        ],
      },
      //樣式中的圖片
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      //HTML中的圖片
      {
        test: /\.html$/,
        loader: "html-withimg-loader",
      },
      //處理其他資源
      {
        exclude: /\.(html|js|css|scss|jpg|png|gif)/,
        loader: "file-loader",
        options: {
          name: "[hash:10].[ext]", //若用[name].[ext]則表示用原本檔名命名
          outputPath: "media", //打包後放在media資料夾
        },
      },
      //js兼容性處理 需要babel-loader @babel/core @babel/preset-env
      //corejs 指定兼容到哪個版本(要下載corejs)
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                useBuiltIns: "usage",
                //指定corejs版本
                corejs: {
                  version: 3,
                },
                //指定兼容做到哪
                targets: {
                  chrome: "60",
                  firefox: "60",
                  ie: "9",
                  safari: "10",
                  edge: "17",
                },
              },
            ],
          ],
        },
      },
    ],
  },
  optimization: {
    minimize: true, //在開發環境下啟用 CSS 優化
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin({
        parallel: true, // 可省略，默认开启并行
        terserOptions: {
          toplevel: true, // 最高级别，删除无用代码
          ie8: true,
          safari10: true,
        },
      }),
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      //複製"./src/index.html" 文件，並自動引入打包輸出的所有資源
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "css/main.css", //對輸出的css進行位置和名稱配置(optional)
    }),
  ],
  mode: "production",
  devServer: {
    contentBase: "./dist",
  },
};
