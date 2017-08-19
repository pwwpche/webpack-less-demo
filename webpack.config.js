const webpack = require('webpack');
const AotPlugin = require('@ngtools/webpack').AotPlugin;
let path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = (envOptions) => {
    envOptions = envOptions || {};

    const config = {
        entry: {

        },
        output: {
            path: path.resolve(process.cwd(), 'dist'),
            filename: 'dist/[name].bundle.js',
        },
        resolve: {
            extensions: ['.ts', '.js', '.html'],
        },
        module: {
            rules: [
                { test: /\.html$/, loader: 'raw-loader' },
                { test: /\.css$/, loader: 'raw-loader' },
                { test: /\.scss$/, loaders: ['raw-loader', 'sass-loader'] },
                { test: /\.less$/, loaders: ['raw-loader', 'less-loader'], exclude: /external/ },
                { test: /\.less$/,
                  loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                  }),
                 include: /external/
               }
            ]
        },
        plugins: [
            new ExtractTextPlugin('styles.css'),
            new HtmlWebpackPlugin({filename: 'index.html', template: './index.html'})
        ],
        devtool: '#source-map',
    };

    if (envOptions.MODE === 'prod') {
      console.log("prod");
      config.entry.main = path.resolve(process.cwd(), 'src/main.aot.ts');
        config.module.rules.push(
            { test: /\.ts$/, loaders: ['@ngtools/webpack'] }
        );
        console.log("prod1");
        config.plugins = [
            new AotPlugin({
                tsConfigPath: "./tsconfig.aot.json",
                entryModule: __dirname + '/src/app/app.module#AppModule'
            })
        ];
        console.log("prod2");
    } else {
        console.log("dev");
        config.entry.main = path.resolve(process.cwd(), 'src/main.jit.ts');
        config.module.rules.push(
            {
               test: /\.ts$/,
               loaders: ['ts-loader', 'angular2-template-loader'],
               exclude: /main\.aot\.ts$/
             }
        );
    }
    return config;
};
