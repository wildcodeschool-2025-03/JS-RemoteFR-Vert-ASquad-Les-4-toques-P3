import Carousel from "../../components/Carousel/Carousel.tsx";
import styles from "../recipes_list/recipes_list.module.css";

export default function Recipes() {
  return (
    <>
      <form className={styles.search_contener}>
        <div className={styles.search_bar}>
          <input
            className={styles.search_input}
            type="text"
            placeholder="Rechercher une recette"
          />
          <button className={styles.search_btn} type="button">
            <img
              className={styles.search_icon}
              src="/images/search.svg"
              alt="bouton rechercher"
            />
          </button>
        </div>
        <button className={styles.vegan} type="button">
          <img
            className={styles.label_icon}
            src="/images/vegan_circle_green.jpg"
            alt="bouton rechercher"
          />
        </button>
        <button className={styles.gluten_free} type="button">
          <img
            className={styles.label_icon}
            src="/images/gluten free.png"
            alt="bouton rechercher"
          />
        </button>
        <button className={styles.vegetarian} type="button">
          <img
            className={styles.label_icon}
            src="/images/logo veggie.JPG"
            alt="bouton rechercher"
          />
        </button>
      </form>
      <section>
        <h2 className={styles.category}>Entrées</h2>
        <div className="carousel">
          <Carousel categoryId={1} showMainImage={false} />
        </div>
      </section>
      <section>
        <h2 className={styles.category}>Plats</h2>
        <div className="carousel">
          <Carousel categoryId={2} showMainImage={false} />
        </div>
      </section>
      <section>
        <h2 className={styles.category}>Desserts</h2>
        <div className="carousel">
          <Carousel categoryId={3} showMainImage={false} />
        </div>
      </section>
    </>
  );
}
