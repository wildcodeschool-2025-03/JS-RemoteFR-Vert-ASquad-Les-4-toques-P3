import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { ingredientType } from "../../lib/definition";

const IngredientList = () => {
  const { id } = useParams();
  const [ingredients, setIngredients] = useState<ingredientType[]>([]);
  const getTotalInfo = (key: string) => {
    return ingredients.reduce(
      (accumulator, i) => accumulator + Number(i[key] || 0),
      0,
    );
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/recipes/${id}/ingredients`)
      .then((res) => res.json())
      .then((data) => {
        setIngredients(data);
      });
  }, [id]);

  return (
    <div className="ingredient-list">
      <h3>Ingrédients : </h3>
      <ul className="ingredient-item">
        {ingredients.map((i) => (
          <li key={i.id}>
            {i.quantity} {i.unit} {i.nom}
          </li>
        ))}
      </ul>

      <h3>Valeurs nutritionnelles (pour 100g) : </h3>
      <ul>
        <li>Calories (kcal): {getTotalInfo("calories")}</li>
      </ul>
    </div>
  );
};

export default IngredientList;
