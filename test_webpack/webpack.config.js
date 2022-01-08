const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // точка входа, откуда webpack начнет анализировать приложение
  entry: './main.js',

  // файл, полученный на выходе
  output: {
    // задается название для файла
    filename: '[name].bundle.js',
    chunkFilename: '[id].chunk.js',

    // задается папка, в которую будут собираться готовые файлы
    // по умоланию - dist, но можно любое другое название
    path: path.resolve(__dirname, 'public'),
    publicPath: '/public/',
  },

  // если указывать dev-режим, то код будет более читабельный
  // по умолчанию установлен "production", есть еще "none"
  // mode: 'production',
  mode: 'development',

  // какая-то очень полезная штука
  // если откл source-map, то в браузере не будет отдельных файлов, из которого состоит проект, а останется только bundle
  // но она энергозатратна, потому что файлов мб дофига
  // TODO: почитать про devtool
  devtool: 'inline-source-map',

  // вот это меняет "внутренние наименования" вебпака
  // хз зачем это нужно, но оно есть (зачем ??)
  optimization: {
    chunkIds: 'natural',
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[ext]',
              outputPath: 'static/',
            },
          },
        ],
        type: 'javascript/auto',
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[ext]',
              outputPath: 'static/',
            },
          },
        ],
      },
    ],
  },

  plugins: [new MiniCssExtractPlugin()],
};
