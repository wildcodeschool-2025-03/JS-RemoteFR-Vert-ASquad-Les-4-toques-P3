import { useState } from "react";
import Carousel from "../../components/Carousel/Carousel.tsx";
import "./recipes_list.css";

export default function Recipes() {
  const [search, setSearch] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  return (
    <>
      <form className="search_contener">
        <div className="search_bar">
          <input
            className="search_input"
            type="text"
            placeholder="Rechercher une recette, un ingrédient ou label"
            value={search}
            onChange={handleSearch}
          />
          <button className="search_btn" type="button">
            <img
              className="search_icon"
              src="/images/search.svg"
              alt="bouton rechercher"
            />
          </button>
        </div>
      </form>
      <section>
        <h2 className="category">Entrées</h2>
        <div className="carousel">
          <Carousel
            categoryId={1}
            search={search}
            showMainImage={false}
            last={5}
          />
        </div>
      </section>
      <section>
        <h2 className="category">Plats</h2>
        <div className="carousel">
          <Carousel
            categoryId={2}
            search={search}
            showMainImage={false}
            last={5}
          />
        </div>
      </section>
      <section>
        <h2 className="category">Desserts</h2>
        <div className="carousel">
          <Carousel
            categoryId={3}
            search={search}
            showMainImage={false}
            last={5}
          />
        </div>
      </section>
    </>
  );
}
