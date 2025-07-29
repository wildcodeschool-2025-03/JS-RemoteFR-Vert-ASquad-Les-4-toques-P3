import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { recipeType } from "../../lib/definition";
import Favorite from "../../components/RecipeDetail/Favorite";

type transitionType = {
  [key: number]: string;
  1: string;
  2: string;
  3: string;
};

const cost: transitionType = {
  1: "€",
  2: "€€",
  3: "€€€",
};

const RecipeInfo = () => {
  const { id } = useParams();
  const [recette, setRecette] = useState<recipeType | null>(null);
  const imgBaseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRecette(data);
      });
  }, [id]);

  if (!recette) return <p>Aucune recette...</p>;

  return (
    <section className="recipe-info">
      <h1>{recette.name}</h1>
      <img
        className="img-recipe"
        src={`${imgBaseUrl}${recette.picture}`}
        alt={recette.name}
      />
      <p>Nombre de personnes : {recette.nb_people}</p>
      <p>Difficulté : {recette.difficulty}</p>
      <p>Budget : {cost[recette.cost]}</p>
      <p>
        Favori : <Favorite />
      </p>
    </section>
  );
};

export default RecipeInfo;
