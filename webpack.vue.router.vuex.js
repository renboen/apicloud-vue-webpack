const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
//当指定多个入口进行公共资源提取的时候，打包出来的json文件可能有问题。最好是单个指定进行多次命令打包。
//注意：打包后的文件必须在入口模板中手动引入！！！！！！

var vue_common = [
    "vue",
    'vue-router',
    'vuex',
];
// var lo_common = [
//     "lodash"
// ];
module.exports = {
    // mode: "development",
    mode: "production",
    entry: {
        vue_common: vue_common,
        // lo_common,
    },
    output: {
        path: path.join(__dirname, "dist/common"),
        filename: "[name].js",
        library: "[name]_[hash]"
    },
    plugins: [
        new CleanWebpackPlugin(["dist/common"]),
        new webpack.DllPlugin({
            path: path.join(__dirname, "dist/common", "vue_common.json"),
            name: "[name]_[hash]",
            context: __dirname,
        }),
        // new webpack.DllPlugin({
        //     path: path.join(__dirname, "dist/common", "lo_common.json"),
        //     name: "[name]_[hash]",
        //     context: __dirname
        // })
    ]
};