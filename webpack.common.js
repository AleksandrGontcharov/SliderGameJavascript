const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [{
            test: /\.(jsx|js)$/i,
            exclude: /(node_modules)/,
            use: ['babel-loader']
        },
        {
            test: /\.css$/i,
            use: ['style-loader', 'css-loader']
        },
        {
            test: /\.scss$/i,
            use: ['style-loader', 'css-loader', 'sass-loader']
        },
        {
            test: /\.(jp(e*)g|png|svg|bmp)$/i,
            type: 'asset',
            generator: {
                filename: 'images/[name].[hash][ext][query]'
            }
        },
        {
            test: /\.(woff|woff2|eot|ttf)$/i,
            type: 'asset/resource',
            generator: {
                filename: 'fonts/[name].[hash][ext][query]'
            }
        }
    ]}
};