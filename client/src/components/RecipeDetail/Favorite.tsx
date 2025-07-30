import { useState } from "react";
import { useParams } from "react-router";
import { useAuth } from "../../Auth/authContext";

const Favorite = () => {
  const { id } = useParams();
  const { account } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isNotFavorite, setIsNotFavorite] = useState(false);

  const addFavorite = async () => {
    if (!account?.id) return;
    setIsNotFavorite(true);

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/favorite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ recipe_id: Number(id) }),
      });

      setIsFavorite(true);
    } catch (err) {
      console.error(err);
    }

    setIsNotFavorite(false);
  };

  const removeFavorite = async () => {
    if (!account?.id) return;
    setIsNotFavorite(true);

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/favorite/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      setIsFavorite(false);
    } catch (err) {
      console.error(err);
    }

    setIsNotFavorite(false);
  };

  if (!account?.id) {
    return (
      <p className="message-to-connect">
        Connecte-toi pour ajouter cette recette en favori !
      </p>
    );
  }

  return (
    <div className="favorite-actions">
      {!isFavorite ? (
        <button type="button" onClick={addFavorite} disabled={isNotFavorite}>
          {isNotFavorite ? "" : "🤍"}
        </button>
      ) : (
        <button type="button" onClick={removeFavorite} disabled={isNotFavorite}>
          {isNotFavorite ? "" : "❤️"}
        </button>
      )}
    </div>
  );
};

export default Favorite;
