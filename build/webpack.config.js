const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var webpack = require('webpack');

module.exports = env => {
    return {
        performance: { hints: false },
        watch: (env.watch == 'true' ? true : false),

        entry: [
        './js/main.js',
        './scss/main.scss',
        ],

        output: {
            path: path.resolve(__dirname, '../httpdocs/_'),
            filename: 'script.js'
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        { loader: MiniCssExtractPlugin.loader },
                        { loader: 'css-loader' }, // 3. resolves url(), @imports
                        { loader: 'postcss-loader' }, // 2. postCSS, autoprefixer & minifying
                        {
                            // 1. transform SASS to standard CSS
                            loader: 'sass-loader',
                            options: {
                                implementation: require('sass')
                            }
                        }
                    ]
                }
            ]
        },

        plugins: [
            new MiniCssExtractPlugin({
                filename: 'style.css'
            }),
            new webpack.ProvidePlugin({
                $: "jquery",  
                jQuery: "jquery" 
            })
        ]
    }
}