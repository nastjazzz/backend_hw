const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const defaultConfig = {
  mode: 'production',
  plugins: [new MiniCssExtractPlugin()],
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        // use: [{ options: { ouptutPath: 'img' } }]
      },
    ],
  },
};

const configs = ['books', 'create', 'update'].map((viewName) => {
  return {
    entry: {
      index: `./src/views/pages/${viewName}/assets/index.js`,
    },
    output: {
      path: path.resolve(__dirname, `./public/${viewName}/`),
      filename: `[name].js`,
    },
    ...defaultConfig,
  };
});

module.exports = configs;
