const webpack = require('webpack')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('css-minimizer-webpack-plugin')

const path = require('path')

module.exports = function(env, argv) {

  return {
    entry: ['./js/main.js', './scss/main.scss'],
    output: {
        path: path.resolve('../public', 'compiled_assets'),
        filename: '../js/main.js',
        clean: true,
    },
    performance: {
        hints: false
    },
    devtool: argv.mode === 'production' ? false : 'source-map',
    ignoreWarnings: [
        /./
    ],
    optimization: {
        minimizer: [
        new TerserPlugin({
            parallel: true,
            extractComments: true
        }),
        new OptimizeCSSAssetsPlugin({})
        ]
    },
    stats: {
        hash: false,
        version: false,
        timings: false,
        children: false,
        chunks: false,
        modules: false,
        source: false,
        publicPath: false,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader, options: {
                            }
                        },
                        {
                            loader: 'css-loader', options: {
                                sourceMap: argv.mode === 'production' ? false : true
                            }
                        },
                        {
                            loader: 'postcss-loader', options: {
                                sourceMap: argv.mode === 'production' ? false : true
                            }
                        },
                        {
                            loader: 'sass-loader',  options: {
                                sourceMap: argv.mode === 'production' ? false : true
                            }
                        }
                    ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '../css/[name].css'
        }),
        new BrowserSyncPlugin({
            files: ['../public/*.html', '../public/*.php'],
            host: 'localhost',
            port: 3000,
            server: { baseDir: ['../public'] }
        })
    ]
  }

}
