const express = require("express");
const router = express.Router();
const { uploadPDF } = require("../controller/fileController");

router.post("/upload", uploadPDF);

module.exports = router;
