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
  generateLinks(compilation, htmlData, callback) {
    //1 获取所有代码块
    const chunks = [...compilation.chunks];
    //获取导步代码块
    const asycnChunks = chunks.filter(chunk => chunk.canBeInitial());
    const allFiles = asycnChunks.reduce((accumulated,chunk) => {
        return accumulated.add(...chunk.files)
    },new Set());

    const links = [];
    for(const file of allFiles.values()) {
        links.push({
            tagName:'link',
            attributes:{
                rol:'preload',
                href:file
            }
        })
    }
    this.resourceHints = links;
    callback();
  }
}

module.exports = PreloadWebpackPlugin;
