const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const open = require('opn');//打开浏览器
const chalk = require('chalk');// 改变命令行中输出日志颜色插件

module.exports = {
  // 入口文件配置项
  entry: path.resolve(__dirname, 'src/index.js'),
  // 输出文件配置项
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: ""
  },
  // webpack4.x 环境配置项
  mode: "development",
  // 插件配置项
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',//输出文件的名称
      template: path.resolve(__dirname, 'src/index.html'),//模板文件的路径
      title: 'webpack-主页',//配置生成页面的标题
    }),
  ],

  // 开发服务配置项
  devServer: {
    port: 8080,
    contentBase: path.resolve(__dirname, 'dist'),
    historyApiFallback: true,
    host: '0.0.0.0',
    overlay: true,
    after () {
      open('http://localhost:' + this.port)
        .then(() => {
          console.log(chalk.cyan('成功打开链接： http://localhost:' + this.port));
        })
        .catch(err => {
          console.log(chalk.red(err));
        });
    }
  },


  // 加载器 loader 配置项
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
            config: {
              path: 'postcss.config.js'
            }
          }
        },
        {
          loader: 'sass-loader',
          options: { sourceMap: true }
        }
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: 'postcss.config.js'
              }
            }
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: 'postcss.config.js'
              }
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: true,
            }
          }
        ]
      },
      {
        test: /\.(png|jp?g|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,        // 小于8192字节的图片打包成base 64图片
              name: 'images/[name].[hash:8].[ext]',
              publicPath: ''
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        // 文件依赖配置项——字体图标
        test: /\.(woff|woff2|svg|eot|ttf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            limit: 8192,
            name: 'fonts/[name].[ext]?[hash:8]',
            publicPath: ''
          },
        }],
      }, {
        // 文件依赖配置项——音频
        test: /\.(wav|mp3|ogg)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            limit: 8192,
            name: 'audios/[name].[ext]?[hash:8]',
            publicPath: ''
          },
        }],
      }, {
        // 文件依赖配置项——视频
        test: /\.(ogg|mpeg4|webm)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            limit: 8192,
            name: 'videos/[name].[ext]?[hash:8]',
            publicPath: ''
          },
        }],
      },
    ]
  },
};

