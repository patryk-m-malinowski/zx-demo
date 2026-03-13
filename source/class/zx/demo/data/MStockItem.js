qx.Mixin.define("zx.demo.data.MStockItem", {
  construct() {
    this.bind("price", this, "displayPrice", {
      converter: pence => `€` + (pence / 100).toFixed(2)
    })
  },
  properties: {
    /**
     * Human-readable price, containing currency symbol
     */
    displayPrice: {
      check: "String"
    }
  }  
})