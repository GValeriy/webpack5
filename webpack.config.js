const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';
const KILOBYTE = 1024;

const config = {
    entry: {
        bundle: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'static/build'),
        filename: '[name].[chunkhash].js',
        assetModuleFilename: 'images/[hash][ext][query]'
    },
    mode: isDevelopment ? 'development' : 'production',
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/
            },
            {
                use: [
                  {
                    loader: MiniCssExtractPlugin.loader,
                  },
                  'css-loader',
                ],
                test: /\.css$/
              },
              {
                test: /\.(jpe?g|png|gif|svg)$/,
                type: 'asset',
                parser: {
                   dataUrlCondition: {
                     maxSize: 40 * KILOBYTE
                  }
                }
              },
              {
                test: /\.s[ac]ss$/i,
                use: [
                  // Creates `style` nodes from JS strings
                  "style-loader",
                  // Translates CSS into CommonJS
                  "css-loader",
                  // Compiles Sass to CSS
                  "sass-loader",
                ],
              },
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: false,
        compress: true,
        port: 3000
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'style.css' }),
        new HtmlWebpackPlugin({
            template: 'static/index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ],
};

module.exports = config;
