const merge = require('webpack-merge');
const baseConf = require("./webpack.base.config");
const webpack = require("webpack");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpackProConfig = merge(baseConf, {
    mode: "production",
    module: {
        rules: [{
                test: /\.css$/,
                exclude: /public/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        // options: {
                        //     // sourceMap: true,
                        //     // modules: true,
                        //     localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        // }
                    },
                    "postcss-loader"
                ]
            },
            {
                test: /\.scss$/,
                exclude: /public/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    "postcss-loader",
                    'sass-loader'
                ]
            }
        ]
    },

    plugins: [new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash].css",
        //     chunkFilename: "[id].css"

    })]
})
module.exports = webpackProConfig;