var path = require('path');

module.exports = {
    entry: './src/app.ts',
    output: {
        filename: 'build/app.js'
    },
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: "ts-loader" }
        ]
    },
    externals: [
        { "pixi.js": "PIXI" }
    ]
}