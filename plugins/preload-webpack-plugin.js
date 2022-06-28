const HtmlWebpackPlugin = require("html-webpack-plugin");

class PreloadWebpackPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    compiler.hooks.compilation.tap("PreloadWebpackPlugin", (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeAssetTagGeneration.tapAsync(
        "PreloadWebpackPlugin",
        (htmlData, callback) => {
          this.generateLinks(compilation, htmlData, callback);
        }
      );
      HtmlWebpackPlugin.getHooks(compilation).alterAssetTags.tap(
        "PreloadWebpackPlugin",
        (htmlData) => {
          const resourceHints = this.resourceHints;
          if (resourceHints) {
            htmlData.assetTags.style = {
              ...resourceHints,
              ...htmlData.assetTags.style,
            };
          }
          return htmlData;
        }
      );
    });
  }
  generateLinks(compilation, htmlData, callback) {}
}

module.exports = PreloadWebpackPlugin;
