const path = require("path");
const webpack = require("webpack");
const BinPath = path.resolve("./wwwroot/js");
const AppPath = path.resolve("./Client/app.tsx");
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;

module.exports = {
    entry: {
        app: [
            AppPath]
    },
    output: {
        filename: "[name].min.js",
        publicPath: "js/",
        path: BinPath
    },
    mode: "development",
    module: {
        rules: [{
            exclude: /node_modules/,
            test: /\.tsx?$/,
            include: /Client/,
            loader: ["awesome-typescript-loader"]
        }]
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    devtool: "inline-source-map",
    plugins: [
        new CheckerPlugin()
    ]
}