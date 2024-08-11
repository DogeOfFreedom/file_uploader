const openUploadFileModal = () => {
  const modal = document.querySelector("#uploadFileModal");
  modal.showModal();
};

const closeUploadFileModal = () => {
  const modal = document.querySelector("#uploadFileModal");
  modal.close();
};

const showLoadingFileUpload = () => {
  const loading = document.querySelector("#uploadFileModal .loadingContainer");
  document.querySelector("#uploadFileModal form").classList.add("hidden");
  loading.classList.remove("hidden");
};

// Custom submit required as <input> element is hidden
const uploadFileSubmit = async () => {
  const form = document.querySelector("#uploadFileModal form");
  const { value } = document.querySelector("#uploadFileModal form input");

  // No file uploaded
  if (!value) {
    const error = document.querySelector("#uploadFileModal p");
    error.classList.remove("none");
    error.textContent = "Please choose a file";
  } else {
    form.submit();
    showLoadingFileUpload();
  }
};

//   const loading = document.querySelector("#createFolderModal .loadingContainer")
//   document.querySelector("#createFolderModal form").classList.add("hidden");

const openCreateFolderModal = () => {
  const modal = document.querySelector("#createFolderModal");
  modal.showModal();
};

const closeCreateFolderModal = () => {
  const modal = document.querySelector("#createFolderModal");
  modal.close();
};

const loadingElements = document.querySelectorAll("loadingContainer");
loadingElements.forEach((loading) => loading.classList.add("hidden"));

const fileUpload = document.querySelector("#fileUpload");
const filePreview = document.querySelector(".uploadedFile span");
filePreview.textContent = "No File Selected";

fileUpload.addEventListener("change", (e) => {
  const filename = e.target.value.split("\\").pop();
  filePreview.textContent = filename;
});
