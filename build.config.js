module.exports = {
    entry: './index.jsx',
    output: {
        filename: './bundle.js'
    },
    module: {
        loaders: require('./loaders.config')
    },
    externals: {
        'react': 'React'
    },
    resolve: {
        // Allow to omit extensions when requiring these files
        extensions: ['', '.js', '.jsx']
    }
}