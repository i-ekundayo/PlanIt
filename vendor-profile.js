const fileInput = document.getElementById("cac");
const previewImage = document.getElementById("previewImage");
const fileNameDisplay = document.getElementById("fileName");
const uploadText = document.getElementById("uploadText");

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // File type validation
  if (file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
    uploadText.textContent = "Image selected:";
  } else if (file.type === "application/pdf") {
    previewImage.src = "./images/pdf-icon.svg"; // Use a custom PDF icon
    uploadText.textContent = "PDF selected:";
  } else {
    alert("Unsupported file type. Please upload PNG, JPG, or PDF.");
    return;
  }

  // Display file name
  fileNameDisplay.textContent = file.name;
});
