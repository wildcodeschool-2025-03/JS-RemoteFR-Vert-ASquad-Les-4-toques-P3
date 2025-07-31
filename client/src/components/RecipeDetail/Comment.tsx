import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { CommentType } from "../../lib/definition";

const Comment = () => {
  const { id } = useParams();
  const [comments, setComments] = useState<CommentType[]>([]);

  const stars = (rating: number): string => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/comment/${id}`)
      .then((res) => res.json())
      .then((data) => setComments(data));
  }, [id]);

  return (
    <section className="comment-list">
      <h3>Commentaires : </h3>
      {comments.length === 0 ? (
        <p>Aucun commentaire pour cette recette.</p>
      ) : null}
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.pseudo}</p>
            <p className="stars">{stars(comment.rating)}</p>
            <p>{comment.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Comment;
