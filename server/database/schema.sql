CREATE TABLE user (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE item (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(255) NOT NULL,
  user_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE Contact (
  id INT AUTO_INCREMENT PRIMARY KEY,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL
);

CREATE TABLE images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  filename VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  exposure VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO images (filename, name, author, exposure) VALUES
('Pecheur', 'pécheurs', 'stephane Valentin', '100 ISO - 18 mm - f/22 - 302 Sec'),
('Gerbier', 'mont gerbier sous la neige', 'stephane valentin', '200 ISO - 150 mm - f/10 - 1/320 Sec'),
('Festival', 'festival', 'stephane valentin', '100 ISO - 59 mm - f/13 - 1/250 Sec'),
('Paris', 'Paris', 'stephane Valentin', '100 ISO - 18 mm - f/22 - 531 Sec'),
('Concert', 'concert', 'stephane Valentin', '100 ISO - 128 mm - f/11 - 1/250 Sec'),
('Horizon', 'l\'horizon', 'stephane Valentin', '100 ISO - 150 mm - f/28 - 1/320 Sec'),
('Plateau', 'plateau ardéchois enneigé', 'stephane Valentin', '100 ISO - 26 mm - f/10 - 1/100 Sec'),
('Ombre', 'ombre lumiere', 'stephane Valentin', '100 ISO - 37 mm - f/11 - 1/400 Sec'),
('Billard', 'Le billard', 'stephane Valentin', '100 ISO - 24 mm - f/5 - 1/200 Sec'),
('Mer', 'La mer qu\'on voit danser...', 'stephane Valentin', '200 ISO - 150 mm - f/6.3 - 1/320 Sec'),
('Chemin', 'chemin de rando', 'stephane Valentin', '200 ISO - 39 mm - f/10 - 1/640 Sec'),
('Foret', 'La forêt', 'stephane Valentin', '100 ISO - 20 mm - f/11 - 1/80 Sec'),
('Portugal', 'portugal', 'stephane Valentin', '200 ISO - 39 mm - f/13 - 1/200 Sec'),
('Plage', 'plage n&b', 'stephane Valentin', '200 ISO - 70 mm - f/8.0 - 1/100 Sec'),
('Piscine', 'piscine nature', 'stephane Valentin', '100 ISO - 18 mm - f/22 - 302 Sec'),
('Verres', 'verres', 'stephane Valentin', '100 ISO - 18 mm - f/22 - 302 Sec'),
('Perspective', 'perspective', 'stephane Valentin', '100 ISO - 18 mm - f/22 - 302 Sec'),
('Salon', 'salon n&b', 'stephane Valentin', '100 ISO - 18 mm - f/22 - 302 Sec'),
('Bouteilles', 'bleu bouteilles', 'stephane Valentin', '100 ISO - 18 mm - f/22 - 302 Sec');
