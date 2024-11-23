const { Storage } = require("@google-cloud/storage");

// Inisialisasi Google Cloud Storage
const storage = new Storage({
  projectId: "submissionmlgc-haikal-last",
  keyFilename: "/root/project/service-account-key.json", // Pastikan file ini tersedia
});
const bucketName = "ml-model-bucket-last";

// Fungsi untuk mendownload model dari Cloud Storage
const downloadModel = async (destination) => {
  try {
    const fileName = "ml-model-bucket-last/model/model.json";
    const destinationPath = `${destination}/model.json`;

    console.log("Downloading model from Cloud Storage...");
    await storage
      .bucket(bucketName)
      .file(fileName)
      .download({ destination: destinationPath });

    console.log("Model downloaded to:", destinationPath);
  } catch (error) {
    console.error("Error downloading model:", error);
    throw error;
  }
};

module.exports = { downloadModel };
