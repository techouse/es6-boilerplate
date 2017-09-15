const webpack = require('webpack'),
      merge   = require('webpack-merge'),
      common  = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: 'inline-source-map',
    plugins: [
        new webpack.DefinePlugin({
                                     'process.env': {
                                         'NODE_ENV': JSON.stringify('development')
                                     }
                                 })
    ],
    entry:   {
        main: ['./src/main.js']
    },
    module:  {
        loaders: [
            {
                test:   /\.js$/,
                loader: 'babel-loader',
                query:  {
                    presets: ['es2016']
                }
            }
        ]
    },
});