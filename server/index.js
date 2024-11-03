require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const apiRouter = require("./app/routers/api/router");

const app = express();
const port = process.env.APP_PORT || 3310;

// Créez la connexion à la base de données ici
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
}).promise();

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});


// Route de test pour la base de données
app.get("/api/test-db", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT 1");
        res.json({ message: "Connexion à la base de données réussie", data: rows });
    } catch (error) {
        res.status(500).json({
            message: "Erreur de connexion à la base de données",
            error: error.message,
        });
    }
});
app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  try {
      const result = await db.query("INSERT INTO Contact (firstName, lastName, email, message) VALUES (?, ?, ?, ?)", [firstName, lastName, email, message]);
      console.log("Message inséré avec succès:", result); // Log de l'insertion
      res.status(201).send("Message reçu et enregistré !");
  } catch (error) {
      console.error("Erreur lors de l'insertion du message:", error);
      res.status(500).send("Erreur lors de l'enregistrement du message !");
  }
});


// Utilisez le router API
app.use("/api", apiRouter);

// Middleware de gestion des erreurs
app.use((err, req, res, next) => { // Ajoutez 'next' comme quatrième paramètre
  console.error(err.stack);
  res.status(500).send("Quelque chose s'est mal passé !");
});


// Démarrage du serveur
app.listen(port, () => {
    console.info(`Server is listening on port ${port}`);
}).on("error", (err) => {
    console.error("Error:", err.message);
});

module.exports = { db };
