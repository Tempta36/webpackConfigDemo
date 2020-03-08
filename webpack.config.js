const path = require("path");
const Webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
//commonsChunkPlugin
//definePlugin
//懒加载

console.log(process.env.NODE_ENV);
const devMode = process.env.NODE_ENV !== "production";

const config = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    // path.join() 去拼接路径
    // __dirname 当前文件的绝对路径
    filename: "bundle.js",
    path: path.join(__dirname, "./dist")
  },
  devServer: {
    hot: true
    // contentBase: "./exampleDist"  ??
  },
  module: {
    rules: [
      {
        // sass-loader node-sass两个依赖都需要安装
        test: /\.(scss|sass)$/,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[hash].[ext]",
              outputPath: "fonts"
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 5000,
              outputPath: "images/",
              name: "[name]-[hash:4].[ext]",
              fallback: "file-loader"
            }
          }
        ]
      },
      {
        test: /\.js$/,
        loader: "babel-loader"
      }
    ]
  },
  optimization: {
    minimizer: [new TerserJSPlugin(), new OptimizeCssAssetsPlugin()]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html"
    }),
    new Webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, "./src/logo.png"),
        to: "images/"
      }
    ]),
    new MiniCssExtractPlugin({
      filename: devMode ? "[name].css" : "[name].[hash].css",
      chunkFilename: devMode ? "[id].css" : "[id].[hash].css"
    })
  ]
};

module.exports = config;
