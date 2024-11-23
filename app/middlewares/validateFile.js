const validateFile = (req, res, next) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({
      status: "fail",
      message: "Terjadi kesalahan dalam melakukan prediksi",
    });
  }
  next();
};

module.exports = validateFile;
