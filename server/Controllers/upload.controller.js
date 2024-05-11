const { ERRORS } = require("../Constants/app.constant");
const { bucket } = require("../Middlewares/uploader");
exports.fileUploader = async function (req, res, next) {
  try {
    console.log("Here ....", req.files);
    if (!req.files.length) {
      res.status(400).send({
        message: ERRORS.NO_FILES_UPLOADED,
      });
    }
    const uploadedFiles = req.files.map((file) => {
      const blob = bucket.file(file.originalname);
      const blobStream = blob.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });

      // blobStream.on("error", (err) => {
      //   res.status(500).send(err);
      // });
      let publicUrl = null; //https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      // blobStream.on("finish", async () => {
      //   console.log("image detail :" + JSON.stringify(blob));
      //   const [url] = await blob.getSignedUrl({
      //     version: "v4",
      //     action: "read",
      //     expires: Date.now() + 15 * 60 * 1000,
      //   });
      //   console.log(url);
      //   publicUrl = url; //`https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      // });

      blobStream.end(file.buffer);
      return blob.getSignedUrl({
        version: "v4",
        action: "read",
        expires: Date.now() + 518400 * 1000,
      });
    });

    Promise.all(uploadedFiles)
      .then((urls) => {
        //res.status(200).send({ urls });
        urls = urls.map((itm) => itm[0]);
        req.uploadedFiles = urls;
        res.status(200).send({
          data: req.uploadedFiles,
          message: ERRORS.FILES_UPLOADED_SUCCESSFULLY,
        });
      })
      .catch((error) => {
        console.error(error);
        req.uploadedFiles = [];
        res.status(200).send({
          data: req.uploadedFiles,
          message: ERRORS.ERROR_IN_FILE_UPLOAD,
        });
      });
  } catch (error) {
    console.error(error);
    req.uploadedFiles = urls;
    next();
    //res.status({ status: 500 }).send({ error });
  }
};
