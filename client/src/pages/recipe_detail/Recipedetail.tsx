import { useState } from "react";
import Comment from "../../components/RecipeDetail/Comment";
import CommentForm from "../../components/RecipeDetail/CommentForm";
import IngredientList from "../../components/RecipeDetail/IngredientList";
import RecipeInfo from "../../components/RecipeDetail/RecipeInfo";
import StepList from "../../components/RecipeDetail/StepList";
import "./recipedetail.css";

export default function RecetteDetailPage() {
  const [commentKey, setCommentKey] = useState(0);

  const handleCommentAdded = () => {
    setCommentKey((prev) => prev + 1); // Force le remontage du composant comment pour afficher le dernier commentaire
  };

  return (
    <div className="recette-detail">
      <div className="recipe-ing">
        <RecipeInfo />
        <IngredientList />
        <StepList />
        <div className="comment-place">
          <Comment key={commentKey} />
          <CommentForm onCommentAdded={handleCommentAdded} />
        </div>
      </div>
    </div>
  );
}
