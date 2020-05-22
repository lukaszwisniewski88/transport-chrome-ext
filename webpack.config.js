const path = require('path')

module.exports = {
  devtool: 'source-map',
  entry: {
    background: './src/background/index.ts',
    options: './src/options/index.ts',
    popup: './src/popup/index.ts',
    content: './src/content/index.ts'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(html|svelte)$/,
        exclude: /node_modules/,
        use: 'svelte-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
    alias: {
      svelte: path.resolve('node_modules', 'svelte')
    }
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].[id].js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'production'
}
