const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TSLintPlugin = require('tslint-webpack-plugin')

module.exports = {
  name: 'webcomponents',
  entry: {
    main: './src/app.ts',
  },
  mode: 'development',
  output: {
    filename: '[name]-bundle.js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  devServer: {
    contentBase: 'dist',
    overlay: true,
    disableHostCheck: true,
    historyApiFallback: true
  },
  devtool: 'source-map',
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: [
            {loader: "ts-loader"}
        ],
        exclude: /node_modules/
      },
      {
        test: /\.sass$/,
        use: ['text-loader', 'sass-loader']
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          minChunks: 2
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      hash: true,
      template: './index.html',
      filename: 'index.html'
    }),
    new TSLintPlugin({
        files: ['./src/**/*.ts']
    })
  ]
}