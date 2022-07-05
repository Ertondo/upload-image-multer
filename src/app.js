const express = require("express");
const colors = require("colors");
const path = require("path");
const multer = require("multer");

//Initializations
const app = express();

//Settings
app.use(express.static(path.join(__dirname, "./public")));
app.set("port", 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/upload"),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});

//Middlewares
app.use(
  multer({
    storage,
    dest: path.join(__dirname, "public/upload"),
  }).single("image")
);

//Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/uploads", (req, res) => {
  const name = `${Date.now()}${path.extname(req.file.originalname)}`;
  res.send("Image OK " + name);
});

//Server On
app.listen(app.get("port"), () => {
  console.log(colors.bgGreen(`Server on port ${app.get("port")}`));
});
