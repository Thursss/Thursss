const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //将CSS代码提取为独立文件的插件
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"); //CSS模块资源优化插件
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    index: path.resolve(__dirname, "./src/index.js"),
    // about: path.resolve(__dirname, "./src/about.js"),
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "./dist"),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/, //排除node_modules文件夹
        use: [
          {
            loader: MiniCssExtractPlugin.loader, //建议生产环境采用此方式解耦CSS文件与js文件
          },
          {
            loader: "css-loader", //CSS加载器
            options: { importLoaders: 2 }, //指定css-loader处理前最多可以经过的loader个数
          },
          {
            loader: "postcss-loader", //承载autoprefixer功能
          },
          {
            loader: "sass-loader", //SCSS加载器，webpack默认使用node-sass进行编译
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "webpack dev",
      template: path.resolve(__dirname, "./public/index.html"),
      filename: "index.html",
      templateParameters: {
        param1: "index",
      },
      chunks: ["index"],
      minify: {
        // removeComments: true,
        // collapseWhitespace: true,
        // collapseInlineTagWhitespace: true,
      },
    }),
    // new HtmlWebpackPlugin({
    //   title: "webpack dev",
    //   template: path.resolve(__dirname, "./public/about.html"),
    //   filename: "about.html",
    //   templateParameters: {
    //     param1: "about",
    //   },
    //   chunks: ["about"],
    //   minify: {
    //     // removeComments: true,
    //     // collapseWhitespace: true,
    //     // collapseInlineTagWhitespace: true,
    //   },
    // }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }), //为抽取出的独立的CSS文件设置配置参数
  ],
  optimization: {
    //对生成的CSS文件进行代码压缩 mode='production'时生效
    minimizer: [new OptimizeCssAssetsPlugin()],
  },
};
