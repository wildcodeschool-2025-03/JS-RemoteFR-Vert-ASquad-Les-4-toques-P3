import IngredientList from "../../components/RecipeDetail/IngredientList";
import RecipeInfo from "../../components/RecipeDetail/RecipeInfo";
import StepList from "../../components/RecipeDetail/StepList";
import Comment from "../../components/RecipeDetail/Comment";
import CommentForm from "../../components/RecipeDetail/CommentForm";
import "./recipedetail.css";

const RecetteDetailPage = () => (
  <div className="recette-detail">
    <div className="recipe-ing">
      <RecipeInfo />
      <IngredientList />
      <StepList />
      <div className="comment-place">
        <Comment />
        <CommentForm />
      </div>
    </div>
  </div>
);

export default RecetteDetailPage;
