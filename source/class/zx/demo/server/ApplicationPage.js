/**
 * Used to render a Grasshopper application via the Zx server
 *
 * @asset(zx/demo/*)
 */
qx.Class.define("zx.demo.server.ApplicationPage", {
  extend: zx.cms.content.Page,

  properties: {
    applicationName: {
      init: null,
      nullable: true,
      check: "String",
      event: "changeApplicationName",
      "@": [zx.io.persistence.anno.Property.DEFAULT, zx.io.remote.anno.Property.DEFAULT]
    },
    icon: {
      init: null,
      nullable: true,
      check: "String",
      event: "changeIcon",
      "@": [zx.io.persistence.anno.Property.DEFAULT, zx.io.remote.anno.Property.DEFAULT]
    }
  },

  members: {
    /**
     * @override
     */
    async prepareContext(context, rendering) {
      await super.prepareContext(context);
      context.applicationName = this.getApplicationName();
      context.icon = this.getIcon();
    }
  }
});
