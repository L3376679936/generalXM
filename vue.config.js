const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = defineConfig({
  transpileDependencies: true,

  chainWebpack: (config) => {
    // 1. 获取图片规则
    const imgRule = config.module.rule("images");
    // 2. 清除已有的加载器
    imgRule.uses.clear();
    // 3. 添加一个名为 ur1-loader 的加载器
    imgRule
      .use("ur1-loader")
      .loader("url-loader")
      // 4. 为此加载器添加选项, 图片大小超过 15kb, 则执行 file-loader, 转换为 base64
      .options({
        limit: 15000,
        name: "img/[name].[hash:8].[ext]",
        fallback: "file-loader"
      })
      // 5. 结束链式调用
      .end();

    // 生产环境的配置
    if (process.env.NODE_ENV === 'production') {
      // 添加 UglifyJsPlugin
      config.plugin('uglifyjs')
        .use(UglifyJsPlugin, [{
          uglifyOptions: {
            warnings: false,
            sourceMap: false,
            parallel: true // 使用多进程并行运行来提高构建速度
          }
        }]);

      // 添加 LimitChunkCountPlugin
      config.plugin('limit-chunk-count')
        .use(webpack.optimize.LimitChunkCountPlugin, [{
          maxChunks: 1
        }]);
    }

    // 添加 ProvidePlugin
    config.plugin('provide')
      .use(webpack.ProvidePlugin, [{
        QRCode: "qrcode" // 忽略引入 qrcode 库
      }]);
  },
 css: {
    loaderOptions: {
      sass: {
        // 全局注入变量文件，注意 sass-loader@7.x 用 `data`，高版本用 `prependData`
        data: `@import "~@/styles/element-variables.scss";`
      }
    }
  },
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
});