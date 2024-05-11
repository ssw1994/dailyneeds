const { fileUploader } = require("../Controllers/upload.controller");
const { verifyToken } = require("../Middlewares/veriftyToken");
const { upload } = require("../Middlewares/uploader");
module.exports = function (app) {
  app.post("/files", [verifyToken, upload.array("files")], fileUploader);
  return app;
};
