module.exports = [
    {
        test: /\.jsx$/,
        loader: 'babel-loader'
    },
    {
        test: /\.js$/,
        loader: 'babel-loader'
    },
    {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader'
    },
    {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
    },
    {
        test: /\.png$/,
        loader: 'url-loader?mimetype=image/png'
    }
]