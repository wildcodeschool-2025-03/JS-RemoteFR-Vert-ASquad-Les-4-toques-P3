import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Favorite from "../../components/RecipeDetail/Favorite";
import type { recipeType } from "../../lib/definition";
import Rating from "./Rating";

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
    <>
      <h1 className="recipe-title">{recette.name}</h1>
      <section className="recipe-info">
        <img
          className="img-recipe"
          src={`${imgBaseUrl}${recette.picture}`}
          alt={recette.name}
        />
        <div className="recipe-info-details">
          <p>
            Nombre de personnes : <span>{recette.nb_people}</span>
          </p>
          <p>
            Difficulté : <span>{recette.difficulty}</span>
          </p>
          <p>
            Budget : <span>{cost[recette.cost]}</span>
          </p>
          <div>
            Note : <Rating />
          </div>
          <div>
            <Favorite />
          </div>
        </div>
      </section>
    </>
  );
};

export default RecipeInfo;
