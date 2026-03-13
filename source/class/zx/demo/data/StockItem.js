
qx.Class.define("zx.demo.data.StockItem", {
  extend: zx.server.Object,

  "@": new zx.io.remote.anno.Class().set({
    clientMixins: "zx.demo.data.MStockItem"
  }),

  properties: {    
    title: {
      check: "String",
      "@": [zx.io.persistence.anno.Property.DEFAULT, zx.io.remote.anno.Property.DEFAULT],
      event: "changeTitle",
      init: null,
      nullable: true
    },
    /**
     * In cents
     */
    price: {
      check: "Number",
      "@": [zx.io.persistence.anno.Property.DEFAULT, zx.io.remote.anno.Property.DEFAULT],
      event: "changePrice",
      init: 0,
      nullable: true
    },
    qtyInStock: {
      check: "Number",
      "@": [zx.io.persistence.anno.Property.DEFAULT, zx.io.remote.anno.Property.DEFAULT],
      event: "changeQtyInStock",
      init: 1,
      nullable: true
    }    
  },

  members: {
    "@delete": zx.io.remote.anno.Method.DEFAULT,
    async delete() {
      await this.deleteFromDatabase();
    }
  }
});
