export type RecipesType = {
  id: number;
  name: string;
  picture: string;
  cost: number;
  difficulty: number;
  nb_people: number;
  qte_ingredients: number;
  etapes: string[];
  ing: string[];
};

export type Account = {
  id: number;
  firstname: string;
  lastname: string;
  role_id: number;
};

export type ContextType = {
  account: Account | null;
  isConnected: boolean;
  isLoading: boolean;
  authenticate: () => void;
  logout: () => void;
};
