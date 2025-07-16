import IngredientList from "../../components/RecipeDetail/IngredientList";
import RecipeInfo from "../../components/RecipeDetail/RecipeInfo";
import StepList from "../../components/RecipeDetail/StepList";
import "./recipedetail.css";

const RecetteDetailPage = () => (
  <div className="recette-detail">
    <div className="recipe-ing">
      <RecipeInfo />
      <IngredientList />
      <StepList />
    </div>
  </div>
);

export default RecetteDetailPage;
