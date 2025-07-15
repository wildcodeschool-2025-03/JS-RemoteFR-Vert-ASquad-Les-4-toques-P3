import { useForm } from "react-hook-form";
import './ContactForm.css'; // Assurez-vous que ce fichier CSS est bien lié

type FormType = {
    nom: string;
    prenom: string;
    email: string;
    message: string;
};

export default function ContactForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormType>();

    const onSubmit = (data: FormType) => {
        console.log("Données du formulaire soumises:", data); // Pour le débogage
        alert("Formulaire soumis ! Merci de votre message.");
        reset(); // Réinitialise le formulaire après soumission
    };

    return (
        <div className="contact-form-wrapper"> {/* Renommé le conteneur principal pour plus d'unicité */}
            <h2 className="contact-form-title">Formulaire de contact</h2> {/* Titre du formulaire */}
            <form onSubmit={handleSubmit(onSubmit)} className="contact-main-form" noValidate> {/* Formulaire principal */}
                <div className="form-fields-group"> {/* Groupe des champs, correspond à input-group1 */}
                    <label htmlFor="nom" className="form-label">Nom</label>
                    <input
                        id="nom"
                        className="form-input form-input-nom" // Plus spécifique pour le style
                        placeholder="Entrez votre nom"
                        {...register("nom", {
                            required: "Le nom est obligatoire",
                            minLength: {
                                value: 2,
                                message: "Le nom doit contenir au moins 2 caractères",
                            },
                            maxLength: {
                                value: 45,
                                message: "Le nom doit contenir au maximum 45 caractères",
                            },
                        })}
                    />
                    {errors.nom && <p className="form-error-message">{errors.nom.message}</p>}

                    <label htmlFor="prenom" className="form-label">Prénom</label>
                    <input
                        id="prenom"
                        className="form-input form-input-prenom" // Plus spécifique
                        placeholder="Entrez votre prénom"
                        {...register("prenom", {
                            required: "Le prénom est obligatoire",
                            minLength: {
                                value: 2,
                                message: "Le prénom doit contenir au moins 2 caractères",
                            },
                            maxLength: {
                                value: 45,
                                message: "Le prénom doit contenir au maximum 45 caractères",
                            },
                        })}
                    />
                    {errors.prenom && <p className="form-error-message">{errors.prenom.message}</p>}

                    <label htmlFor="email" className="form-label">Email</label>
                    <div className="form-email-input-container"> {/* Conteneur pour l'icône email */}
                        <input
                            id="email"
                            type="email"
                            className="form-input form-input-email" // Plus spécifique
                            placeholder="Entrez votre email"
                            {...register("email", {
                                required: "L'email est obligatoire",
                                pattern: {
                                    value:
                                        /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i,
                                    message: "Le format d'email est incorrect",
                                },
                            })}
                        />
                        {/* L'icône sera gérée par background-image en CSS pour l'input */}
                    </div>
                    {errors.email && <p className="form-error-message">{errors.email.message}</p>}

                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea
                        id="message"
                        className="form-textarea-message" // Classe unique pour le textarea
                        placeholder="Entrez votre message"
                        rows={5}
                        {...register("message", {
                            required: "Le message est obligatoire",
                            minLength: {
                                value: 10,
                                message: "Le message doit contenir au moins 10 caractères",
                            },
                            maxLength: {
                                value: 500,
                                message: "Le message ne peut pas dépasser 500 caractères",
                            },
                        })}
                    />
                    {errors.message && <p className="form-error-message">{errors.message.message}</p>}

                    <div className="form-button-container"> {/* Conteneur pour le bouton */}
                        <button type="submit" className="form-submit-button"> {/* Bouton de soumission */}
                            Soumettre
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}