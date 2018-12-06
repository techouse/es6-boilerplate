const path                    = require('path'),
      CleanWebpackPlugin      = require('clean-webpack-plugin'),
      MiniCssExtractPlugin    = require('mini-css-extract-plugin'),
      nodeSassMagicImporter   = require('node-sass-magic-importer'),
      {VueLoaderPlugin}       = require('vue-loader'),
      OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
      UglifyJsPlugin          = require('uglifyjs-webpack-plugin'),
      env                     = process.env.NODE_ENV,
      sourceMap               = env === 'development',
      minify                  = env === 'production'

const config = {
    mode:         env,
    target:       'web',
    entry:        {
        main: ['./src/main.js',
               './src/scss/main.scss']
    },
    output:       {
        path:     path.resolve(__dirname, 'build'),
        filename: '[name].bundle.js'
    },
    optimization: {},
    resolve:      {
        alias:      {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json'],
        modules:    ['./node_modules',
                     './src/modules',
                     './src/components']
    },
    stats:        {
        colors: true
    },
    devtool:      sourceMap ? 'cheap-module-eval-source-map' : undefined,
    module:       {
        rules: [
            {
                test:    /\.m?js$/,
                exclude: /node_modules/,
                loader:  'babel-loader'
            },
            {
                test:    /\.vue$/,
                exclude: /node_modules/,
                loader:  'vue-loader'
            },
            {
                test: /\.(scss|sass|css)$/i,
                use:  [{loader: MiniCssExtractPlugin.loader, options: {sourceMap}},
                       {loader: 'css-loader', options: {sourceMap}},
                       {loader: 'postcss-loader', options: {sourceMap}},
                       'resolve-url-loader',
                       {loader: 'sass-loader', options: {sourceMap, importer: nodeSassMagicImporter()}},]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use:  [{
                    loader:  'file-loader',
                    options: {
                        name:       '[name].[ext]',
                        outputPath: 'fonts/',
                        publicPath: '/static/dist/fonts/',
                    }
                }]
            }
        ]
    },
    plugins:      [
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(['./dist']),
        new MiniCssExtractPlugin({filename: 'css/[name].css'})
    ]
}


if (minify) {
    config.optimization.minimizer = [
        new OptimizeCSSAssetsPlugin(),
        new UglifyJsPlugin({
                               cache:    true,
                               parallel: true,
                           }),
    ]
}

module.exports = config