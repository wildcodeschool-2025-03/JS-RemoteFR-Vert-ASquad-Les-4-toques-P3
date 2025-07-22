
CREATE TABLE category (
  id INT AUTO_INCREMENT PRIMARY KEY ,
  name VARCHAR(25)
);

CREATE TABLE recipe(
id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
name VARCHAR(50) UNIQUE,
cost INT UNSIGNED NOT NULL,
difficulty VARCHAR(45) NOT NULL,
nb_people INT UNSIGNED NOT NULL,
picture TEXT,
is_validated BOOLEAN DEFAULT false,
category_id INT,
FOREIGN KEY (category_id) REFERENCES category(id),
user_id INT 
);



CREATE TABLE ingredient (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    nom VARCHAR(50) UNIQUE,
    calories VARCHAR(10) DEFAULT null, 
    is_validated BOOLEAN DEFAULT false
);


CREATE TABLE recipe_ingredient (
  recipe_id INT,
  ingredient_id INT,
  quantity INT UNSIGNED NOT NULL,
  unit VARCHAR(10),
  PRIMARY KEY (recipe_id, ingredient_id),
  FOREIGN KEY (recipe_id) REFERENCES recipe(id) ON DELETE CASCADE,
  FOREIGN KEY (ingredient_id) REFERENCES ingredient(id) ON DELETE NO ACTION
);


CREATE TABLE step (
  id INT AUTO_INCREMENT PRIMARY KEY,
  description TEXT,
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






