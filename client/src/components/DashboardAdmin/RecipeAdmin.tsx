import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";
import type { AdminRecipeType } from "../../lib/definition";
export default function RecipeAdmin() {
  const [recettes, setRecettes] = useState<AdminRecipeType[]>([]);

  const fetchRecipe = useCallback(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/admin`)
      .then((res) => res.json())
      .then((data) => setRecettes(data.dashboardRecettes))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetchRecipe();
  }, [fetchRecipe]);

  return (
    <div className="admin-table">
      <ul className="table-header">
        <li>Id</li>
        <li>Utilisateur</li>
        <li>Recette</li>
        <li>Statut</li>
        <li>Actions</li>
      </ul>
      {recettes.map((r) => (
        <ul className="table-header-data" key={r.id}>
          <li>{r.id}</li>
          <li>{r.user_id}</li>
          <li>
            <Link
              to={`/recettes/${r.id}`}
              style={{
                color: "black",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              {r.name}
            </Link>
          </li>
          <li>{r.is_validated ? "Validé" : "En attente"}</li>
          <li>
            <button
              type="button"
              className="button-admin button-validate"
              onClick={() => {
                fetch(
                  `${import.meta.env.VITE_API_URL}/api/admin/recipes/${r.id}`,
                  {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      name: r.name,
                      is_validated: true,
                    }),
                  },
                ).then(() => {
                  fetchRecipe();
                });
              }}
            >
              <span className="button-label-desktop">Valider</span>
              <span className="button-label-mobile" aria-label="Valider">
                <img
                  src="/images/encoche.png"
                  alt="Valider"
                  style={{
                    width: "3em",
                    height: "3em",
                    verticalAlign: "middle",
                  }}
                />
              </span>
            </button>
            <button
              type="button"
              className="button-admin button-delete"
              onClick={() => {
                fetch(`${import.meta.env.VITE_API_URL}/api/recipes/${r.id}`, {
                  method: "DELETE",
                }).then((res) => {
                  if (res.status === 204) {
                    fetchRecipe();
                  }
                });
              }}
            >
              <span className="button-label-desktop">Supprimer</span>
              <span className="button-label-mobile" aria-label="Supprimer">
                ❌
              </span>
            </button>
          </li>
        </ul>
      ))}
    </div>
  );
}
