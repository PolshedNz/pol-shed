const express = require("express");
const bodyParser = require("body-parser");
const res = require("express/lib/response");
const homeRoutes = require("./routes/home-routes");
const path = require("path");

const expressLayouts = require("express-ejs-layouts");
const cors = require("cors");

const cookieParser = require("cookie-parser");

require("dotenv").config();

const connectDB = require("./config/db");
connectDB();

//routes
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/fileRoutes.js");
const jobRoutes = require("./routes/jobRoutes.js");
const Job = require("./model/Job");

const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "public")));
app.use("/docs", express.static(path.join(__dirname, "docs")));
app.use(homeRoutes.routes);
app.use(authRoutes);
app.use(uploadRoutes);
app.use(jobRoutes);

app.get("/", (req, res) => {
  res.redirect("/login");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3007;
}

app.listen(port, function () {
  console.log("Server started successfully");
});
