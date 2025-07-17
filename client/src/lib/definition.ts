export type AdminRecipeType = {
  user_id: number;
  name: string;
  id: number;
  is_validated: boolean;
};

export type AdminIngredientsType = {
  nom: string;
  calories: number;
  proteines: number;
  glucides: number;
  lipides: number;
  sucre: number;
  sel: number;
  id: number;
  is_validated: boolean;
};

export type AdminUserType = {
  pseudo: string;
  firstname: string;
  lastname: string;
  email: string;
  id: number;
  age: number;
  role_id: number;
  is_validated: boolean;
};

export type recipeType = {
  id: number;
  name: string;
  cost: number;
  difficulty: number;
  nb_people: number;
  qte_ingredients: number;
  picture: string;
  additional_text: string;
  is_validated: boolean;
  user_id: number;
};

export type stepType = {
  id: number;
  title: string;
  description: string;
};

export type ingredientType = {
  id: number;
  nom: string;
  calories: string;
  proteines: string;
  glucides: string;
  lipides: string;
  sucre: string;
  sel: string;
  is_validated: boolean;
  [key: string]: string | number | boolean;
};
