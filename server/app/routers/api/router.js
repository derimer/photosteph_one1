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

  // Validation des champs requis
  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  try {
    // Création du contact dans le repository
    const id = await contactRepository.create({
      firstName,
      lastName,
      email,
      message,
    });

    // Retourner une réponse en cas de succès
    return res
      .status(201)
      .json({ message: "Message enregistré avec succès", id });
  } catch (error) {
    // Gérer les erreurs et renvoyer une réponse
    console.error("Erreur lors de l'enregistrement du message:", error);

    return res
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

  try {
    const message = await contactRepository.readById(id);

    if (!message) {
      return res.status(404).json({ error: "Message non trouvé" });
    }

    await contactRepository.deleteById(id);
    return res.status(200).json({ message: "Message supprimé avec succès" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Erreur lors de la suppression du message" });
  }
});

module.exports = router;
