const { resolve } = require('path');
const webpack = require('webpack');

module.exports = (env) => {
  // debug = !(env.target == "production");
  const debug = !env.production;
  console.log(debug ? 'debugging mode' : 'production mode');
  return {
    context: resolve('./src'),
    devtool: debug ? 'inline-source-map' : false,
    entry: { app: resolve('./src/app.jsx') },
    devServer: {
      proxy: {
        '/oauth/2.0/token*': {
          target: 'https://openapi.baidu.com',
          changeOrigin: true,
          secure: true
        },
        '/server_api': {
          target: 'http://vop.baidu.com',
          changeOrigin: true,
          secure: false
        }
      }
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /(node_modules|bower_components)/
        },
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            query: {
              plugins: [['import', { libraryName: 'antd', style: 'css' }]]
            }
          }
        },
        { test: /\.css$/, include: /node_modules/, loader: 'style-loader!css-loader' }, // css加载器
        { test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader' }, // sass加载器
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[local]--[hash:base64:5]'
              }
            }
          ]
        },
        { test: /\.less/, loader: 'style-loader!css-loader!less-loader' },
        // image & font
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          loader: 'url-loader?limit=8192&name=[name].[ext]'
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          loader: 'url-loader?limit=80000&name=[name].[ext]'
        }
      ]
    },
    output: {
      path: resolve('./dist'),
      filename: 'bundle.js',
      publicPath: '/dist/'
    },

    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss'],
      alias: {
        // From mapbox-gl-js README. Required for non-browserify bundlers (e.g. webpack):
        'mapbox-gl$': resolve('./node_modules/mapbox-gl/dist/mapbox-gl.js')
      }
    },

    optimization: { splitChunks: { chunks: 'all' } },

    // Optional: Enables reading mapbox token from environment variable
    plugins: debug ? [new webpack.EnvironmentPlugin(['MapboxAccessToken'])] : [
      // new webpack.DefinePlugin({
      //     'process.env.NODE_ENV': '"production"'
      // }),
      new webpack.EnvironmentPlugin(['MapboxAccessToken'])
      // new webpack.optimize.ModuleConcatenationPlugin(),
      // // use it when release
      // new webpack.optimize.OccurrenceOrderPlugin(),
    ]
  };
};
