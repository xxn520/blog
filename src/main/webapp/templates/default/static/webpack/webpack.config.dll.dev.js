/**
 * Created by m2mbob on 2017/4/14.
 */
const webpack = require('webpack')
const path = require('path')
const config = require('./consts')

module.exports = {
    entry: {
        reactDllBundle: [
            'react',
            'react-dom',
            'react-router',
            'react-router-redux',
            'react-redux',
            'react-tap-event-plugin',
            'redux',
            'redux-thunk',
            'redux-promise',
            'isomorphic-fetch',
        ],
    },
    output: {
        path: path.resolve(config.DEST_DIR, 'dllbundle'),
        filename: '[name].js',
        library: '[name]',
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.resolve(config.DEST_DIR, 'dllbundle', '[name]-manifest.json'),
            name: '[name]',
            context: config.WEB_ROOT,
        })
    ]
}
