qx.Class.define("zx.demo.client.StockItemsEditor", {
  extend: qx.ui.core.Widget,
  construct() {
    super();
    this._setLayout(new qx.ui.layout.VBox(10));
    qx.core.Init.getApplication().getApi(zx.demo.data.StockApi).then(api => {
      this.__api = api;
      this.getQxObject("ctlrResults");
      this._add(this.getQxObject("splitPane"));
      this.__search();
    });
  },

  objects: {
    toolbar() {
      let tb = new qx.ui.toolbar.ToolBar();
      tb.add(this.getQxObject("btnAdd"));
      tb.add(this.getQxObject("btnRemove"));
      return tb;
    },
    btnAdd() {
      let btn = new qx.ui.toolbar.Button("Add", "qx/icon/Tango/16/actions/address-book-new.png");
      btn.addListener("execute", async evt => {
        let newItem = await this.__api.createStockItem(); // we call a remote method here
        this.getQxObject("ctlrResults").getModel().push(newItem);
        this.getQxObject("ctlrResults").setSelection(new qx.data.Array([newItem]));        
      });
      return btn;
    },
    btnRemove() {
      let btn = new qx.ui.toolbar.Button("Remove", "qx/icon/Tango/16/actions/list-remove.png");
      btn.addListener("execute", async evt => {
        let selection = await this.getQxObject("ctlrResults").getSelection()[0];
        if (!selection) {
          return;
        }
        selection.delete();
        this.getQxObject("ctlrResults").getModel().remove(selection);
      });
      return btn;
    },
    
    splitPane() {
      let sp = new qx.ui.splitpane.Pane("horizontal");
      sp.add(this.getQxObject("compSearch"), 0);
      sp.add(this.getQxObject("ed"), 1);
      return sp;
    },
    compSearch() {
      let comp = new qx.ui.container.Composite(new qx.ui.layout.VBox(10));
      comp.add(this.getQxObject("compSearchField"));
      comp.add(this.getQxObject("toolbar"));
      comp.add(this.getQxObject("lstResults"));
      return comp;
    },
    compSearchField() {
      let field = this.getQxObject("searchField");      
      field.addListener("changeValue", evt => this.__update());      

      let btn = new qx.ui.form.Button("Search", "qx/icon/Tango/16/actions/system-search.png");

      let comp = new qx.ui.container.Composite(new qx.ui.layout.HBox(5));
      comp.add(field, { flex: 1 });
      comp.add(btn);
      btn.addListener("execute", () => this.__search());
      return comp;
    },
    searchField() {
      return new qx.ui.form.TextField();
    },
    lstResults() {
      let lst = new qx.ui.form.List();      
      return lst;
    },
    ctlrResults() {
      let ctlr = new qx.data.controller.List(null, this.getQxObject("lstResults"), "title");
      ctlr.bind("selection[0]", this.getQxObject("ed"), "value"); 
      ctlr.bind("selection[0]", this.getQxObject("ed"), "visibility", {
        converter: sel => (sel ? "visible" : "excluded")
      });
      return ctlr;
    },
    ed() {
      let comp = new zx.demo.client.StockItemEditor();
      return comp;
    }
  },
  members: {
    /**
     * @type {zx.demo.data.StockApi}
     */
    __api: null,

    async __search() {
      let value = this.getQxObject("searchField").getValue();
      let items = await this.__api.searchStockItems(value || null);
      this.getQxObject("ctlrResults").setModel(new qx.data.Array(items));
    }
  }
});