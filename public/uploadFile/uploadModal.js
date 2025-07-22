console.log("Modal JS loaded");

function openUploadModal() {
  document.getElementById("uploadModal").style.display = "block";
}

function closeUploadModal() {
  document.getElementById("uploadModal").style.display = "none";
  document.getElementById("uploadStatus").textContent = "";
}

window.onclick = function (event) {
  const modal = document.getElementById("uploadModal");
  if (event.target === modal) {
    closeUploadModal();
  }
};

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("uploadForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form);

    fetch("/upload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        document.getElementById("uploadStatus").textContent = "Uploaded ";
        console.log("Extracted:", data.extracted);
        console.log("File URL:", data.fileUrl);

        localStorage.setItem("uploadedPDF", JSON.stringify(data));

        const pdfUrlInput = document.getElementById("pdfUrlInput");
        if (pdfUrlInput) {
          pdfUrlInput.value = data.fileUrl;
        }

        setTimeout(() => closeUploadModal(), 1000);
      })
      .catch(() => {
        document.getElementById("uploadStatus").textContent = "Upload failed ";
      });
  });
});
