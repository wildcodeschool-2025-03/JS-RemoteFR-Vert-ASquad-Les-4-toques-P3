import "./home.css";

import { useAuth } from "../../Auth/authContext.tsx";
import Carousel from "../../components/Carousel/Carousel.tsx";

export default function Home() {
  const { isConnected } = useAuth();
  return (
    <>
      <p className="home_text">
        Eating Nam Nam est un site où chacun peut partager ses recettes et
        explorer celles de la communauté.
        <br />
        <strong>
          Simple, pratique et gourmand Eating Nam Nam, la cuisine partagée à
          portée de clic !
        </strong>
      </p>
      <h2 className="h2Home1">Les recettes fraîchement ajoutées</h2>
      <div className="home_carousel">
        <Carousel last={5} />
      </div>
      <h2 className="h2Home2">Crée ta recette en 3 étapes</h2>
      <div className="steps">
        {isConnected && (
          <div className="step-item">
            <img src="/images/idea.svg" alt="logo ampoule" />
            <p>Une idée de recette ?</p>
          </div>
        )}
        {!isConnected && (
          <div className="step-item">
            <img src="/images/profil.svg" alt="logo profil" />
            <p>Inscris-toi</p>
          </div>
        )}

        <div className="step-item">
          <img src="/images/plus.svg" alt="logo plus" />
          <p>Ajoute ta recette</p>
        </div>
        <div className="step-item">
          <img src="/images/mail.svg" alt="logo mail" />
          <p>Publie-la</p>
        </div>
      </div>
    </>
  );
}
