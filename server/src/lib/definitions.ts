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

export type ParsedNewRecipeType = {
  title: string;
  personsInt: number;
  category: string;
  difficulty: string;
  costInt: number;
  parsedLabels: string[] | [];
  parsedIngredients: {
    name: string;
    quantity: number;
    unit: string;
  }[];
  parsedSteps: {
    description: string;
  }[];
  image?: File;
};

export type CommentType = {
  id: number;
  rating: number;
  text: string;
  recipe_id: number;
  user_id: number;
};

export type FavoriType = {
  user_id: number;
  recipe_id: number;
};

export type UserRoleType = {
  id: number;
  role_id: number;
};
