// Récupération des éléments du DOM
let pageContent = document.getElementById("pageContent");
let pictInfo = document.getElementById("pictInfo");

// Définition du tableau d'images
let rawImages = `[{"filename":"image-83.jpg","name":"pécheurs","author":"stephane Valentin","exposure":"100 ISO - 18 mm - f/22 - 302 Sec"},
{"filename":"image-2.jpg","name":"mont gerbier sous la neige","author":"stephane valentin","exposure":"200 ISO - 150 mm - f/10 - 1/320 Sec"},
{"filename":"image-58.jpg","name":"n&b lily","author":"stephane valentin","exposure":"100 ISO - 59 mm - f/13 - 1/250 Sec"},
{"filename":"image-75.jpg","name":"n&b lily","author":"stephane Valentin","exposure":"100 ISO - 18 mm - f/22 - 531 Sec"},
{"filename":"image-5.jpg","name":"concert","author":"stephane Valentin","exposure":"100 ISO - 128 mm - f/11 - 1/250 Sec"},
{"filename":"image-6.jpg","name":"l'horizon","author":"stephane Valentin","exposure":"100 ISO - 150 mm - f/28 - 1/320 Sec"},
{"filename":"image-7.jpg","name":"plateau ardéchois enneigé","author":"stephane Valentin","exposure":"100 ISO - 26 mm - f/10 - 1/100 Sec"},
{"filename":"image-83.jpg","name":"Le boulanger","author":"stephane Valentin","exposure":"100 ISO - 37 mm - f/11 - 1/400 Sec"},
{"filename":"image-9.jpg","name":"Le billard","author":"stephane Valentin","exposure":"100 ISO - 24 mm - f/5 - 1/200 Sec"},
{"filename":"image-10.jpg","name":"La mer qu'on voit danser...","author":"stephane Valentin","exposure":"200 ISO - 150 mm - f/6.3 - 1/320 Sec"},
{"filename":"image-11.jpg","name":"scene n&b","author":"stephane Valentin","exposure":"200 ISO - 39 mm - f/10 - 1/640 Sec"},
{"filename":"image-12.jpg","name":"La forêt","author":"stephane Valentin","exposure":"100 ISO - 20 mm - f/11 - 1/80 Sec"},
{"filename":"image-13.jpg","name":"audrey","author":"stephane Valentin","exposure":"200 ISO - 39 mm - f/13 - 1/200 Sec"},
{"filename":"image-14.jpg","name":"chemin de randonnée","author":"stephane Valentin","exposure":"200 ISO - 70 mm - f/8.0 - 1/100 Sec"},
{"filename":"image-15.jpg","name":"mariage gitan","author":"stephane Valentin","exposure":"100 ISO - 18 mm - f/22 - 302 Sec"},
{"filename":"image-16.jpg","name":"n&b","author":"stephane Valentin","exposure":"100 ISO - 18 mm - f/22 - 302 Sec"},
{"filename":"image-17.jpg","name":"profondeur","author":"stephane Valentin","exposure":"100 ISO - 18 mm - f/22 - 302 Sec"},
{"filename":"image-18.jpg","name":"salon n&b","author":"stephane Valentin","exposure":"100 ISO - 18 mm - f/22 - 302 Sec"},
{"filename":"image-19.jpg","name":"bleu bouteilles","author":"stephane Valentin","exposure":"100 ISO - 18 mm - f/22 - 302 Sec"}]`;

// Conversion en objet JavaScript
let images = JSON.parse(rawImages);

// Choix d'une image aléatoire
let randomImage = images[Math.floor(Math.random() * images.length)];

// Appliquer l'image de fond à l'élément pageContent
pageContent.style.backgroundImage = `url(/images/${randomImage.filename})`;
let images2 = document.querySelectorAll("img");
images2.forEach((image) => {
  image.style.objectFit = "contain";
});

if (pictInfo) {
  // Vider le div pictInfo
  while (pictInfo.firstChild) {
    pictInfo.removeChild(pictInfo.firstChild);
  }

  // Créer et ajouter le titre pictInfo
  let pictTitle = document.createElement("h1");
  let pictTitleContent = document.createTextNode(randomImage.name);
  pictTitle.appendChild(pictTitleContent);
  pictInfo.appendChild(pictTitle);

  // Créer et ajouter les informations sur l'auteur et l'exposition
  let pictauthor = document.createElement("p");
  let pictData = document.createElement("p");
  let pictAuthorContent = document.createTextNode(randomImage.author);
  let pictDataContent = document.createTextNode(randomImage.exposure);
  pictauthor.appendChild(pictAuthorContent);
  pictData.appendChild(pictDataContent);
  pictInfo.appendChild(pictauthor);
  pictInfo.appendChild(pictData);
}
