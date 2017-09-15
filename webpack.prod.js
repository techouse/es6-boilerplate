const webpack      = require('webpack'),
      merge        = require('webpack-merge'),
      MinifyPlugin = require('babel-minify-webpack-plugin'),
      common       = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: 'cheap-module-source-map',
    plugins: [
        new MinifyPlugin(),
        new webpack.DefinePlugin({
                                     'process.env': {
                                         'NODE_ENV': JSON.stringify('production')
                                     }
                                 })
    ],
    entry:   {
        main: ['babel-polyfill',
               './src/main.js']
    },
    resolve: {
        modules: ['./node_modules',
                  './src/modules']
    },
    module:  {
        loaders: [
            {
                test:   /\.js$/,
                loader: 'babel-loader',
                query:  {
                    presets: ['es2015'],
                    plugins: ['transform-es2015-arrow-functions',
                              'transform-regenerator',
                              'transform-decorators',
                              ['transform-builtin-extend', {
                                  globals: ['Error', 'Array']
                              }]]
                }
            }
        ]
    }
});