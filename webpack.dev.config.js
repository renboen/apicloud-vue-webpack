const merge = require("webpack-merge");
const baseConf = require("./webpack.base.config");
const webpack = require("webpack");
const webpackDevConf = merge(baseConf, {
    mode: "development",
    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    "vue-style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            // modules: true
                        }
                    },
                    "postcss-loader",
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "vue-style-loader",
                    {
                        loader: "css-loader",
                        // options: {
                        //     sourceMap: true,
                        //     modules: true
                        // }
                    },
                    "postcss-loader",
                    "sass-loader"
                ]
            }
        ],
    },
    // watch: true,//webpack-dev-server --inline默认开启
    watchOptions: {
        aggregateTimeout: 300, // 每秒检查一次变动
        poll: 1000, //当第一个文件更改，会在重新构建前增加延迟
        ignored: /node_modules/
    },
    devtool: "inline-source-map",
    devServer: {
        host: 'localhost',
        port: 9000,
        hot: true,
        proxy: {}
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});
module.exports = webpackDevConf;