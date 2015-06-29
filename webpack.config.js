module.exports = {
  entry: "./app/main.js",
  output: {
      path: "server/public/js/",
      filename: "bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader' }, 
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  }
};
