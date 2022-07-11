exports.upload = async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: 400,
        message: "File must be included",
      });
    } else {
      const fs = require("fs");
      let file = req.files.file;
      let path = `./app/files/${file.name}`;

      fs.readdir("./app/files", (err, files) => {
        if (files.includes(file.name)) {
          let copyNum = 0;
          let newName = file.name;
          while (files.includes(newName)) {
            copyNum++;
            newName = file.name + `(${copyNum})`;
            path = `./app/files/${newName}`;
          }
          file.mv(path);

          res.send({
            status: 200,
            message: `upload success as ${newName}`,
            path,
          });
        } else {
          file.mv(path);

          res.send({
            status: 200,
            message: "upload success",
            path,
          });
        }
      });
    }
  } catch (err) {
    res.send({
      status: "failure",
      message: "upload failed",
      err,
    });
  }
};

exports.getFiles = (req, res) => {
  try {
    const fs = require("fs");

    fs.readdir("./app/files", (err, files) => {
      const fileNames = [];
      files.forEach((file) => {
        fileNames.push(file);
      });

      res.send({
        status: 200,
        data: fileNames,
      });
    });
  } catch (err) {
    res.send({
      status: 500,
      message: "error finding files",
      err,
    });
  }
};

exports.downloadFile = (req, res) => {
  try {
    const fileName = req.params.fileName;

    res.download(`./app/files/${fileName}`);
  } catch (err) {
    res.send({
      status: 500,
      message: "download failed",
      err,
    });
  }
};
