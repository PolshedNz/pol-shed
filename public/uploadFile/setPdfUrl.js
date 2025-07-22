console.log("setPdfUrl.js is loaded ");

document.addEventListener("DOMContentLoaded", function () {
  const storedPDF = localStorage.getItem("uploadedPDF");
  if (storedPDF) {
    try {
      const parsed = JSON.parse(storedPDF);
      const fileUrl = parsed.fileUrl;
      const pdfUrlInput = document.getElementById("pdfUrlInput");

      console.log(" Stored PDF:", parsed);
      console.log(" Extracted fileUrl:", fileUrl);
      console.log(" Found input:", pdfUrlInput);

      if (pdfUrlInput && fileUrl) {
        pdfUrlInput.value = fileUrl;
      } else {
        console.warn(" fileUrl or input not found.");
      }
    } catch (e) {
      console.error(" Error parsing uploadedPDF:", e.message);
    }
  } else {
    console.warn(" No uploadedPDF in localStorage");
  }
});
