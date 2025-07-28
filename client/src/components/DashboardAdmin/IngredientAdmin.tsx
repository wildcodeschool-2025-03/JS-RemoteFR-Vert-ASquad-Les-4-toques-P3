import { useCallback, useEffect, useState } from "react";
import type { AdminIngredientsType } from "../../lib/definition";

export default function IngredientAdmin() {
  const [ingredients, setIngredients] = useState<AdminIngredientsType[]>([]);
  const [caloriesValues, setCaloriesValues] = useState<Record<number, string>>(
    {},
  );

  const fetchIngredients = useCallback(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/admin`)
      .then((res) => res.json())
      .then((data) => setIngredients(data.dashboardIngredients))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);

  const handleClick = (ing: AdminIngredientsType) => {
    const calories = caloriesValues[ing.id];
    try {
      if (calories) {
        fetch(
          `${import.meta.env.VITE_API_URL}/api/admin/ingredients/${ing.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nom: ing.nom,
              calories: calories,
              is_validated: ing.is_validated,
            }),
          },
        ).then((response) => {
          if (response.ok) {
            fetchIngredients();
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="admin-table">
      <ul className="table-header">
        <li>Id</li>
        <li>Ingredient</li>
        <li>Calories</li>
        <li>Statut</li>
        <li>Actions</li>
      </ul>
      {ingredients.map((ing) => (
        <ul className="table-header-data" key={ing.id}>
          <li>{ing.id}</li>
          <li>{ing.nom}</li>
          <li>
            {ing.calories !== null ? (
              ing.calories
            ) : (
              <div className="calories-placeholder">
                <input
                  className="calories-input"
                  type="number"
                  placeholder=" calories"
                  onChange={(e) =>
                    setCaloriesValues({
                      ...caloriesValues,
                      [ing.id]: e.target.value,
                    })
                  }
                />
                <button
                  type="button"
                  className="button-admin"
                  onClick={() => handleClick(ing)}
                >
                  Valider
                </button>
              </div>
            )}
          </li>
          <li>{ing.is_validated ? "Validé" : "En attente"}</li>
          <li>
            <button
              type="button"
              className="button-admin"
              onClick={() => {
                fetch(
                  `${import.meta.env.VITE_API_URL}/api/admin/ingredients/${ing.id}`,
                  {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      nom: ing.nom,
                      calories: ing.calories,
                      is_validated: true,
                    }),
                  },
                ).then(() => {
                  fetchIngredients();
                });
              }}
            >
              Valider
            </button>

            <button
              type="button"
              className="button-admin"
              onClick={() => {
                fetch(
                  `${import.meta.env.VITE_API_URL}/api/ingredients/${ing.id}`,
                  {
                    method: "DELETE",
                  },
                ).then((res) => {
                  if (res.status === 204) {
                    fetchIngredients();
                  }
                });
              }}
            >
              Supprimer
            </button>
          </li>
        </ul>
      ))}
    </div>
  );
}
