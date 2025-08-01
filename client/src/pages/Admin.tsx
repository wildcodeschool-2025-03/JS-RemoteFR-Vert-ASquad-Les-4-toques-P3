import { useState } from "react";
import "../style/admin.css";
import IngredientAdmin from "../components/DashboardAdmin/IngredientAdmin";
import RecipeAdmin from "../components/DashboardAdmin/RecipeAdmin";
import UserAdmin from "../components/DashboardAdmin/UserAdmin";

export default function Admin() {
  const [section, setSection] = useState("recettes");

  return (
    <div>
      <h1 className="admin-title">Interface Administrateur</h1>

      <div className="admin-tabs">
        <button type="button" onClick={() => setSection("recettes")}>
          Recettes
        </button>
        <button type="button" onClick={() => setSection("ingredients")}>
          Ingrédients
        </button>
        <button type="button" onClick={() => setSection("utilisateurs")}>
          Utilisateurs
        </button>
      </div>

      {section === "recettes" && <RecipeAdmin />}
      {section === "ingredients" && <IngredientAdmin />}
      {section === "utilisateurs" && <UserAdmin />}
    </div>
  );
}
