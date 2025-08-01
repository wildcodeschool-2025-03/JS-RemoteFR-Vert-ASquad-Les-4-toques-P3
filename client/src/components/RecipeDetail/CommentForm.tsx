import { useState } from "react";
import { useParams } from "react-router";
import { useAuth } from "../../Auth/authContext";

const CommentForm = ({ onCommentAdded }: { onCommentAdded?: () => void }) => {
  const { id } = useParams();
  const { account } = useAuth();
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const notes = [1, 2, 3, 4, 5];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          user_id: account?.id,
          recipe_id: Number(id),
          text,
          rating,
        }),
      });

      setText("");
      setRating(5);
      if (onCommentAdded) onCommentAdded();
    } catch (err) {
      console.error(err);
    }

    setIsSubmitting(false);
  };

  if (!account?.id) {
    return (
      <p className="message-to-connect">
        Connecte-toi pour laisser un commentaire !
      </p>
    );
  }

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea
        className="form-textarea-message"
        id="comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Laisse ton avis sur la recette"
        required
      />

      <label htmlFor="rating">Note:</label>
      <div className="rating-select">
        <select
          id="rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        >
          {notes.map((note) => (
            <option key={note} value={note}>
              {note} ⭐
            </option>
          ))}
        </select>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Envoi..." : "Envoyer"}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
