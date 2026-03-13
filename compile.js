const fs = require("fs");

qx.Class.define("zx.demo.server.CompilerApi", {
  extend: qx.tool.cli.api.CompilerApi,

  members: {
    async load() {
      debugger;
      let compilerConfig = await qx.tool.utils.Json.loadJsonAsync("compile.json", "utf8");

      if (fs.existsSync("local-compile.json")) {
        let tmp = await qx.tool.utils.Json.loadJsonAsync("local-compile.json");
        qx.lang.Object.mergeWith(compilerConfig, tmp, true);
      }
      this.setConfiguration(compilerConfig);
    }
  }
});

module.exports = {
  CompilerApi: zx.demo.server.CompilerApi
};
