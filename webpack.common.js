const { VueLoaderPlugin } = require('vue-loader');
module.exports = {
  entry: {
    examples: './examples/entry.js',
    docs: './docs/entry.js'
  },
  output: {
    path: __dirname,
    filename: './[name]/dist/main.js'
  },
  resolve: {
    alias: {
      'vee-image': require('path').resolve('./packages/index.js')
    }
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: ['vue-loader']
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader']
    }, {
      test: /\.(css|scss)$/,
      use: ['vue-style-loader', 'css-loader', 'sass-loader']
    }, {
      test: /\.(png|jpg|jpeg|gif|svg|woff)$/,
      use: [{
        loader: "url-loader",
        options: {
          name: "./examples/dist/assets/[name].[ext]",
          context: "./examples/assets",
          limit: 5000
        }
      }]
    }]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
};
