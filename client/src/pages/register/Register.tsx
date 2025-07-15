import "../register/register.css";
import axios from "axios";
import { motion } from "motion/react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

type FormType = {
  firstname: string;
  lastname: string;
  pseudo: string;
  age: number;
  email: string;
  password: string;
  confirm_password?: string;
};

export default function Register() {
  const navigate = useNavigate();

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<FormType>();

  const onSubmit = async (data: FormType) => {
    try {
      await axios
        .post(`${import.meta.env.VITE_API_URL}/api/register`, data)
        .then(() => {
          navigate("/connexion");
        });
    } catch (err) {
      err;
    }
  };

  return (
    <>
      <h2 className="titre">Création de compte</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="formulaire">
        <div className="input-group">
          <label htmlFor="firstname">Prénom</label>
          <input
            className="firstname-input"
            {...register("firstname", {
              required: {
                value: true,
                message: "merci de completer ce champ",
              },
              minLength: {
                value: 2,
                message: "le champ doit contenir au minimum 2 caractères",
              },
              maxLength: {
                value: 45,
                message: "le champ doit contenir au maximum 45 caractères",
              },
            })}
            type="text"
            name="firstname"
            placeholder="Entrez votre prénom"
          />
          {errors?.firstname && (
            <p className="error-msg">{errors.firstname.message}</p>
          )}
        </div>
        <div className="input-group">
          <label htmlFor="lastname">Nom</label>
          <input
            className="lastname-input"
            {...register("lastname", {
              required: {
                value: true,
                message: "merci de completer ce champ",
              },
              minLength: {
                value: 2,
                message: "le champ doit contenir au minimum 2 caractères",
              },
              maxLength: {
                value: 45,
                message: "le champ doit contenir au maximum 45 caractères",
              },
            })}
            type="text"
            name="lastname"
            placeholder="Entrez votre nom"
          />
          {errors?.lastname && (
            <p className="error-msg">{errors.lastname.message}</p>
          )}
        </div>
        <div className="input-group">
          <label htmlFor="pseudo">Pseudo</label>
          <input
            className="pseudo-input"
            {...register("pseudo", {
              required: {
                value: true,
                message: "merci de completer ce champ",
              },
              minLength: {
                value: 2,
                message: "le champ doit contenir au minimum 2 caractères",
              },
              maxLength: {
                value: 45,
                message: "le champ doit contenir au maximum 45 caractères",
              },
            })}
            type="text"
            name="pseudo"
            placeholder="Entrez votre pseudo"
          />
          {errors?.pseudo && (
            <p className="error-msg">{errors.pseudo.message}</p>
          )}
        </div>
        <div className="input-group">
          <label htmlFor="age">Age</label>
          <input
            className="age-input"
            {...register("age", {
              required: {
                value: true,
                message: "merci de completer ce champ",
              },
              min: {
                value: 18,
                message: "l'age minimum requis est de 18 ans",
              },
              max: {
                value: 110,
                message: "l'age maximum accepté est de 110 ans",
              },
              valueAsNumber: true,
            })}
            type="number"
            name="age"
            placeholder="Entrez votre age"
          />
          {errors?.age && <p className="error-msg">{errors.age.message}</p>}
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            className="email-input"
            {...register("email", {
              required: {
                value: true,
                message: "merci de completer ce champ",
              },
              pattern: {
                value:
                  /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i,
                message: "le format d'email est incorrect",
              },
            })}
            type="text"
            name="email"
            placeholder="Entrez votre email"
          />
          {errors?.email && <p className="error-msg">{errors.email.message}</p>}
        </div>
        <div className="input-group1">
          <label htmlFor="password">Mot de passe</label>
          <input
            className="password-input"
            {...register("password", {
              required: {
                value: true,
                message: "merci de completer ce champ",
              },
              pattern: {
                value:
                  /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm,
                message:
                  "Le mot de passe doit contenir entre 8 et 16 caractères, incluant une majuscule, une minuscule, un chiffre et un caractère spécial",
              },
            })}
            type="password"
            name="password"
            placeholder="Entrez votre mot de passe"
          />
          {errors?.password && (
            <p className="error-msg">{errors.password.message}</p>
          )}
        </div>
        <div className="input-group2">
          <label htmlFor="confirm_password">Confirmation du mot de passe</label>
          <input
            className="password-input"
            {...register("confirm_password", {
              required: {
                value: true,
                message: "merci de completer ce champ",
              },
              validate: (value) => {
                if (value !== watch("password")) {
                  return "les mots de passe ne sont pas identiques";
                }
              },
            })}
            type="password"
            name="confirm_password"
            placeholder="Confirmez votre mot de passe"
          />
          {errors?.confirm_password && (
            <p className="error-msg">{errors.confirm_password.message}</p>
          )}
        </div>
        <div className="container_btn">
          <motion.button
            type="submit"
            className="btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            S'inscrire
          </motion.button>
        </div>
      </form>
      <p className="para">
        Déjà un compte?
        <Link to="/connexion">Se connecter</Link>
      </p>
    </>
  );
}
