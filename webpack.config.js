const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  output: {
    publicPath: "auto",
    uniqueName: "angular1"
  },
  optimization: {
    // Only needed to bypass a temporary bug
    runtimeChunk: false
  },
  plugins: [
    new ModuleFederationPlugin({

      // For remotes (please adjust)
      name: "angular1",
      library: { type: "var", name: "angular1" },
      filename: "remoteEntry.js",
      exposes: {
        './web-components': './src/bootstrap.ts',
      },

      // For hosts (please adjust)
      /*
      remotes: {
          'mfe1': "mfe1@http://localhost:3000/remoteEntry.js" 
      },
      */

      shared: {
        "@angular/core": { },
        "@angular/common": { },
        "@angular/router": { },
        "rxjs": {}
      }
    }

    )
  ],
};
