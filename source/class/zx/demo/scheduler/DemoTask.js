/**
 */
qx.Class.define("zx.demo.scheduler.DemoTask", {
  implement: [zx.server.work.IWork],
  extend: qx.core.Object,
  members: {
    /**@override */
    async execute(worker) {
      for (let i = 0; i < 60; i++) {
        worker.appendWorkLog("Number: " + i);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    },

    /**@override*/
    async abort(worker) {}
  }
});
