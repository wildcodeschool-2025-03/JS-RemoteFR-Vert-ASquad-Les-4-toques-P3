import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { CommentType } from "../../lib/definition";

const Rating = () => {
  const { id } = useParams();
  const [ratings, setRatings] = useState<CommentType[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/comment/${id}`)
      .then((res) => res.json())
      .then((data) => setRatings(data));
  }, [id]);

  const averageRating = () => {
    if (ratings.length === 0) return 0;
    const total = ratings.reduce((acc, note) => acc + note.rating, 0);
    return total / ratings.length;
  };

  const stars = (rating: number) => {
    const moyenne = Math.round(rating);
    return "★".repeat(moyenne) + "☆".repeat(5 - moyenne);
  };

  const average = averageRating();

  return (
    <section className="rating-list">
      <p className="stars">{stars(average)}</p>
    </section>
  );
};

export default Rating;
