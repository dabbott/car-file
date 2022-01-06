const path = require('path')

module.exports = ({ production }) => {
  return {
    mode: production ? 'production' : 'development',
    entry: './src/index.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js',
      library: {
        name: 'car-file',
        type: 'umd',
      },
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                compilerOptions: {
                  declaration: true,
                  declarationDir: path.resolve(__dirname, 'dist'),
                },
              },
            },
          ],
        },
      ],
    },
  }
}
