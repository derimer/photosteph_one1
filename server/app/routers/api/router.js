const express = require("express");
const router = express.Router();
require("../../../../server/index");
const imgActions = require("../../controllers/imgActions.js");

const upload = require("../../../public/uploads/CONFIG/multerConfig");
const ContactRepository = require("../../../database/models/contactRepository");

const contactRepository = new ContactRepository();

router.get("/images", imgActions.getAllImages);
router.post("/add-image", upload.single("file"), imgActions.addImage);
router.delete("/images/:id", imgActions.deleteImage);

router.post("/contact", async (req, res) => {
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

module.exports = router;
