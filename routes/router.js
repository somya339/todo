const Router = require("express").Router();
const controller = require("../controller/CRUD");
Router.post("/delete", controller.deleteController);
Router.post("/update", controller.updateController);
Router.post("/add", controller.addController);
Router.post("/", controller.fetchController);


module.exports = Router;