import "../login/login.css";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../../Auth/authContext";
import { showToast } from "../../components/Toast/Toast";

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
        .then((res) => {
          showToast("Connexion réussie !", { type: "success" });
          authenticate();
          const user = res.data.user;
          if (user && user.role_id === 1) {
            setTimeout(() => navigate("/admin"), 2000);
          } else {
            setTimeout(() => navigate("/"), 2000);
          }
        });
    } catch (err) {
      showToast("Erreur de la connexion. Veuillez réessayer.", {
        type: "error",
      });
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Connexion</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form" noValidate>
        <div className="login-form-group">
          <label htmlFor="email" className="login-label">
            Email
          </label>
          <div className="login-input-wrapper">
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
              className="login-input"
              autoComplete="username"
              placeholder="Entrez votre email"
            />
            <img
              src="/images/mail.svg"
              alt="icone mail"
              className="login-input-icon"
            />
          </div>
          {errors.email && <p className="error-msg">{errors.email.message}</p>}
        </div>

        <div className="login-form-group">
          <label htmlFor="password" className="login-label">
            Mot de passe
          </label>
          <div className="login-input-wrapper">
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
              className="login-input"
              autoComplete="current-password"
              placeholder="Entrez votre mot de passe"
            />
            <img
              src="/images/padlock.svg"
              alt="icone mot de passe"
              className="login-input-icon"
            />
          </div>
          {errors.password && (
            <p className="error-msg">{errors.password.message}</p>
          )}
        </div>

        <div className="login-btn-container">
          <motion.button
            type="submit"
            className="login-btn"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? "Connexion en cours..." : "Se connecter"}
          </motion.button>
        </div>
        <ToastContainer />
      </form>

      {errorMsg && <p className="login-error-msg">{errorMsg}</p>}

      <p className="login-para">
        Pas encore de compte ? <Link to="/inscription">S'inscrire</Link>
      </p>
    </div>
  );
}
