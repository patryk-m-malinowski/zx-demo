qx.Class.define("zx.demo.server.WebServer", {
  extend: zx.server.WebServer,

  members: {
    /**
     * @Override
     */
    async _registerUrls() {
      let config = await super._registerUrls();
      config.registerApi(zx.demo.data.StockApi);      
      return config;
    }
  }
});
