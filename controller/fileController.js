const formidable = require("formidable");
const fs = require("fs");
const pdf = require("pdf-parse");
const cloudinary = require("../config/cloudinary");

exports.uploadPDF = (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(400).send("File parsing failed");

    const file = files.fileupload;

    try {
      // Upload to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(file.filepath, {
        resource_type: "raw",
        folder: "job_pdfs",
      });

      const fileUrl = uploadResult.secure_url;

      // Read & parse the PDF content
      const dataBuffer = fs.readFileSync(file.filepath);
      const pdfData = await pdf(dataBuffer);

      const pdfText = pdfData.text;
      const latitude = pdfText.match(/LATITUDE\s+([\d.-]+)/)?.[1] || "";
      const longitude = pdfText.match(/LONGITUDE\s+([\d.-]+)/)?.[1] || "";
      const elevation = pdfText.match(/ELEVATION[:\s]+([\d.]+)/)?.[1] || "";

      res.status(200).json({
        message: "File uploaded and parsed",
        fileUrl,
        extracted: { latitude, longitude, elevation },
      });
    } catch (e) {
      console.error("Upload or parse failed", e);
      res.status(500).send("Upload or parse failed");
    }
  });
};
