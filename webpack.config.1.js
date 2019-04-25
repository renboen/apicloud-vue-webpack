const HTMLWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require("webpack")
module.exports = {
    // mode: "production",
    mode: "development",
    entry: {
        index: "./src/index.js",
        // another: "./src/bgg.bundle.js"
    },
    output: {
        filename: "js/[name].[hash].js",
        chunkFilename: 'js/[name].[hash:8].js',
        path: path.resolve(__dirname, "./dist"),
    },
    optimization: {
        splitChunks: {
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        }
    },
    // devtool: 'inline-cheap-module-source-map',
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            }, {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    // options: {
                    //     cacheDirectory: true
                    // }
                },
                exclude: "/node_modules/"
            },

            {
                test: /\.css$/,
                use: [process.env.NODE_ENV !== 'production' ?
                    'vue-style-loader' :
                    MiniCssExtractPlugin.loader, "css-loader"
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: '[name][hash:8].[ext]',
                        outputPath: "image"
                    },
                }]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }
        ]
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, 'src'),
        },
        extensions: ['.js', ".vue", '.css', '.json']
    },
    devServer: {
        // contentBase: path.resolve(__dirname, 'dist'),

        hot: true,
        port: 3000,
        open: true
    },
    watchOptions: {
        aggregateTimeout: 500,
        ignored: /node_modules/
    },
    plugins: [
        new HTMLWebpackPlugin({
            title: "Title",
            template: "./src/index.html",
            filename: "index.html",
        }),
        // new CleanWebpackPlugin(["dist"]),
        // new MiniCssExtractPlugin({
        //     // Options similar to the same options in webpackOptions.output
        //     // both options are optional
        //     filename: "css/[name].css",
        //     chunkFilename: "[id].css",
        // }),
        new VueLoaderPlugin()
    ]
}