const uploadFile = async (req, res) => {
  console.log(req.body);
  console.log(req.file);
};

module.exports = { uploadFile };
