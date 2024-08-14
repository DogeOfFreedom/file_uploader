const openUploadFileModal = () => {
  const modal = document.querySelector("#uploadFileModal");
  modal.showModal();
};

const closeUploadFileModal = () => {
  const modal = document.querySelector("#uploadFileModal");
  modal.close();
  const error = document.querySelector("#uploadFileModal p");
  error.classList.add("none");
  error.textContent = "";
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
    const loading = document.querySelector(
      "#uploadFileModal .loadingContainer"
    );
    document.querySelector("#uploadFileModal form").classList.add("hidden");
    loading.classList.remove("hidden");
  }
};

const openCreateFolderModal = () => {
  const modal = document.querySelector("#createFolderModal");
  modal.showModal();
};

const closeCreateFolderModal = () => {
  const error = document.querySelector("#createFolderModal p");
  error.classList.add("none");
  error.textContent = "";
  const modal = document.querySelector("#createFolderModal");
  modal.close();
};

const createFolderSubmit = async () => {
  const form = document.querySelector("#createFolderModal form");
  const { value } = document.querySelector("#createFolderModal form input");
  const error = document.querySelector("#createFolderModal p");

  if (value.length >= 1) {
    // Does folder already exist?
    const { exists } = await fetch(
      `http://localhost:3000/folder/exists?foldername=${value}`
    )
      .then((res) => res.json())
      .catch((e) => console.log(e));
    if (exists) {
      error.classList.remove("none");
      error.textContent = "Folder already exists";
    } else {
      form.submit();
      const loading = document.querySelector(
        "#createFolderModal .loadingContainer"
      );
      document.querySelector("#createFolderModal form").classList.add("hidden");
      loading.classList.remove("hidden");
    }
  } else {
    error.classList.remove("none");
    error.textContent = "Folder Name cannot be empty";
  }
};

const openDeleteFolderModal = () => {
  const modal = document.querySelector("#deleteFolderModal");
  modal.showModal();
};

const closeDeleteFolderModal = () => {
  const modal = document.querySelector("#deleteFolderModal");
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
