const path = require('path')

module.exports = {
    mode: 'development', 
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
          {
            test: /\.scss$/i,
            use: ["style-loader", "css-loader", "sass-loader"],
          },
        ],
      },
    watch: true
}
