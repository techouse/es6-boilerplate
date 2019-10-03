const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Fiber = require('fibers')
const {VueLoaderPlugin} = require('vue-loader')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const env = process.env.NODE_ENV
const npm_config_argv = JSON.parse(process.env.npm_config_argv)
const isWatch = npm_config_argv.remain.some(el => el.startsWith("--watch"))
const sourceMap = env === 'development'
const production = env === 'production'

const config = {
    mode: env,
    target: 'web',
    entry: {
        main: ['./src/main.js',
            './src/scss/main.scss']
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].bundle.js',
        chunkFilename: '[name].js'
    },
    optimization: {},
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json'],
        modules: ['./node_modules', './src/modules', './src/components']
    },
    stats: {
        colors: true
    },
    devtool: sourceMap ? 'cheap-module-eval-source-map' : undefined,
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(scss|sass|css)$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {sourceMap}
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap,
                            importLoaders: 2
                        }
                    },
                    {loader: "postcss-loader", options: {sourceMap}},
                    'resolve-url-loader',
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap,
                            implementation: require("sass"),
                            sassOptions: {
                                fiber: Fiber,
                                indentWidth: 4,
                                includePaths: [path.resolve(__dirname, "resources/scss")],
                            },
                        }
                    },]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/',
                        publicPath: '/build/fonts/',
                    }
                }]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin({cleanStaleWebpackAssets: !isWatch}),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: 'css/[name].css'
        })
    ]
}


if (production) {
    config.optimization.minimizer = [
        new OptimizeCSSAssetsPlugin(),
        new TerserPlugin({
            cache: true,
            parallel: true,
        }),
    ]
}

module.exports = config