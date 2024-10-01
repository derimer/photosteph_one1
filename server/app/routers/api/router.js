const express = require("express");

const router = express.Router();
const imgActions = require("../../controllers/imgActions");
const ContactRepository = require("../../../database/models/ContactRepository");

const upload = require("../../services/CONFIG/multerConfig");

const contactRepository = new ContactRepository();

router.get("/images", imgActions.getAllImages);

router.post("/add-image", upload.single("file"), imgActions.addImage);

router.delete("/images/:id", imgActions.deleteImage);

router.post("/Contact", async (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  try {
    const id = await contactRepository.create({
      firstName,
      lastName,
      email,
      message,
    });
    res.status(201).json({ message: "Message enregistré avec succès", id });
  } catch (error) {
    console.error("Erreur lors de l'enregistrement du message:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de l'enregistrement du message" });
  }
});

router.get("/admin/messages", async (req, res) => {
  try {
    const messages = await contactRepository.readAll();
    res.json(messages);
  } catch (error) {
    console.error("Erreur lors de la récupération des messages:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des messages" });
  }
});
router.delete("/admin/messages/:id", async (req, res) => {
  const { id } = req.params;

  // Convertir l'ID en nombre et vérifier sa validité
  const numericId = parseInt(id, 10);
  if (Number.isNaN(numericId)) {
    return res.status(400).json({ message: "ID invalide" });
  }

  try {
    console.log("Tentative de suppression du message avec l'ID:", numericId);
    const success = await contactRepository.delete(numericId);
    if (success) {
      res.status(200).json({ message: "Message supprimé avec succès" });
    } else {
      res.status(404).json({ message: "Message non trouvé" });
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du message:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du message" });
  }
});
module.exports = router;
