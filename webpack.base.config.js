// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
const webpack = require("webpack")

module.exports = {
    entry: {
        index: "./src/index.js",
    },
    output: {
        filename: "js/[name][hash:8].js",
        chunkFilename: 'js/[name][hash:8].js',
        path: path.resolve(__dirname, "./dist"),
        // publicPath: "/dist/",
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            "@": path.resolve(__dirname, "src")
        },
        extensions: [".vue", ".js", ".scss", ".css", ".json"]
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        hot: true,
        open: true,
        port: 9000,
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            // automaticNameDelimiter: '~',
            // name: true,
            cacheGroups: {
                //htmlwebpackPlugin在多入口的时候必须把该name值写入chucks中,否则页面会出错,对应output.chunkFilename的格式
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    name: "vendors"
                },
                styles: {
                    name: 'styles',
                    test: /\.(css|scss)$/,
                    chunks: 'all',
                    enforce: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                    name: "default"
                }
            },

        }
    },
    module: {
        noParse: /jquery/,
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // {
            //     test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            //     loader: 'url-loader',
            //     options: {
            //         limit: 10000,
            //         name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            //     }
            // },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules|public)/,
            },
            {
                test: /\.(png|jpg|gif)$/,
                exclude: /public/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: '[name][hash:8].[ext]',
                        outputPath: "image"
                    },
                }]
            }
        ]
    },
    // 通过判断splitChunks.chunks的值来确定哪些模块会提取公共模块，该配置一共有三个选项，initial、async、 all。
    // 默认为async，表示只会提取异步加载模块的公共代码，initial表示只会提取初始入口模块的公共代码，all表示同时提取前两者的代码。
    plugins: [
        // new webpack.DllReferencePlugin({
        //     manifest: require("./dist/common/lo_common.json")
        // }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./dist/common/vue_common.json')
        }),
        new HTMLWebpackPlugin({
            title: "Title",
            template: "./src/index.html",
            filename: "index.html",
            chunks: ['index', "vendors", "styles", "default"],
            type: "HTMLWebpackPlugin"
        }),
        new VueLoaderPlugin(),
        new CleanWebpackPlugin("dist", {
            exclude: ["common"]
        }),
        new CopyPlugin([{
            from: path.resolve(__dirname, "public"),
            to: path.resolve(__dirname, "dist/public")
        }]),
    ]
}