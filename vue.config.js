const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}
const IS_PROD = ['production', 'test'].includes(process.env.NODE_ENV)
let plugins = []
if (process.env.NODE_ENV === 'production') {
    plugins = [
        new UglifyJsPlugin({
            uglifyOptions: {
                warnings: false,
                cache: false,
                sourceMap: false,
                ecma: 8,
                parallel: true,
                exclude: [/node_modules/],
                compress: {
                    drop_debugger: true,
                    drop_console: true
                }
            }
        }),
        // new CompressionPlugin({
        //     test: /\.js$|\.html$|\.css/, // 匹配文件名
        //     threshold: 10240, // 对超过10k的数据进行压缩
        //     deleteOriginalAssets: false // 是否删除原文件
        // }),
        new MiniCssExtractPlugin({
            filename: `css/[name].css`,
            chunkFilename: `css/[name].css`
        })
    ]
}

module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? './' : './',
    outputDir: 'mobile',
    lintOnSave: false,
    devServer: {
        proxy: {
            'api': {
                target: 'https://testm.youbomsa.com/api/v4',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
            'liveApi': {
                target: 'https://testlive.youbomsa.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/liveApi': ''
                }
            }
        },
        https: false,
        hot: true,
        port: 5080,
        progress: true, // 显示打包的进度条
        open: true, // 自动打开浏览器
    },
    css: {
        requireModuleExtension:false,
        extract:IS_PROD,
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({
                        rootValue: 16, // 换算的基数
                        propList: ['*', '!border*', '!border-radius', '!max-width'],
                        minPixelValue: 12
                    }),
                    autoprefixer
                ]
            }
        }
    },
    configureWebpack: {
        resolve: { extensions: [".ts", ".tsx", ".js", ".json"] },  
        performance: {
            hints: false
        },
        optimization: {
            splitChunks: {
                minSize: 200000,
                maxSize: 450000,
                minChunks: 2,
                chunks: 'async',
                cacheGroups: {
                    node_vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        chunks: 'all',
                        priority: 1
                    }
                }
            }
        },
        output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号】
            filename: `js/[name].js`,
            chunkFilename: `js/[name].js`
        },
        module: {
            rules: [
              {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                  appendTsSuffixTo: [/\.vue$/],
                }
              }
            ]
          },
        // resolve: {
        //     alias: {
        //         'vue$': 'vue/dist/vue.esm.js',
        //         'moment$': 'moment/moment.js',
        //         '@':'./src'
        //     },
        //     symlinks: false,
        //     extensions: ['*', '.js', '.vue', '.json'],
        //     modules: ['node_modules']
        // },
        // externals: {
        //     'vue': 'Vue',
        //     'vue-router': 'VueRouter',
        //     'vuex': 'Vuex',
        //     'vue-i18n': 'VueI18n',
        //     'moment': 'moment',
        //     'html2canvas': 'html2canvas',
        //     'vant': 'vant',
        //     // 'protobuf': 'protobuf',
        //     'localStorage': 'localStorage',
        //     'axios': 'axios',
        // },
        plugins: plugins
    },
    chainWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            // 清除css hash版本号
            config.plugin('extract-css').tap(args => [{
                filename: `css/[name].css`,
                chunkFilename: `css/[name].css`
            }])
        }
        const imagesRule = config.module.rule("images")
        imagesRule
            .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, { limit: 10000000 }))
        config.resolve.alias
          .set('@', resolve('src'))
      }
}