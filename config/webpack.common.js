const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, "../src", "index.js"),
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, '../build'),
        publicPath: "/"
    },
    devServer: {
        port: 3500,
        historyApiFallback: true,
        overlay: true,
        open: true,
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: [/node_modules/],
            use: [{
                loader: "babel-loader"
            }]
        },
        {
            test: /.*\.(gif|png|jp(e*)g)$/i,
            use: [{
                loader: "url-loader",
                options: {
                    limit: 21000,
                    name: "images/[name]_[hash:7].[ext]"
                }
            }]
        },
        {
            test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
            include: path.join(__dirname, "src/assets/images"),
            loader: "file-loader?name=/[name].[ext]"
        },
        // Vendor CSS loader
        // This is necessary to pack third party libraries like antd
        {
            test: /\.css$/,
            include: path.resolve(__dirname, '../node_modules'),
            use: [
                'style-loader',
                'css-loader'
            ],
        },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, '../', 'index.html'),
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
}