const { predictCancer } = require("../models/inferenceModel");
const { v4: uuidv4 } = require("uuid");

const predict = async (req, res) => {
  try {
    console.log("Request received for prediction."); // Log awal untuk debugging
    const file = req.file;

    // Validasi jika file tidak diterima
    if (!file) {
      console.error("File tidak ditemukan dalam permintaan!"); // Log error
      return res.status(400).json({
        status: "fail",
        message: "File tidak ditemukan dalam permintaan!",
      });
    }

    console.log("File received for prediction:", file); // Log informasi file

    // Jalankan prediksi
    console.log("Starting model prediction...");
    const result = await predictCancer(file.path);

    // Log hasil prediksi mentah
    console.log("Prediction raw result:", result);

    const response = {
      id: uuidv4(),
      result: result ? "Cancer" : "Non-cancer",
      suggestion: result
        ? "Segera periksa ke dokter!"
        : "Penyakit kanker tidak terdeteksi.",
      createdAt: new Date().toISOString(),
    };

    console.log("Prediction result response:", response); // Log respons akhir

    // Kirimkan respons sukses
    return res.status(201).json({
      status: "success",
      message: "Model is predicted successfully",
      data: response,
    });
  } catch (error) {
    console.error("Error during prediction:", error); // Log error saat proses prediksi
    return res.status(400).json({
      status: "fail",
      message: "Terjadi kesalahan dalam melakukan prediksi",
    });
  }
};

module.exports = { predict };
