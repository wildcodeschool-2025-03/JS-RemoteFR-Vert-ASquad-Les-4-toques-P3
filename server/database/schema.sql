
CREATE TABLE category (
  id INT AUTO_INCREMENT PRIMARY KEY ,
  name VARCHAR(25)
);

CREATE TABLE recipe(
id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
name VARCHAR(45),
cost INT UNSIGNED NOT NULL,
difficulty INT UNSIGNED NOT NULL,
nb_people INT UNSIGNED NOT NULL,
qte_ingredients INT UNSIGNED NOT NULL,
picture TEXT,
additional_text VARCHAR(255),
is_validated BOOLEAN NOT NULL,
category_id INT,
FOREIGN KEY (category_id) REFERENCES category(id),
user_id INT 
);



CREATE TABLE ingredient (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nom VARCHAR(50),
    calories VARCHAR(10),
    proteines VARCHAR(10),
    glucides VARCHAR(10),
    lipides VARCHAR(10),
    sucre VARCHAR(10),
    sel VARCHAR(10),
    is_validated BOOLEAN DEFAULT false
);


CREATE TABLE recipe_ingredient (
  recipe_id INT,
  ingredient_id INT,
  PRIMARY KEY (recipe_id, ingredient_id),
  FOREIGN KEY (recipe_id) REFERENCES recipe(id) ON DELETE CASCADE,
  FOREIGN KEY (ingredient_id) REFERENCES ingredient(id) ON DELETE NO ACTION
);


CREATE TABLE step (
  id INT AUTO_INCREMENT PRIMARY KEY,
  step_number INT UNSIGNED NOT NULL,
  title VARCHAR(255),
  description TEXT,
  image VARCHAR(255),
  recipe_id INT,
  FOREIGN KEY (recipe_id) REFERENCES recipe(id) ON DELETE CASCADE
);


CREATE TABLE role (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  label VARCHAR(45)
);

CREATE TABLE user (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  firstname VARCHAR(45) NOT NULL,
  lastname VARCHAR(45) NOT NULL,
  pseudo VARCHAR (45) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  age INT NOT NULL,
  role_id INT,
  is_validated BOOLEAN DEFAULT false,
  FOREIGN KEY (role_id) REFERENCES role(id)
);

CREATE TABLE comment (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  rating INT NULL,
  name VARCHAR(45),
  text TEXT,
  recipe_id INT,
  user_id INT,
  FOREIGN KEY (recipe_id) REFERENCES recipe(id),
  FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE label (
  id INT AUTO_INCREMENT PRIMARY KEY,
  label VARCHAR(45),
  image VARCHAR(255)
);

CREATE TABLE recipe_label(
  label_id INT,
  recipe_id INT,
  PRIMARY KEY (label_id, recipe_id),
  FOREIGN KEY (recipe_id) REFERENCES recipe(id) ON DELETE CASCADE
);

CREATE TABLE favori (
  recipe_id INT,
  user_id INT,
  FOREIGN KEY (recipe_id) REFERENCES recipe(id),
  FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE week_meal (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(45) NULL,
  recipe_id INT,
  user_id INT,
  FOREIGN KEY (recipe_id) REFERENCES recipe(id),
  FOREIGN KEY (user_id) REFERENCES user(id)
);



/**Feeding ingredient table */
INSERT INTO ingredient (nom, calories, proteines, glucides, lipides, sucre, sel) VALUES
('Tomate', '18', '0.9', '3.9', '0.2', '2.6', '0'),
('Pain', '265', '9', '49', '3.2', '5', '0.5'),
('Mozzarella', '280', '18', '2', '22', '1', '0.7'),
('Huile d\'olive', '884', '0', '0', '100', '0', '0'),
('Basilic', '23', '3.2', '2.7', '0.6', '0.3', '0.08'),
('Crevettes', '99', '24', '0.2', '0.3', '0', '0.3'),
('Lait de coco', '230', '2.3', '6', '24', '3.3', '0.05'),
('Courgette', '17', '1.2', '3.1', '0.3', '2.5', '0.003'),
('Ail', '149', '6.4', '33', '0.5', '1', '0.02'),
('Chocolat','525', '8,48', '34,1', '42,3', '2', '0,006'),
('Beurre', '753', '0,69', '0,9', '82,9', '0,83', '0,063'),
('Sucre roux', ' -', '0,12', '97,3', '0', '95,5', '0,1'),
('Farine', '346', '14,9', '67,6', '1', '1,5', '0,03'),
('Levure chimique', '-', '1,96', '33,2', '0,2', '0,1', '-'),
('Oeuf', '140', '12,7', '0,27', '9,83', '0,27', '0,31'),
('Sel', '0', '0', '0', '0', '0', '97,8'),
('Pépites de chocolat noir', '525', '8,48', '34,1', '42,3', '2', '0,006'); 

/** Feeding category table */

INSERT INTO category (name) VALUES ("entrée");

INSERT INTO category (name) VALUES ("plat");

INSERT INTO category (name) VALUES ("dessert");


/** Feeding label table */

INSERT INTO label (label) VALUES ("vegetarien");

INSERT INTO label (label) VALUES ("vegan");

INSERT INTO label (label ) VALUES ("sans gluten");


/** essai de recettes: à supprimer avant passage en prod */
INSERT INTO recipe (name, picture,  cost, difficulty, nb_people, qte_ingredients, is_validated, category_id) VALUES ("tomates sur du pain","https://www.cuisineactuelle.fr/imgre/fit/~1~cac~2024~09~30~516b1838-4a01-4087-8065-c4e77263c294.jpeg/422x211/quality/70/crop-from/center/focus-point/789%2C568/bruschetta-facon-pain-perdu-la-recette-au-pesto-tomates-et-champignons-pour-ne-plus-jeter-la-baguette-de-la-veille.jpeg", 1, 1, 3, 3, 1, 1);
INSERT INTO recipe (name, picture, cost, difficulty, nb_people, qte_ingredients, is_validated, category_id) VALUES ("crevettes au lait de coco","https://www.mgc-prevention.fr/wp-content/uploads/2010/11/crevettes_coco_2140553819.jpg", 2, 1, 3, 3, 1, 1);
INSERT INTO recipe (name, picture, cost, difficulty, nb_people, qte_ingredients, is_validated, category_id) VALUES ("courgettes à l'ail","https://img.freepik.com/photos-premium/salade-tiede-aux-jeunes-courgettes-ail-aux-herbes_2829-8847.jpg", 2, 1, 3, 3, 1, 1);

INSERT INTO recipe (name, picture, cost, difficulty, nb_people, qte_ingredients, is_validated, category_id) VALUES 
("Brookie","https://frostingandfettuccine.com/wp-content/uploads/2023/12/Brookies-8.jpg", 1, 1, 4, 3, 1, 3);

INSERT INTO recipe (name, picture, cost, difficulty, nb_people, qte_ingredients, is_validated, category_id) VALUES 
("Cookie","https://fac.img.pmdstatic.net/fit/~1~fac~2024~12~05~f08509b8-9da1-4f0d-b7cf-e18e6691e1b2.jpg/850x478/quality/80/crop-from/center/focus-point/1423%2C628/cookie-sans-levure.jpeg", 1, 1, 4, 3, 1, 3);

INSERT INTO recipe (name, picture, cost, difficulty, nb_people, qte_ingredients, is_validated, category_id) VALUES 
("Brownie","https://i.f1g.fr/media/cms/orig/2025/02/24/4fbc517f2898d1b251f62e3c85a424764c69d3b6c950af2b399824336b1f6645.jpg", 1, 1, 4, 3, 1, 3);

INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (1, 1);
INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (1, 2);
INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (1, 3);
INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (1, 4);
INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (1, 5);


INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (2, 6);
INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (2, 7);

INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (3, 8);
INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (3, 9);

INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (4, 10);
INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (4, 11);
INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (4, 12);
INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (4, 13);
INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (4, 14);
INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (4, 15);
INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (4, 16);
INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (4, 17);

INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (5, 11);
INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (5, 12);
INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (5, 13);
INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (5, 14);
INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (5, 15);
INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (5, 16);
INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (5, 17);

INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (6, 10);
INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (6, 11);
INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (6, 12);
INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (6, 13);
INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (6, 14);
INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (6, 15);
INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (6, 16);
INSERT INTO recipe_ingredient (recipe_id, ingredient_id) VALUES (6, 17);

INSERT INTO recipe_label (label_id, recipe_id) VALUES (1, 1);
INSERT INTO recipe_label (label_id, recipe_id) VALUES (1, 3);
INSERT INTO recipe_label (label_id, recipe_id) VALUES (3, 3);
INSERT INTO recipe_label (label_id, recipe_id) VALUES (1, 4);
INSERT INTO recipe_label (label_id, recipe_id) VALUES (1, 5);
INSERT INTO recipe_label (label_id, recipe_id) VALUES (1, 6);




INSERT INTO step (step_number,title,description,recipe_id) VALUES (1, "couper les tomates en tranches", "blablabla", 1);
INSERT INTO step (step_number,title,description,recipe_id) VALUES (2, "couper le pain en tranches", "blablabla", 1);
INSERT INTO step (step_number,title,description,recipe_id) VALUES (3, "Couper la mozzarella en tranches", "blablabla", 1);
INSERT INTO step (step_number,title,description,recipe_id) VALUES (4, "Mettre la mozzarella sur une tranche de pain", "blablabla", 1);
INSERT INTO step (step_number,title,description,recipe_id) VALUES (5, "Mettre les tranches de tomates par dessus", "blablabla", 1);
INSERT INTO step (step_number,title,description,recipe_id) VALUES (6, "Terminer par un filet d'huile d'olive", "saler, poivrer selon convenance", 1);

INSERT INTO step (step_number,title,description,recipe_id) VALUES (1, "Mettre les crevettes dans le lait de coco", "blablabla", 2);
INSERT INTO step (step_number,title,description,recipe_id) VALUES (2, "Faire chauffer", "blablabla", 2);

INSERT INTO step (step_number,title,description,recipe_id) VALUES (1, "Couper les courgettes en tranches", "émincer l'ail", 3);
INSERT INTO step (step_number,title,description,recipe_id) VALUES (2, "Faire revenir le tout à la poele", "blablabla", 3);

INSERT INTO step (step_number,title,description,recipe_id) VALUES (1, "Préchauffer le four à 180°", "", 4);
INSERT INTO step (step_number,title,description,recipe_id) VALUES (2, "Faire fondre le chocolat au bain marie", "", 4);
INSERT INTO step (step_number,title,description,recipe_id) VALUES (3, "Hors du feu ajouter le sucre, le beurre, l'oeuf et la farine", "Mélanger", 4);
INSERT INTO step (step_number,title,description,recipe_id) VALUES (4, "verser la preparation dans le moule", "Si il n'est pas en silicone, il est préférable de le beurrer et de le fariner", 4);
INSERT INTO step (step_number,title,description,recipe_id) VALUES (5, "Melanger la farine, le beurre, la levure et le sucre", "puis ajouter l'oeuf", 4);
INSERT INTO step (step_number,title,description,recipe_id) VALUES (6, "mettre les pépites de chocolat dans la pate à cookie","", 4);
INSERT INTO step (step_number,title,description,recipe_id) VALUES (7, "repartir la pate a cookie sur le brownie","mettre au four à 180° pendant 22min", 4);

INSERT INTO step (step_number,title,description,recipe_id) VALUES (1, "Préchauffer le four à 180°", "", 5);
INSERT INTO step (step_number,title,description,recipe_id) VALUES (2, "Mélanger le sucre, le beurre, l'oeuf et la farine", "ajouter les pépites de chocolat", 5);
INSERT INTO step (step_number,title,description,recipe_id) VALUES (3, "Faire des petites boules de pate", "", 5);
INSERT INTO step (step_number,title,description,recipe_id) VALUES (4, "Les disposer sur une feuille de papier cuisson","", 5);
INSERT INTO step (step_number,title,description,recipe_id) VALUES (5, "mettre au four à 180° pendant 22min","", 5);

INSERT INTO step (step_number,title,description,recipe_id) VALUES (1, "Préchauffer le four à 180°", "", 6);
INSERT INTO step (step_number,title,description,recipe_id) VALUES (2, "Faire fondre le chocolat au bain marie", "", 6);
INSERT INTO step (step_number,title,description,recipe_id) VALUES (3, "Hors du feu ajouter le sucre, le beurre, l'oeuf et la farine", "Mélanger", 6);
INSERT INTO step (step_number,title,description,recipe_id) VALUES (4, "verser la preparation dans le moule", "Si il n'est pas en silicone, il est préférable de le beurrer et de le fariner", 6);
INSERT INTO step (step_number,title,description,recipe_id) VALUES (5, "mettre au four à 180° pendant 22min","", 6);


INSERT INTO role (id, label) VALUES (1, "administrateur"), (2, "visiteur"), (3, "utilisateur");

INSERT INTO user (
  firstname, lastname, pseudo, email, password, age, role_id, is_validated
) VALUES (
  "Jeanne", "Pionne", "jeanneP", "jeanne@example.com", "hashed_pass5", 30, 1, false
);
