const path               = require('path'),
      CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    target:  'web',
    plugins: [
        new CleanWebpackPlugin(['build'])
    ],
    output:  {
        path:     path.resolve(__dirname, 'build'),
        filename: '[name].bundle.js'
    },
    resolve: {
        modules: ['./src/modules']
    },
    stats:   {
        colors: true
    }
};