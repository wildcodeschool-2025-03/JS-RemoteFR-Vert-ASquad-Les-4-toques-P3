export type AdminRecipeType = {
  user_id: number;
  name: string;
  id: number;
  is_validated: boolean;
};

export type AdminIngredientsType = {
  nom: string;
  calories: number;
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
  difficulty: string;
  nb_people: number;
  picture: string;
  is_validated: boolean;
  user_id: number;
};

export type stepType = {
  id: number;
  description: string;
};

export type ingredientType = {
  id: number;
  nom: string;
  calories: string;
  is_validated: boolean;
  [key: string]: string | number | boolean;
};

export type CommentType = {
  id: number;
  text: string;
  rating: number;
  pseudo: string;
};
