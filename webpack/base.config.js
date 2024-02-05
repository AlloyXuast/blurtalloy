const BundleAnalyzerPlugin =
    require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const writeStats = require('./utils/write-stats');

const Webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin');
const webpack_isomorphic_tools_plugin = new Webpack_isomorphic_tools_plugin(
    require('./webpack-isotools-config')
).development();

// const TerserPlugin = require('terser-webpack-plugin');

const postcss_loader = {
    loader: 'postcss-loader',
    options: {
        postcssOptions: {
            plugins: ['postcss-preset-env'],
        },
    },
};

const css_loaders = [
    MiniCssExtractPlugin.loader,
    // {
    //     loader: 'style-loader',
    // },
    {
        loader: 'css-loader',
        options: {
            importLoaders: 1,
        },
    },
    postcss_loader,
];

const scss_loaders = [
    MiniCssExtractPlugin.loader,
    {
        loader: 'css-loader',
        options: {
            importLoaders: 1,
        },
    },
    postcss_loader,
    {
        loader: 'sass-loader',
    },
];

module.exports = {
    entry: {
        app: ['core-js/stable', './src/app/Main.js'],
        vendor: [
            'react',
            'react-dom',
            'react-router',
            '@blurtfoundation/blurtjs',
            //            'slate',
            //            'slate-drop-or-paste-images',
            //            'slate-insert-block-on-enter',
            //            'slate-trailing-block',
            'bytebuffer',
            'immutable',
            'autolinker',
            'pako',
            'remarkable',
            'picturefill',
        ],
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].[contenthash].js',
        chunkFilename: '[id].[contenthash].js',
        publicPath: '/assets/',
    },
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|woff|woff2|eot|ttf)/,
                use: 'url-loader?limit=4096',
            },
            {
                test: /\.js$|\.jsx$/,
                exclude: [/node_modules/, /\*\/app\/assets\/static\/\*\.js/],
                use: 'babel-loader',
            },
            { test: /\.svg$/, use: 'svg-inline-loader' },
            {
                test: require.resolve('blueimp-file-upload'),
                use: 'imports?define=>false',
            },
            {
                test: /\.css$/,
                use: css_loaders,
            },
            {
                test: /\.scss$/,
                use: scss_loaders,
            },
            {
                test: /\.md/,
                use: [
                    {
                        loader: 'raw-loader',
                        options: {
                            esModule: false,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'disabled',
            generateStatsFile: true,
            statsOptions: { source: false },
        }),
        function () {
            this.plugin('done', writeStats);
        },
        webpack_isomorphic_tools_plugin,
        new MiniCssExtractPlugin({
            filename: '[name]-[contenthash].css',
            chunkFilename: '[name]-[contenthash]-chunk.css',
        }),
    ],
    resolve: {
        alias: {
            react: path.join(__dirname, '../node_modules', 'react'),
            assets: path.join(__dirname, '../src/app/assets'),
        },
        extensions: ['.js', '.json', '.jsx'],
        modules: [path.resolve(__dirname, '../src'), 'node_modules'],
    },
    externals: {},
    optimization: {
        // splitChunks: {
        // chunks: 'all',
        // minChunks: 5,
        // minSize: 2000
        // },
        splitChunks: {
            chunks: 'async',
            minSize: 20000,
            // minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    filename: '[name].[contenthash].bundle.js',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        },
        minimize: true,
        // minimizer: [
        //   new TerserPlugin({
        //     // test: /\.jsx(\?.*)?$/i,
        //     parallel: true,
        //     cache: false
        //   }),
        // ],
    },
};
