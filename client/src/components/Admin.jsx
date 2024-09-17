import React, { useState, useEffect } from "react";

export default function Admin() {
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState({
    name: "",
    author: "",
    exposure: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMessages();
    fetchImages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:3310/api/admin/messages");
      if (!response.ok)
        throw new Error("Erreur lors de la récupération des messages");
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Erreur:", error);
      setError("Impossible de charger les messages");
    }
  };

  const fetchImages = async () => {
    try {
      const response = await fetch("http://localhost:3310/api/images");
      if (!response.ok)
        throw new Error("Erreur lors de la récupération des images");
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Erreur:", error);
      setError("Impossible de charger les images");
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    
     
    // 10 Mo
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleAddImage = async () => {
    if (!file || !newImage.name || !newImage.author || !newImage.exposure) {
      setError("Veuillez remplir tous les champs et sélectionner une image");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", newImage.name);
    formData.append("author", newImage.author);
    formData.append("exposure", newImage.exposure);
  
    try {
      const response = await fetch("http://localhost:3310/api/add-image", {
        method: "POST",
        body: formData,
      });
  
      // Vérifiez si la réponse est au format JSON
     if (!response.ok) throw new Error("Erreur lors de l'ajout de l'image");
    
     const data = await response.json();
    console.log("Image ajoutée avec succès", data);
 
  setImages([...images, data.image]);
  setNewImage({ name: "", author: "", exposure: "" });
    setFile(null);
    setPreview("");
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'image:", error);
    setError("Erreur lors de l'ajout de l'image");
  }
}

  

  const handleDeleteImage = async (id) => {
    try {
      const response = await fetch(`http://localhost:3310/api/images/${id}`, {
        method: "DELETE",
      });
      if (!response.ok)
        throw new Error("Erreur lors de la suppression de l'image");
      setImages(images.filter((image) => image.id !== id));
    } catch (error) {
      console.error("Erreur:", error);
      setError("Erreur lors de la suppression de l'image");
    }
  };

  return (
    <div className="gestion">
      <h1>Gestion des Images</h1>
      {error && <p className="error">{error}</p>}

      <div className="ajoutImage">
        <h2>Ajouter une nouvelle image</h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
        />
        {preview && (
          <div>
            <h2>Prévisualisation:</h2>
            <img
              src={preview}
              alt="Prévisualisation"
              style={{ maxWidth: "300px" }}
            />
          </div>
        )}
        <input
          type="text"
          placeholder="Nom"
          value={newImage.name}
          onChange={(e) => setNewImage({ ...newImage, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Auteur"
          value={newImage.author}
          onChange={(e) => setNewImage({ ...newImage, author: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Exposition"
          value={newImage.exposure}
          onChange={(e) =>
            setNewImage({ ...newImage, exposure: e.target.value })
          }
          required
        />
        <button id ="ajouterImg" onClick={handleAddImage}>Ajouter l'image</button>
      </div>

      <div className ="exist">
        <h2>Images existantes</h2>
        <ul>
          {images.map((image) => (
            <li key={image.id}>
              {image.name} - {image.author} - {image.exposure}
              <button onClick={() => handleDeleteImage(image.id)}>
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Messages des utilisateurs</h2>
        {messages.length > 0 ? (
          <ul>
            {messages.map((message) => (
              <li key={message.id}>
                <strong>
                  {message.firstName} {message.lastName}
                </strong>{" "}
                ({message.email}):
                <p>{message.message}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucun message à afficher.</p>
        )}
      </div>
    </div>
  );
}
