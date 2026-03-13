qx.Class.define("zx.demo.client.StockItemEditor", {
  extend: qx.ui.core.Widget,
  construct() {
    super();

    let formInfo = [
      { label: "Title", widget: new qx.ui.form.TextField(), property: "title" },
      { label: "Price (in cents)", widget: new qx.ui.form.Spinner().set({maximum: 10000}), property: "price" },
      { label: "Price", widget: new qx.ui.basic.Label(), property: "displayPrice" },
      { label: "Quantity in Stock", widget: new qx.ui.form.Spinner(), property: "qtyInStock" }
    ];

    this._setLayout(new qx.ui.layout.VBox(10));
    this._add(this.getQxObject("toolbar"));

    //Add the widgets and bind them
    for (let { label, widget, property } of formInfo) {
      if (label) {
        this._add(new qx.ui.basic.Label(label + ":"));
      }
      this._add(widget);
      this.bind("value." + property, widget, "value");
      widget.bind("value", this, "value." + property);
    }
  },
  properties: {
    value: {
      check: "zx.demo.data.StockItem",
      event: "changeValue",
      apply: "__applyValue",
      nullable: true,
      init: null
    }
  },
  objects: {
    toolbar() {
      let tb = new qx.ui.toolbar.ToolBar();
      tb.add(this.getQxObject("btnSave"));
      return tb;
    },
    btnSave() {
      //Save button is required to save the object in the database
      //TODO we shouldn't expose this detail of abstraction to the client
      let btn = new qx.ui.toolbar.Button("Save", "qx/icon/Tango/16/actions/document-save.png");
      btn.addListener("execute", async evt => {
        this.getValue()?.save();
      });
      return btn;
    },
  },

  members: {
    __applyValue(value, oldValue) {
      if (oldValue) {
        oldValue.save();
      }
    }
  }
});