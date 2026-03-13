qx.Class.define("zx.demo.data.StockApi", {
  extend: zx.server.Object,
  
  members: {
    /**
     * @param {string} query Search query to find stock items
     * @returns {Promise<zx.demo.data.StockItem[]>} The object, in POJO form
     */
    "@searchStockItems": zx.io.remote.anno.Method.DEFAULT,
    async searchStockItems(query) {
      let mongoQuery = query ? { title: { $regex: query, $options: "i" } } : {};  
      return zx.server.Standalone.getInstance().findObjectsByType(zx.demo.data.StockItem, mongoQuery, 20);
    },

    /**
     * @returns {Promise<zx.demo.data.StockItem>} Create a new stock item
     */
    "@createStockItem": zx.io.remote.anno.Method.DEFAULT,
    async createStockItem() {
      let stockItem = new zx.demo.data.StockItem().set({title: "New Stock Item"});
      await stockItem.save();
      return stockItem;
    }    
  }
});
