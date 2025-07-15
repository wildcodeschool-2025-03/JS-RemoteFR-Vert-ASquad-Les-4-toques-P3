import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Navigate } from "react-router";
import { useAuth } from "../../Auth/authContext";
import "../profil/profil.css";

type FormType = {
  firstname: string;
  lastname: string;
  pseudo: string;
  age: number;
  email: string;
};

export default function ProfilUpdate() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { account } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormType>();

  useEffect(() => {
    if (!account?.id) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/${account.id}`,
          { withCredentials: true },
        );
        reset(res.data);
      } catch (error) {
        console.error("Erreur lors du chargement du profil :", error);
        alert("Erreur lors du chargement du profil.");
      }
    };

    fetchUser();
  }, [account, reset]);

  const onSubmit = async (data: FormType) => {
    if (!account?.id) {
      alert("Utilisateur non identifié.");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/users/${account.id}`,
        data,
        { withCredentials: true },
      );
      alert("Profil mis à jour avec succès !");
      navigate("/profil");
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
      alert("Erreur lors de la mise à jour. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };
  if (!account?.id) {
    alert("Utilisateur non identifié.");
    return <Navigate to="/" replace />;
  }

  return (
    <div className="formulaire_container">
      <h2 className="titre">Mon profil</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="firstname">Prénom</label>
          <input
            {...register("firstname", {
              minLength: { value: 2, message: "Minimum 2 caractères" },
              maxLength: { value: 45, message: "Maximum 45 caractères" },
            })}
            type="text"
            id="firstname"
            autoComplete="given-name"
          />
          {errors.firstname && <p>{errors.firstname.message}</p>}
        </div>

        <div>
          <label htmlFor="lastname">Nom</label>
          <input
            {...register("lastname", {
              minLength: { value: 2, message: "Minimum 2 caractères" },
              maxLength: { value: 45, message: "Maximum 45 caractères" },
            })}
            type="text"
            id="lastname"
            autoComplete="family-name"
          />
          {errors.lastname && <p>{errors.lastname.message}</p>}
        </div>

        <div>
          <label htmlFor="pseudo">Pseudo</label>
          <input
            {...register("pseudo", {
              minLength: { value: 2, message: "Minimum 2 caractères" },
              maxLength: { value: 45, message: "Maximum 45 caractères" },
            })}
            type="text"
            id="pseudo"
          />
          {errors.pseudo && <p>{errors.pseudo.message}</p>}
        </div>

        <div>
          <label htmlFor="age">Âge</label>
          <input
            {...register("age", {
              min: { value: 18, message: "Âge minimum : 18 ans" },
              max: { value: 110, message: "Âge maximum : 110 ans" },
            })}
            type="number"
            id="age"
          />
          {errors.age && <p>{errors.age.message}</p>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            {...register("email", {
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                message: "Format d'email invalide",
              },
            })}
            type="email"
            id="email"
            autoComplete="email"
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>

        <div className="container_btn">
          <button className="btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Mise à jour en cours..." : "Soumettre"}
          </button>
        </div>
      </form>
    </div>
  );
}
