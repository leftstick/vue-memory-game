var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './js/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash].bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue',
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                loader: 'babel?{"presets":["es2015"]}',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.(png)$/,
                loader: 'file'
            }
        ]
    },
    vue: {
        loaders: {
            js: 'babel?{"presets":["es2015"]}'
        }
    },
    resolve: {
        root: [
            path.resolve(__dirname),
            path.resolve(__dirname, 'js')
        ],
        extensions: [
            '',
            '.js',
            '.vue'
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: 'body',
            template: 'index.html_vm',
            favicon: 'img/favicon.ico',
            hash: false
        })
    ]
};
