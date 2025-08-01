import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import { showToast } from "../../components/Toast/Toast";
import "../contactForm/contactForm.css";

type FormType = {
  firstname: string;
  lastname: string;
  email: string;
  message: string;
};

const ContactForm: React.FC = () => {
  const navigate = useNavigate();
  const [status, setStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({ mode: "onSubmit" });

  const onSubmit = async (data: FormType) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );

      if (response.ok) {
        showToast(
          "Votre message a bien été envoyé ! Nous revenons vers vous au plus vite.",
          { type: "success" },
        );
        setTimeout(() => navigate("/"), 3500);
      } else {
        const result = await response.json();
        setStatus(`Erreur : ${result?.error || "Erreur serveur"}`);
        setIsSubmitting(false);
      }
    } catch (error) {
      setStatus("Erreur serveur");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-wrapper">
      <h2 className="contact-form-title">Formulaire de contact</h2>
      <form
        className="contact-main-form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="form-fields-group">
          <label htmlFor="firstname" className="form-label">
            Prénom
          </label>
          <input
            id="firstname"
            placeholder="Entrez votre prénom"
            className="form-input"
            {...register("firstname", {
              required: "merci de completer ce champ",
              minLength: {
                value: 2,
                message: "le champ doit contenir au minimum 2 caractères",
              },
              maxLength: {
                value: 45,
                message: "le champ doit contenir au maximum 45 caractères",
              },
            })}
          />
          {errors.firstname && (
            <p className="contact-error-msg">{errors.firstname.message}</p>
          )}
        </div>

        <div className="form-fields-group">
          <label htmlFor="lastname" className="form-label">
            Nom
          </label>
          <input
            id="lastname"
            placeholder="Entrez votre nom"
            className="form-input"
            {...register("lastname", {
              required: "merci de completer ce champ",
              minLength: {
                value: 2,
                message: "le champ doit contenir au minimum 2 caractères",
              },
              maxLength: {
                value: 45,
                message: "le champ doit contenir au maximum 45 caractères",
              },
            })}
          />
          {errors.lastname && (
            <p className="contact-error-msg">{errors.lastname.message}</p>
          )}
        </div>

        <div className="form-fields-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <div className="form-input-email-container">
            <img
              src="/images/mail.svg"
              alt="email icon"
              className="form-input-email-icon"
            />
            <input
              id="email"
              type="email"
              placeholder="Entrez votre email"
              className="form-input form-input-email"
              {...register("email", {
                required: "merci de completer ce champ",
                pattern: {
                  value:
                    /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i,
                  message: "le format d'email est incorrect",
                },
              })}
            />
          </div>
          {errors.email && (
            <p className="contact-error-msg">{errors.email.message}</p>
          )}
        </div>

        <div className="form-fields-group">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea
            id="message"
            placeholder="Entrez votre message"
            className="form-textarea-message"
            {...register("message", {
              required: "merci de completer ce champ",
              minLength: {
                value: 10,
                message: "le message doit contenir au minimum 10 caractères",
              },
              maxLength: {
                value: 1000,
                message: "le message doit contenir au maximum 1000 caractères",
              },
            })}
          />
          {errors.message && (
            <p className="contact-error-msg">{errors.message.message}</p>
          )}
        </div>

        <div className="form-button-container">
          <button
            type="submit"
            className="form-submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Envoi en cours..." : "Envoyer"}
          </button>
        </div>

        {status && <p className="form-status-message">{status}</p>}
        <ToastContainer />
      </form>
    </div>
  );
};

export default ContactForm;
