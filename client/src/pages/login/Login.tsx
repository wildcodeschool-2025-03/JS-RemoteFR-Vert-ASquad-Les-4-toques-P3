import "../login/login.css";
import axios from "axios";
import { motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../Auth/authContext";

type FormType = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { authenticate } = useAuth();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormType>();

  const onSubmit = async (data: FormType) => {
    setLoading(true);
    setErrorMsg(null);

    try {
      await axios
        .post(`${import.meta.env.VITE_API_URL}/api/login`, data, {
          withCredentials: true,
        })
        .then(() => {
          authenticate();
          navigate("/");
        });
    } catch (err) {
      setErrorMsg("Erreur de la connexion. Veuillez réessayer.");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container">
        <h2 className="titre">Connexion</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="formulaire"
          noValidate
        >
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <input
                {...register("email", {
                  required: "Merci de compléter ce champ",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Le format d'email est incorrect",
                  },
                })}
                type="email"
                id="email"
                className="input-email"
                autoComplete="username"
                placeholder="Entrez votre email"
              />
              <img
                src="/images/mail.svg"
                alt="icone mail"
                className="input-icon"
              />
            </div>
            {errors.email && (
              <p className="error-msg">{errors.email.message}</p>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="password">Mot de passe</label>
            <div className="input-wrapper">
              <input
                {...register("password", {
                  required: "Merci de compléter ce champ",
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
                    message:
                      "Le mot de passe doit contenir 8-16 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial",
                  },
                })}
                type="password"
                id="password"
                className="input-password"
                autoComplete="current-password"
                placeholder="Entrez votre mot de passe"
              />
              <img
                src="/images/padlock.svg"
                alt="icone mot de passe"
                className="input-icon"
              />
            </div>
            {errors.password && (
              <p className="error-msg">{errors.password.message}</p>
            )}
          </div>

          <div className="container_btn">
            <motion.button
              type="submit"
              className="sign-btn"
              disabled={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? "Connexion en cours..." : "Se connecter"}
            </motion.button>
          </div>
        </form>

        {errorMsg && <p className="error-msg">{errorMsg}</p>}

        <p className="para">
          Pas encore de compte? <Link to="/inscription">S'inscrire</Link>
        </p>
      </div>
    </>
  );
}
