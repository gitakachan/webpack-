const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


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
      //css
      {
        test: /\.s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader, //取代style-loader，會把css單獨提取出來
          "css-loader",
          "sass-loader",
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
          name: "[hash:10].[ext]",
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      //複製"./src/index.html" 文件，並自動引入打包輸出的所有資源
      template: "./src/index.html",
     
    }),
    new MiniCssExtractPlugin(),
  ],
  mode: "development",
  devServer: {
    contentBase: "./dist",
  },
};
