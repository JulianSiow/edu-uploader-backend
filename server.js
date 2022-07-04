const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = __dirname + "/app/dist/";
const files = require("./app/routes/routes");

const app = express();

const corsOptions = {
  origin: "http://localhost:8081",
};

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(express.static(path));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path));
app.use("/", files);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
