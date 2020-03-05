const path = require("path");

const config = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    // path.join() 去拼接路径
    // __dirname 当前文件的绝对路径
    filename: "bundle.js",
    path: path.join(__dirname, "./dist")
  },
  module: {
    rules: [
      {
        // sass-loader node-sass两个依赖都需要安装
        test: /\.(scss|sass)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: "/.(woff|woff2|eot|ttf|otf)$/",
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "./font/",
              name: "[name]-[hash:4].[ext]"
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
      }
    ]
  }
};

module.exports = config;
