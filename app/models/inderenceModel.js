const tf = require("@tensorflow/tfjs-node");

let model;

// URL model di Cloud Storage
const MODEL_URL =
  "https://storage.googleapis.com/ml-model-bucket-last/model/model.json";

// Fungsi untuk memuat model dari Cloud Storage
const loadModel = async () => {
  if (!model) {
    try {
      console.log("Loading graph model from Cloud Storage...");
      model = await tf.loadGraphModel(MODEL_URL); // Memuat model langsung dari Cloud Storage
      console.log("Model loaded successfully.");
    } catch (error) {
      console.error("Error loading model:", error.message);
      throw new Error("Failed to load graph model.");
    }
  }
  return model;
};

// Fungsi untuk melakukan prediksi
const predictCancer = async (imagePath) => {
  try {
    const model = await loadModel();

    // Baca file gambar sebagai buffer
    const fs = require("fs");
    const imageBuffer = fs.readFileSync(imagePath);
    const decodedImage = tf.node.decodeImage(imageBuffer);

    // Ubah ukuran gambar ke 224x224 dan normalisasi
    const resizedImage = tf.image.resizeBilinear(decodedImage, [224, 224]);
    const normalizedImage = resizedImage.div(255.0).expandDims(0);

    // Prediksi menggunakan model
    const predictions = model.execute({
      MobilenetV3large_input: normalizedImage,
    });
    const result = predictions.dataSync()[0]; // Hasil prediksi dalam rentang 0-1
    return result > 0.5784669518470764;
  } catch (error) {
    console.log("Prediction raw value:", result);
    console.error("Prediction Error:", error.message);
    throw new Error("Prediction failed.");
  }
};

module.exports = { predictCancer };
