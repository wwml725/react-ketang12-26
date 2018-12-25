const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'

    },
    mode: 'development',
    module: {
        rules: [

            {
                test: /\.js$/,
                exclude: /node_modules/,
                //我要转译哪个目录下面的文件
                include: path.resolve('src'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        //在这里配置，或者在根目录使用.babelrc文件
                        //在这个项目中为了学习，就都用了
                        presets: ["@babel/preset-env","@babel/preset-react"],
                        plugins: ["@babel/plugin-proposal-class-properties"]

                    }
                }
            },
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {test: /\.(png|svg|jpg|gif)$/, use: ['file-loader']},
            {test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader']},
            {test: /\.(csv|tsv)$/, use: ['csv-loader']},
            {test: /\.xml$/, use: ['xml-loader']},
            {
                test: /\.less$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: "less-loader"}
                ]
            }
        ],
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },

    plugins: [
     /*   new HtmlWebpackPlugin({
            title: "王伟-webpack"
        }),*/

     //在react中上面的方式，不能挂在元素。报错
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new CleanWebpackPlugin(["dist"])
    ]
}