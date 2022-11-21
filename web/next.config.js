/** @type {import('next').NextConfig} */

const webpack = require('webpack');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  reactStrictMode: true,
  //distDir: 'build',
  webpack: (config, {  }) => {

    config.resolve.extensions.push(".ts", ".tsx");
    config.resolve.fallback = { fs: false, buffer: 'buffer/'};

    config.plugins.push(
    new NodePolyfillPlugin(), 
    new CopyPlugin({
      patterns: [
        {
          from: './node_modules/onnxruntime-web/dist/ort-wasm.wasm',
          to: 'static/chunks/pages',
        },             {
          from: './node_modules/onnxruntime-web/dist/ort-wasm-simd.wasm',
          to: 'static/chunks/pages',
        },
        {
          from: './node_modules/onnxruntime-web/dist/ort-wasm-threaded.wasm',
          to: 'static/js'
        },             {
          from: './node_modules/onnxruntime-web/dist/ort-wasm-simd-threaded.wasm',
          to: 'static/js'
        },          
        {
          from: './model/model.with_pre_post_processing.onnx',
          to: 'static/chunks/pages',
        },
        {
          from: './model/model.onnx',
          to: 'static/chunks/pages',
        },
      ],
    })
    );

    return config;
  } 
}