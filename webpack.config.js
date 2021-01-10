const path = require('path');

module.exports = {
    entry: './src/main/javascript/app.js',
    output: {
        path: path.resolve(__dirname, 'src/main/resources/static/built/'),
        filename: 'main.js'
    },
    mode: 'development',
    devtool: 'eval-source-map',
    cache: true,
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                    plugins: ['@babel/plugin-transform-runtime']
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'url-loader',
                options: {
                  limit: 10000
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    }
};
