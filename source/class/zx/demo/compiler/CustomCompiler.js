qx.Class.define("zx.demo.compiler.CustomCompiler", {
  extend: qx.tool.compiler.Compiler,
  members: {
    /**@override */
    async _createMakersFromConfig() {
      let makers = await super._createMakersFromConfig();

      let browserMakers = makers.filter(maker => maker.getAnalyzer().getApplicationTypes().includes("browser"));
      browserMakers.forEach(maker => maker.setTransformerClass(zx.io.remote.proxy.ClassesWriter.classname));
      return makers;
    }
  }
});
