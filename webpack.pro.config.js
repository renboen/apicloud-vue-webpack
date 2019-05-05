const merge = require('webpack-merge');
const baseConf = require("./webpack.base.config");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const entryFiles = require("./src/page/index");
let entryAdd = entryFiles.reduce((add, current) => {
    add = {
        ...add,
        ...current
    }
    return add
}, {});
//读取src/page下的所有页面动态设置打包入口，注意默认有一个入口文件为src/index.js
baseConf.entry = {
    ...baseConf.entry,
    ...entryAdd
};
//动态设置模板
for (key in entryAdd) {
    baseConf.plugins.push(
        new HTMLWebpackPlugin({
            title: "Title",
            template: entryAdd[key].replace(".js", ".html"),
            filename: key + ".html",
            //chucks必须包含公共提取的模块的名称
            chunks: [key, "vendors", "styles", "default"],
            // exclude: []
        })
    )
}
const webpackProConfig = merge(baseConf, {
    mode: "production",
    module: {
        rules: [{
            test: /\.(sa|sc|c)ss$/,
            use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: "../",
                    }
                },
                'css-loader',
                'postcss-loader',
                'sass-loader',
            ],
        }]
    },
    plugins: [new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash].css",
            chunkFilename: "[id].css"
        }),
        new webpack.DefinePlugin({
            DEBUG: JSON.stringify(false)
        })
    ]
})
module.exports = webpackProConfig;