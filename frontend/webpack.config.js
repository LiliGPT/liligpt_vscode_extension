const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const webpack = require('webpack');
const path = require('path');

const deps = require("./package.json").dependencies;
module.exports = (_, argv) => ({
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'mf1.js',
    // publicPath: "http://localhost:3006/",
    // publicPath: '/',
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 3006,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    // avoid chunks in the output because vscode webview doesn't handle it very well
    // new webpack.optimize.LimitChunkCountPlugin({
    //   maxChunks: 1,
    // }),
    // Generate a manifest file which contains a mapping of all asset filenames
    // to their corresponding output file so that tools can pick it up without
    // having to parse `index.html`.
    new WebpackManifestPlugin({
      fileName: 'asset-manifest.json',
      // publicPath: '/home/l/experiments/nestgpt/frontend/dist/',
    }),
    new ModuleFederationPlugin({
      name: "mf1",
      filename: "remoteEntry.js",
      remotes: {
        'nestgptfront': 'mf2@http://localhost:3007/remoteEntry.js',
      },
      exposes: {},
      shared: {
        // ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
          // eager: true,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
        "@mui/material": {
          singleton: true,
        },
        "@mui/icons-material": {
          singleton: true,
        },
        "@emotion/react": {
          singleton: true,
        },
        "@emotion/styled": {
          singleton: true,
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
      inject: true,
    }),
  ],
});
