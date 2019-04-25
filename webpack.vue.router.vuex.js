var path = require("path"),
    webpack = require("webpack");
var vendors = [
    'vue',
    'vue-router',
    'vuex',
    "lodash"
];
module.exports = {
    // mode: "development",
    mode: "production",
    entry: {
        vendor: vendors
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "Dll.js",
        library: "[name]_[hash]"
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, "dist", "manifest.json"),
            name: "[name]_[hash]",
            context: __dirname
        })
    ]
};