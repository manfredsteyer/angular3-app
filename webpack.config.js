const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  output: {
    publicPath: "auto",
    uniqueName: "angular3"
  },
  optimization: {
    // Only needed to bypass a temporary bug
    runtimeChunk: false
  },
  plugins: [
    new ModuleFederationPlugin({

      // For remotes (please adjust)
      name: "angular3",
      library: { type: "var", name: "angular3" },
      filename: "remoteEntry.js",
      exposes: {
        './web-components': './src/bootstrap.ts',
      },

      shared: {
        "@angular/core": { requiredVersion:'12.0.3' }, 
        "@angular/common": { requiredVersion:'12.0.3' }, 
        "@angular/router": { requiredVersion:'12.0.3' },
  "rxjs": {}
      }
    }

    )
  ],
};
