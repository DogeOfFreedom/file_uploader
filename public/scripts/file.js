const openDeleteFileModal = () => {
  const modal = document.querySelector("#deleteFileModal");
  modal.showModal();
};

const closeDeleteFileModal = () => {
  const modal = document.querySelector("#deleteFileModal");
  modal.close();
};

const openUpdateFileModal = () => {
  const modal = document.querySelector("#updateFileModal");
  modal.showModal();
};

const closeUpdateFileModal = () => {
  const modal = document.querySelector("#updateFileModal");
  modal.close();
};

const updateFileSubmit = async (folderId, type) => {
  const form = document.querySelector("#updateFileModal form");
  const { value } = document.querySelector("#updateFileModal form input");
  const error = document.querySelector("#updateFileModal p");

  if (value.length >= 1) {
    // Does file already exist?
    const { exists } = await fetch(
      `http://localhost:3000/file/exists?filename=${value}&folderId=${folderId}&type=${type}`,
      {
        method: "post",
      }
    )
      .then((res) => res.json())
      .catch((e) => console.log(e));
    if (exists) {
      error.classList.remove("none");
      error.textContent = "Filename taken";
    } else {
      form.submit();
      const loading = document.querySelector(
        "#updateFileModal .loadingContainer"
      );
      document.querySelector("#updateFileModal form").classList.add("hidden");
      loading.classList.remove("hidden");
    }
  } else {
    error.classList.remove("none");
    error.textContent = "Folder Name cannot be empty";
  }
};

// https://dogeoffreedom-file-uploader.adaptable.app
