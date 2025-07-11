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
            placeholder="Rechercher une recette, un ingrédient ou label"
          />
          <button className={styles.search_btn} type="button">
            <img
              className={styles.search_icon}
              src="/images/search.svg"
              alt="bouton rechercher"
            />
          </button>
        </div>
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
