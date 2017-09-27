const webpack = require('webpack');

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    entry: {
        app: './App.js',
    },
    context: `${__dirname}/static_src`,
    output: {
        path: `${__dirname}/static/build`,
        filename: '[name].js',
        publicPath: '/static/build/',
    },

    watch: NODE_ENV === 'development' ? true : false,

    devtool: NODE_ENV === 'development' ? 'cheap-module-source-map' : false,

    module: {
        rules: [
            {
                test: /\.js$/,
                include: `${__dirname}/static_src`,
                loader: 'babel-loader?presets[]=es2015',
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            },
            {
                test: /\.(png|jpg|gif|svg|ttf|eot|woff|woff2)$/,
                loader: 'url-loader?limit=4096&name=[path][name].[ext]',
            },
        ],
    },

    // devtool: NODE_ENV === 'development' ? 'cheap-module-source-map' : false,

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
    ],
};


if (NODE_ENV !== 'development') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
            },
        })
    );
}
