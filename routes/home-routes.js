const express = require("express");
const { generatePdf } = require("../controller/homeController");

const router = express.Router();

// router.get("/job/download", generatePdf);

router.get("/download/:jobId", generatePdf);

module.exports = {
  routes: router,
};
