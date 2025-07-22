const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/polesDB");

const entrySchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

const Polejob = mongoose.model("Polejob", entrySchema);

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});

const jobnumber = new Job();
