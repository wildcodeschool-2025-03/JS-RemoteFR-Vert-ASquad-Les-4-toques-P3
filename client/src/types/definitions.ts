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
};

export type ContextType = {
  account: Account | null;
  isConnected: boolean;
  authenticate: () => void;
  logout: () => void;
};
