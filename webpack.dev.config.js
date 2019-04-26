const merge = require("webpack-merge");
const baseConf = require("./webpack.base.config");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");

let showPage = process.argv.slice(-1)[0].replace("--", "./src/");
console.log(showPage, 'pppp')
const webpackDevConf = env => {
    console.log("object", env.build);
    if (env.build) {
        //运行命令进行全量打包的时候env.build为1;npm run build:dev
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
    } else {
        //运行命令进行预览某个页面的时候build=0
        baseConf.entry = {
            index: showPage + ".js",
        };
        console.log(baseConf.entry, "pppp");
        let p = baseConf.plugins.filter(item => item.options ? item.options.type == "HTMLWebpackPlugin" ? false : true : true);
        p.push(
            new HTMLWebpackPlugin({
                title: "Title",
                template: showPage + ".html",
                filename: "index.html",
            })
        )
        baseConf.plugins = p;
        console.log(p, "000000000000000");

    }
    console.log(env.build)
    return merge(baseConf, {
        mode: "development",
        module: {
            rules: [{
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        'vue-style-loader',
                        'css-loader',
                        'postcss-loader',
                        'sass-loader',
                    ],
                },

            ]
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
    })
};
module.exports = webpackDevConf;