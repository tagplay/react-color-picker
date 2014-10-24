module.exports = {
    entry: './src/index.jsx',
    output: {
        path         : __dirname + "/dist",
        libraryTarget: 'umd',
        library      : 'ColorPicker',
        filename     : 'react-color-picker.js'
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