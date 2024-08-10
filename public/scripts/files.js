const openUploadFileModal = () => {
  const modal = document.querySelector("#uploadFileModal");
  modal.showModal();
};

const closeUploadFileModal = () => {
  const modal = document.querySelector("#uploadFileModal");
  modal.close();
};

const openCreateFolderModal = () => {
  const modal = document.querySelector("#createFolderModal");
  modal.showModal();
};

const closeCreateFolderModal = () => {
  const modal = document.querySelector("#createFolderModal");
  modal.close();
};

const fileUpload = document.querySelector("#fileUpload");
const filePreview = document.querySelector(".uploadedFile span");
filePreview.textContent = "No File Selected";

fileUpload.addEventListener("change", (e) => {
  const filename = e.target.value.split("\\").pop();
  filePreview.textContent = filename;
});
