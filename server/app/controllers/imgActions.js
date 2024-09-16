// controllers/imageController.js
const path = require("path");
const multer = require("multer"); // Importer Multer
const ImageRepository = require("../../database/models/imageRepository");

const imageRepository = new ImageRepository();

// Configuration Multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      path.join(__dirname, "../../../public/uploads/CONFIG/multerConfig")
    ); // Dossier de stockage
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    ); // Générer un nom de fichier unique
  },
});

const uploads = multer({ storage: storage }); // Initialiser Multer avec le stockage configuré

// Route pour obtenir toutes les images
exports.getAllImages = async (req, res) => {
  try {
    const images = await imageRepository.readAll();
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Route pour ajouter une image avec Multer
exports.addImage = [
  uploads.single("file"), // Utiliser Multer pour le téléchargement de fichiers
  async (req, res) => {
    const { name, author, exposure } = req.body;
    console.log("Fichier reçu:", req.file);
    console.log("Données reçues:", req.body);
    // Vérifiez si un fichier a été téléchargé
    if (!req.file) {
      return res.status(400).json({ message: "Aucun fichier téléchargé" });
    }

    const filename = req.file.filename; // Multer fournit le nom du fichier

    // Vérifiez si tous les champs nécessaires sont remplis
    if (!filename || !name || !author || !exposure) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    try {
      // Crée une entrée dans la base de données
      const id = await imageRepository.create({
        filename,
        name,
        author,
        exposure,
      });
      res.status(201).json({ message: "Image ajoutée avec succès", id });
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'image:", error.message);
      res.status(500).json({
        message: "Erreur lors de l'ajout de l'image",
        error: error.message,
      });
    }
  },
];

// Route pour supprimer une image
exports.deleteImage = async (req, res) => {
  const { id } = req.params;

  try {
    // Suppression de l'image dans la base de données
    await imageRepository.delete(id);
    res.json({ message: "Image supprimée avec succès" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};