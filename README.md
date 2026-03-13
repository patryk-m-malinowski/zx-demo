# Zen-CMS Demo App

This project is a demo of [Zen-CMS](https://github.com/johnspackman/zen-cms), a full-stack app development library for Qooxdoo JavaScript.
It contains a web app used for editing data about stock items, which could be used by a retail business.
The data is synced between the clients and the server in real-time,
meaning that if a property of a data object is changed on the client,
the server and the other clients will see the changes of the data quickly after.

## Project overview

The class `zx.demo.data.StockApi` defines the API which the client can use to communicate with the server.
The client can call its methods remotely, and the parameters passed into those methods and the data returned by those methods are serialized and sent over the network.
The API is registered on the server in the class `zx.demo.server.WebServer`.

The method `searchStockItems` of the API returns instances of `zx.demo.server.StockItem`,
which are serialized and sent to the client.
Those objects will be 'shared' between the client and the server i.e. changes to a property in one of those objects on either the server or the client
will be reflected across all other clients and/or the server.

The client's version of that class is slightly different than the server however;
we have a custom compiler plugin which converts that type of class into a 'proxy' for the client,
which has the same properties but calls to the methods will simply defer to the server.
The class for the custom compiler is `zx.demo.compiler.CustomCompiler`,
which tells the Qooxdoo compiler to use the `zx.io.remote.proxy.ClassesWriter` source transformer for browser apps.

### Index page

The index page is a minified version of the Qooxdoo project webpage,
which is rendered using Zen-CMS's Nunjucks rendering system.
All its files are located under `website/themes/themes.ZxDemo`.

## Setup

Ensure you have the Qooxdoo following dependencies installed:
- [Zen-CMS](https://github.com/johnspackman/zen-cms)
- [UploadMGR](https://github.com/johnspackman/UploadMgr)

Additionally, you need to have a [Mongo](https://www.mongodb.com) database running.

> NOTE: Currently, this project only works with the new Qooxdoo compiler, which is still in Beta and is found in branch `compiler-update-v8` of [this repo](https://github.com/patryk-m-malinowski/qooxdoo/tree/compiler-update-v8)
> It will **not work** using the default compiler.

Create a file called `local-compile.json` in the root of this project,
which lists all the absolute/relative paths of the dependencies.
Example:
```json
{
  "libraries": ["./", "../Zen-CMS", "../qooxdoo", "../UploadMgr"]
}
```

Then, create a file called `cms.json`.
Use `cms-sample.json` as a starting point.
You need to set the correct URI of your Mongo database,
and you may wish to change the port which the server is running on as well.

Compile using `qx compile --watch`

## Running

Run `./serve.sh` in your project root.
Then naviate to the URL in your browser (assuming port 3000, it will be `localhost:3000`).
This will take you to a minified version of the Qooxdoo project webpage rendered by the CMS system.
Click the start button under the "Server Objects Demo" section to go to the stock management app.

