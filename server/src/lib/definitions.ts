export type UserType = {
  id?: number;
  firstname: string;
  lastname: string;
  pseudo: string;
  email: string;
  password: string;
  role_id?: number;
  age: number;
  is_validated?: boolean;
};

export type AdminUpdateUser = {
  id: number;
  pseudo: string;
  role_id: number;
  is_validated: boolean;
};

export type AdminUpdateRecipe = {
  id: number;
  name: string;
  is_validated: boolean;
};

export type AdminUpdateIngredient = {
  id: number;
  nom: string;
  calories: number;
  is_validated: boolean;
};
