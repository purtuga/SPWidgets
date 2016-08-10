/* global __dirname */

var path                = require('path');
var webpack             = require('webpack');
var CopyWebpackPlugin   = require('copy-webpack-plugin');

var packageJson = require("./package.json");

var _appSource  = path.resolve(__dirname, 'src');
var _appBuild   = path.resolve(__dirname, '_BUILD');
var _appDev     = path.resolve(__dirname, 'dev');

var _srcFilename = 'SPWidgets.js';

var _jsSrcPath = path.join(_appSource, _srcFilename);

// DEV file
_jsSrcPath = path.resolve(__dirname, "dev/src/setup/setup.js");


module.exports = {
    entry: _jsSrcPath,
    output: {
        path:           _appBuild,
        filename:       packageJson.name + '.js',
        library:        packageJson.name,
        libraryTarget:  "umd"
    },
    devServer: {
        contentBase: _appBuild
    },
    debug: {
        "lessLoader": true
    },
    module: {
        loaders: [
            {
                test:       /\.js?$/,
                // exclude:    /node_modules/,
                include:    [
                    /src/,
                    /node_modules\/common-micro-libs/
                ],
                loader:     'babel',
                query: {
                    presets: [
                        "es2015",
                        "stage-0"
                    ]
                }
            },
            {
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader"
            }
        ]
    },
    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".js", ".less"],
        alias: {
            "vendor/jsutils": "common-micro-libs/src/jsutils",
            "vendor/domutils": "common-micro-libs/src/domutils"
        }
    },
    plugins: [
        // Simply copies the files over
        new CopyWebpackPlugin(
            [
                { from: _appSource }
            ],
            {
                ignore: [
                    { glob: '**/*', dot: true }
                ]
            }
        ),

        // For DEV only
        new CopyWebpackPlugin(
            [
                { from: path.resolve(_appDev)},
                //{ from: path.resolve(_appDev,   "index.html")},
                { from: path.resolve(__dirname, "my.sp.dev.js")}
            ]
        ),
        // Avoid publishing files when compilation fails
        new webpack.NoErrorsPlugin()
        //,
        //new webpack.optimize.UglifyJsPlugin()
    ],
    stats: {
        colors: true
    },
    devtool: 'source-map'
};