# chunk
### preload-webpack-plugin

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const preloadWebpackPlugin = require("./plugins/preload-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "build.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new preloadWebpackPlugin(),
  ],
};
```


