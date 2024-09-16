// src/components/Accueil.js
import React, { useEffect, useState } from "react";

import Pecheur from "../assets/images/image-1.jpg";
import Gerbier from "../assets/images/image-2.jpg";
import Festival from "../assets/images/image-58.jpg";
import Paris from "../assets/images/image-75.jpg";
import Concert from "../assets/images/image-5.jpg";
import Horizon from "../assets/images/image-6.jpg";
import Plateau from "../assets/images/image-7.jpg";
import Ombre from "../assets/images/image-83.jpg";
import Billard from "../assets/images/image-9.jpg";
import Mer from "../assets/images/image-10.jpg";
import Chemin from "../assets/images/image-14.jpg";
import Foret from "../assets/images/image-12.jpg";
import Portugal from "../assets/images/image-26.jpg";
import Plage from "../assets/images/image-73.jpg";
import Piscine from "../assets/images/image-72.jpg";
import Verres from "../assets/images/image-94.jpg";
import Perspective from "../assets/images/image-17.jpg";
import Salon from "../assets/images/image-18.jpg";
import Bouteilles from "../assets/images/image-19.jpg";

function Accueil() {
  // Déclarez l'état pour l'image choisie aléatoirement
  const [randomImage, setRandomImage] = useState(null);
  const rawImages = `[{"filename":"${Pecheur}","name":"pécheurs","author":"stephane Valentin","exposure":"100 ISO - 18 mm - f/22 - 302 Sec"},
    {"filename":"${Gerbier}","name":"mont gerbier sous la neige","author":"stephane valentin","exposure":"200 ISO - 150 mm - f/10 - 1/320 Sec"},
    {"filename":"${Festival}","name":"festival","author":"stephane valentin","exposure":"100 ISO - 59 mm - f/13 - 1/250 Sec"},
    {"filename":"${Paris}","name":"Paris","author":"stephane Valentin","exposure":"100 ISO - 18 mm - f/22 - 531 Sec"},
    {"filename":"${Concert}","name":"concert","author":"stephane Valentin","exposure":"100 ISO - 128 mm - f/11 - 1/250 Sec"},
    {"filename":"${Horizon}","name":"l'horizon","author":"stephane Valentin","exposure":"100 ISO - 150 mm - f/28 - 1/320 Sec"},
    {"filename":"${Plateau}","name":"plateau ardéchois enneigé","author":"stephane Valentin","exposure":"100 ISO - 26 mm - f/10 - 1/100 Sec"},
    {"filename":"${Ombre}","name":"ombre lumiere","author":"stephane Valentin","exposure":"100 ISO - 37 mm - f/11 - 1/400 Sec"},
    {"filename":"${Billard}","name":"Le billard","author":"stephane Valentin","exposure":"100 ISO - 24 mm - f/5 - 1/200 Sec"},
    {"filename":"${Mer}","name":"La mer qu'on voit danser...","author":"stephane Valentin","exposure":"200 ISO - 150 mm - f/6.3 - 1/320 Sec"},
    {"filename":"${Chemin}","name":"chemin de rando","author":"stephane Valentin","exposure":"200 ISO - 39 mm - f/10 - 1/640 Sec"},
    {"filename":"${Foret}","name":"La forêt","author":"stephane Valentin","exposure":"100 ISO - 20 mm - f/11 - 1/80 Sec"},
    {"filename":"${Portugal}","name":"portugal","author":"stephane Valentin","exposure":"200 ISO - 39 mm - f/13 - 1/200 Sec"},
    {"filename":"${Plage}","name":"plage n&b","author":"stephane Valentin","exposure":"200 ISO - 70 mm - f/8.0 - 1/100 Sec"},
    {"filename":"${Piscine}","name":"piscine nature","author":"stephane Valentin","exposure":"100 ISO - 18 mm - f/22 - 302 Sec"},
    {"filename":"${Verres}","name":"verres","author":"stephane Valentin","exposure":"100 ISO - 18 mm - f/22 - 302 Sec"},
    {"filename":"${Perspective}","name":"perspective","author":"stephane Valentin","exposure":"100 ISO - 18 mm - f/22 - 302 Sec"},
    {"filename":"${Salon}","name":"salon n&b","author":"stephane Valentin","exposure":"100 ISO - 18 mm - f/22 - 302 Sec"},
    {"filename":"${Bouteilles}","name":"bleu bouteilles","author":"stephane Valentin","exposure":"100 ISO - 18 mm - f/22 - 302 Sec"}]`;

  useEffect(() => {
    // Définition du tableau d'images

    // Conversion en objet JavaScript
    const images = JSON.parse(rawImages);

    // Choix d'une image aléatoire
    const chosenImage = images[Math.floor(Math.random() * images.length)];

    // Définir l'état de l'image choisie
    setRandomImage(chosenImage);

    // Ajuster le style des images après que le composant a été rendu
    const imagesElements = document.querySelectorAll("img");
    imagesElements.forEach((image) => {
      image.style.objectFit = "contain";
    });
  }, [setRandomImage]); // le tableau vide [] signifie que ce useEffect est exécuté une seule fois, après le premier rendu

  return (
    <section
      id="pageContent"
      className="home"
      style={{
        backgroundImage: randomImage ? `url(${randomImage.filename})` : "none",
      }}
    >
      <div id="pictInfo">
        {randomImage ? (
          <>
            <h1>{randomImage.name}</h1>
            <p>{randomImage.author}</p>
            <p>{randomImage.exposure}</p>
          </>
        ) : (
          <p>Chargement...</p>
        )}
      </div>
    </section>
  );
}

export default Accueil;
