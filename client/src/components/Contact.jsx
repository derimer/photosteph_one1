import React, { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3310/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du message");
      }

      setStatus("Message envoyé avec succès !");
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
    } catch (error) {
      console.error("Erreur:", error);
      setStatus("Erreur lors de l'envoi du message");
    }
  };

  return (
    <main id="contact1">
      <h1>Contactez-moi</h1>
      <p>
        Merci de compléter le formulaire suivant pour me contacter. Tous les
        champs de ce formulaire sont requis.
      </p>
      <form onSubmit={handleSubmit} id="frmContact" noValidate>
        <div id="leftCol">
          <div>
            <label htmlFor="firstName">Prénom</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              id="fName"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName">Nom de Famille</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              id="lName"
              required
            />
          </div>
          <div>
            <label htmlFor="email">Adresse e-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              id="email"
              required
            />
          </div>
        </div>
        <div id="rightCol">
          <div>
            <label htmlFor="message">Votre Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
        </div>
        <button type="submit">Envoyer</button>
        {status && <p>{status}</p>}
      </form>
    </main>
  );
}
