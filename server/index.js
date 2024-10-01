require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const apiRouter = require("../server/app/routers/api/router");

const app = express();
const port = process.env.APP_PORT || 3310;

// Créez la connexion à la base de données ici
const db = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  })
  .promise();

module.exports = { db };

// Middleware pour logger toutes les requêtes
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.use("/favicon.ico", express.static(path.join(__dirname, "favicon.ico")));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.use(express.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Quelque chose s'est mal passé !");
});

app.get("/", (req, res) => {
  res.send("Bienvenue sur le serveur !");
});

// Utilisez le router API
app.use("/api", apiRouter);

// Test de la connexion à la base de données
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

// Loggez les routes enregistrées
console.log(
  "Routes enregistrées :",
  app._router.stack.filter((r) => r.route).map((r) => r.route.path)
);

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
