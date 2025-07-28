import "./aboutPage.css";

function AboutPage() {
  return (
    <main className="aboutpage">
      <h1 className="about-title">Description du site</h1>
      <div className="about-texte">
        <p>
          Eating Nam Nam est un site web collaboratif dédié aux passionnés de
          cuisine. Il permet de partager facilement des recettes, de découvrir
          des plats savoureux, et de gérer les ingrédients nécessaires pour les
          préparer chez soi. Sur Eating Nam Nam, chaque utilisateur peut : Créer
          et publier ses propres recettes avec photos, étapes, temps de cuisson,
          niveau de difficulté, etc. Ajouter les produits et ingrédients qui
          composent chaque recette Voir les valeurs nutritionnelles des recettes
          Rechercher des plats selon les ingrédients disponibles, le type de
          repas Générer une liste de courses automatique à partir d’un planning
          de la semaine avec des recettes sélectionnées Sauvegarder ses recettes
          préférées dans un espace personnel Eating Nam Nam, c’est plus qu’un
          site de recettes : c’est un lieu d’échange, d’inspiration et de
          plaisir culinaire. Que tu sois débutant ou chef en herbe, rejoins une
          communauté gourmande qui partage la même envie : bien manger et se
          régaler au quotidien !
        </p>
      </div>
      <h2 className="about-subtitle">L'équipe</h2>
      <div className="about-image">
        <img src="../images/gary-avatar.png" alt="Gary Avatar" />
        <img src="../images/nabil-avatar.png" alt="Nabil Avatar" />
        <img src="../images/anais-avatar.png" alt="Anaïs Avatar" />
        <img src="../images/nicolas-avatar.png" alt="Nicolas Avatar" />
      </div>
      <div className="about-team">
        <p>
          4 développeurs passionnés de cuisine et de bonne bouffe ont mis leurs
          talents en commun pour vous concocter le meilleur site culinaire du
          web !
        </p>
      </div>
    </main>
  );
}

export default AboutPage;
