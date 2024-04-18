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
          {
              test: /\.(png|svg|jpg|jpeg|gif)$/i,
              use: [
                  {
                      loader: 'file-loader',
                      options: {
                          name: '[name].[ext]',
                          outputPath: 'images/'
                      }
                  }
              ]
          }
      ],
  },
    watch: true
}
