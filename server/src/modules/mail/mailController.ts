import type { RequestHandler } from "express";

export const sendContactEmails: RequestHandler = async (req, res) => {
  const { firstname, lastname, email, message } = req.body;

  if (!firstname || !lastname || !email || !message) {
    res.status(400).json({ error: "Champs requis manquants" });
    return;
  }

  if (!process.env.BREVO_API_KEY) {
    res.status(500).json({ error: "Configuration serveur manquante" });
    return;
  }

  try {
    const emailData = {
      sender: {
        name: "Les 4 Toques",
        email: process.env.ADMIN_EMAIL || "namnameating@gmail.com",
      },
      to: [
        {
          email: process.env.ADMIN_EMAIL || "namnameating@gmail.com",
          name: "Administrateur Les 4 Toques",
        },
      ],
      replyTo: {
        email: email,
        name: `${firstname} ${lastname}`,
      },
      subject: `Nouveau message via le formulaire de contact - ${firstname} ${lastname}`,
      htmlContent: `
        <html>
          <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; padding: 24px;">
            <h2 style="color: #2c3e50;">Nouveau message via le formulaire de contact</h2>

            <p>Vous avez reçu un message de la part d’un utilisateur du site <strong>Eating nam nam</strong>.</p>

            <div style="background-color: #ffffff; padding: 20px; border: 1px solid #ddd; border-radius: 6px; margin: 20px 0;">
              <p><strong>Nom :</strong> ${lastname}</p>
              <p><strong>Prénom :</strong> ${firstname}</p>
              <p><strong>Adresse e-mail :</strong> <a href="mailto:${email}" style="color: #2980b9;">${email}</a></p>
            </div>

            <div style="background-color: #ffffff; padding: 20px; border-left: 4px solid #2980b9; border-radius: 4px;">
              <p style="margin-bottom: 10px;"><strong>Message :</strong></p>
              <p style="white-space: pre-line;">${message.replace(/\n/g, "<br>")}</p>
            </div>

            <p style="margin-top: 30px;">Veuillez répondre directement à cette adresse si vous souhaitez prendre contact avec le client.</p>

            <p style="color: #888; font-size: 0.9em; margin-top: 40px;">— Notification automatique générée par le site "Eating Nam Nam"</p>
          </body>
        </html>
      `,
    };

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY || "",
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      res.status(500).json({ error: "Erreur lors de l'envoi" });
      return;
    }

    res.status(200).json({
      message:
        "Votre message a bien été envoyé ! Nous vous recontacterons bientôt.",
    });
  } catch (error) {
    res.status(500).json({
      error: "Erreur lors de l'envoi. Veuillez réessayer.",
    });
  }
};
