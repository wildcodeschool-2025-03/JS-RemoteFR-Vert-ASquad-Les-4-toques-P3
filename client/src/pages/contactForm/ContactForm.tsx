import { useState } from 'react';
import './ContactForm.css';

function ContactForm() {
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        message: '',
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Données du formulaire soumises :', formData);
        alert('Formulaire soumis ! Regardez la console pour les données.');
        setFormData({
            nom: '',
            prenom: '',
            email: '',
            message: '',
        });
    };

    return (
        <div className="contact-form-container">
            <h2 className="form-title">Formulaire de contact</h2>
            <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                    <label htmlFor="nom">Nom</label>
                    <input
                        type="text"
                        id="nom"
                        name="nom"
                        value={formData.nom}
                        onChange={handleChange}
                        required
                        className="nom-input"
                        placeholder='Entrez votre nom'
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="prenom">Prénom</label>
                    <input
                        type="text"
                        id="prenom"
                        name="prenom"
                        value={formData.prenom}
                        onChange={handleChange}
                        required
                        className="prenom-input"
                        placeholder='Entrez votre prénom'
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <div className="email-input-wrapper">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="email-input"
                            placeholder='Entrez votre email'
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        required
                        className="message-input"
                        placeholder='Entrez votre message'
                    />
                </div>

                <div className="container_btn">
                    <button type="submit" className="submit-button">
                        Soumettre
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ContactForm;
