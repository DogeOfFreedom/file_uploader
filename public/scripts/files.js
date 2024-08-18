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
const uploadFileSubmit = async (folderId) => {
  const form = document.querySelector("#uploadFileModal form");
  const file = document.querySelector(
    "#uploadFileModal form input[type='file']"
  );
  const error = document.querySelector("#uploadFileModal p");
  const filenameInput = document.querySelector(
    "#uploadFileModal form input[type='text']"
  );

  // No file uploaded
  if (!file.value) {
    error.classList.remove("none");
    error.textContent = "Please choose a file";
  } else {
    // Does file already exist?
    const filenameComponents = file.value.split("\\").pop().split(".");
    const type = filenameComponents[1];

    // Did user enter custom file name?
    const filename =
      filenameInput.value === "" ? filenameComponents[0] : filenameInput.value;

    const { exists } = await fetch(
      `https://dogeoffreedom-file-uploader.adaptable.app/file/exists?filename=${filename}&folderId=${folderId}&type=${type}`,
      {
        method: "post",
      }
    )
      .then((res) => res.json())
      .catch((e) => {
        console.log(e);
      });
    if (exists) {
      error.classList.remove("none");
      error.textContent = "File Name Taken";
    } else {
      form.submit();
      const loading = document.querySelector(
        "#uploadFileModal .loadingContainer"
      );
      document.querySelector("#uploadFileModal form").classList.add("hidden");
      loading.classList.remove("hidden");
    }
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

const createFolderSubmit = async (folderId) => {
  const form = document.querySelector("#createFolderModal form");
  const { value } = document.querySelector("#createFolderModal form input");
  const error = document.querySelector("#createFolderModal p");

  if (value.length >= 1) {
    // Does folder already exist?
    const { exists } = await fetch(
      `https://dogeoffreedom-file-uploader.adaptable.app/folder/exists?foldername=${value}&folderId=${folderId}`,
      {
        method: "post",
      }
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

const openUpdateFolderModal = () => {
  const modal = document.querySelector("#updateFolderModal");
  modal.showModal();
};

const closeUpdateFolderModal = () => {
  const modal = document.querySelector("#updateFolderModal");
  modal.close();
};

const updateFolderSubmit = async (folderId) => {
  const form = document.querySelector("#updateFolderModal form");
  const { value } = document.querySelector("#updateFolderModal form input");
  const error = document.querySelector("#updateFolderModal p");

  if (value.length >= 1) {
    // Does folder already exist?
    const { exists } = await fetch(
      `https://dogeoffreedom-file-uploader.adaptable.app/folder/exists?foldername=${value}&folderId=${folderId}`,
      {
        method: "post",
      }
    )
      .then((res) => res.json())
      .catch((e) => console.log(e));
    if (exists) {
      error.classList.remove("none");
      error.textContent = "Folder Name taken";
    } else {
      form.submit();
      const loading = document.querySelector(
        "#updateFolderModal .loadingContainer"
      );
      document.querySelector("#updateFolderModal form").classList.add("hidden");
      loading.classList.remove("hidden");
    }
  } else {
    error.classList.remove("none");
    error.textContent = "Folder Name cannot be empty";
  }
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
