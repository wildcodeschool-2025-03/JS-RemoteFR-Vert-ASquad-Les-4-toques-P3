import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";

import ImgUpload from "../../components/ImgUpload/ImgUpload";

import "./recipeCreation.css";

type RecipeForm = {
  title: string;
  persons: string;
  image: File[];
  categorie: string;
  labels: string[];
  difficulty: string;
  cost: string;
  ingredients: {
    name: string;
    quantity: number;
    unit: string;
  }[];
  steps: {
    description: string;
  }[];
};

type Labeltype = {
  id: number;
  label: string;
  image: string;
};

type Categorytype = {
  id: number;
  name: string;
};

const DIFFICULTY = [
  { id: 1, dif: "Débutant" },
  { id: 2, dif: "Intermédiaire" },
  { id: 3, dif: "Chef" },
];
const COST = [
  { id: 1, cost: 1, value: "€" },
  { id: 2, cost: 2, value: "€ €" },
  { id: 3, cost: 3, value: "€ € €" },
];

const UNITOPTIONS = [
  { id: 1, unit: "unité" },
  { id: 2, unit: "mg" },
  { id: 3, unit: "g" },
  { id: 4, unit: "kg" },
  { id: 5, unit: "ml" },
  { id: 6, unit: "cl" },
  { id: 7, unit: "l" },
];

export default function recipeCreation() {
  const [label, setLabel] = useState<Labeltype[]>([]);
  const [category, setCategory] = useState<Categorytype[]>([]);

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<RecipeForm & { image: File[] }>({
    defaultValues: {
      ingredients: [{ name: "", unit: "unité" }],
      steps: [{ description: "" }],
      image: [],
    },
  });

  useEffect(() => {
    fetchData("label", setLabel);
    fetchData("category", setCategory);
  }, []);

  const fetchData = async (route: string, set: (data: []) => void) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/${route}`,
        {
          withCredentials: true,
        },
      );
      set(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit: SubmitHandler<RecipeForm> = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("persons", data.persons);
    formData.append("category", data.categorie);
    formData.append("difficulty", data.difficulty);
    formData.append("cost", data.cost);
    formData.append("labels", JSON.stringify(data.labels));
    formData.append("ingredients", JSON.stringify(data.ingredients));
    formData.append("steps", JSON.stringify(data.steps));
    formData.append("image", data.image[0]);

    try {
      axios
        .post(`${import.meta.env.VITE_API_URL}/api/recipe`, formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Recipe created successfully:", response.data);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const {
    fields: ingredientsFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  const {
    fields: stepsFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({
    control,
    name: "steps",
  });

  useEffect(() => {
    register("image", { required: "Veuillez ajouter une image" });
  }, [register]);

  return (
    <>
      <h1>Créez votre recette</h1>
      <form className="recipe-form" onSubmit={handleSubmit(onSubmit)}>
        <section className="first-block">
          <div className="drop-zone">
            <ImgUpload onFilesChange={(files) => setValue("image", files)} />
          </div>
          <div className="recipe-nameAndPersons">
            <article>
              <label htmlFor="title">Nom de la recette:</label>
              <input
                {...register("title", {
                  required: {
                    value: true,
                    message: "merci de completer ce champ",
                  },
                  minLength: {
                    value: 2,
                    message: "le champ doit contenir au minimum 2 caractères",
                  },
                  maxLength: {
                    value: 20,
                    message: "le champ doit contenir au maximum 45 caractères",
                  },
                })}
                name="title"
              />
              {errors?.title && <span>{errors.title.message}</span>}
            </article>
            <article className="persons-nbr">
              <label htmlFor="persons">Nombre de personnes:</label>
              <input
                {...register("persons", {
                  required: {
                    value: true,
                    message: "merci de completer ce champ",
                  },
                })}
                type="number"
                name="persons"
              />
              {errors?.persons && <span>{errors.persons.message}</span>}
            </article>
          </div>
        </section>
        <section className="second-block">
          <article className="label_article">
            <h4>Label</h4>
            <div className="selection">
              {label.map((l) => (
                <div key={l.id}>
                  <input
                    type="checkbox"
                    id={`label-${l.id}`}
                    {...register("labels")}
                    value={l.label}
                    className="checkbox-hidden"
                  />
                  <label className="selectLabel" htmlFor={`label-${l.id}`}>
                    {l.label}
                  </label>
                </div>
              ))}
            </div>
            {errors?.labels && <span>{errors.labels.message}</span>}
          </article>
          <article className="category_article">
            <h4>Catégorie</h4>
            <div className="selection">
              {category.map((c) => (
                <div key={c.id}>
                  <input
                    type="radio"
                    id={`cat-${c.id}`}
                    {...register("categorie", {
                      required: {
                        value: true,
                        message: "merci de completer ce champ",
                      },
                    })}
                    value={c.name}
                    className="radio-hidden"
                  />
                  <label className="selectLabel" htmlFor={`cat-${c.id}`}>
                    {c.name}
                  </label>
                </div>
              ))}
            </div>
            {errors?.categorie && <span>{errors.categorie.message}</span>}
          </article>

          <article className="difficulty_article">
            <h4>Difficulté</h4>
            <div className="selection">
              {DIFFICULTY.map((d) => (
                <div key={d.id}>
                  <input
                    type="radio"
                    id={`dif-${d.id}`}
                    {...register("difficulty", {
                      required: {
                        value: true,
                        message: "merci de completer ce champ",
                      },
                    })}
                    value={d.dif}
                    className="radio-hidden"
                  />
                  <label className="selectLabel" htmlFor={`dif-${d.id}`}>
                    {d.dif}
                  </label>
                </div>
              ))}
            </div>
            {errors?.difficulty && <span>{errors.difficulty.message}</span>}
          </article>
          <article className="cost_article">
            <h4>Coût</h4>
            <div className="selection">
              {COST.map((p) => (
                <div key={p.id}>
                  <input
                    type="radio"
                    id={`cost-${p.id}`}
                    {...register("cost", {
                      required: {
                        value: true,
                        message: "merci de completer ce champ",
                      },
                    })}
                    value={p.cost}
                    className="radio-hidden"
                  />
                  <label className="selectLabel" htmlFor={`cost-${p.id}`}>
                    {p.value}
                  </label>
                </div>
              ))}
            </div>
            {errors?.cost && <span>{errors.cost.message}</span>}
          </article>
        </section>
        <section className="third-block">
          <article>
            <h4>Ingrédients</h4>
            {ingredientsFields.map((field, index) => {
              return (
                <div key={field.id}>
                  <div className={"ingredients"} key={field.id}>
                    <div className="ing-name">
                      <input
                        placeholder="nom"
                        {...register(`ingredients.${index}.name` as const, {
                          required: {
                            value: true,
                            message: "merci de completer ce champ",
                          },
                        })}
                        className={
                          errors?.ingredients?.[index]?.name ? "error" : ""
                        }
                      />
                    </div>
                    <div className="ing-quantity">
                      <input
                        placeholder="quantité"
                        type="number"
                        {...register(`ingredients.${index}.quantity` as const, {
                          valueAsNumber: true,
                          required: {
                            value: true,
                            message: "merci de completer ce champ",
                          },
                        })}
                        className={
                          errors?.ingredients?.[index]?.quantity ? "error" : ""
                        }
                      />
                    </div>
                    <div className="ing-unit">
                      <select
                        {...register(`ingredients.${index}.unit` as const, {
                          required: {
                            value: true,
                            message: "merci de completer ce champ",
                          },
                        })}
                        className={
                          errors?.ingredients?.[index]?.unit ? "error" : ""
                        }
                      >
                        {UNITOPTIONS.map((u) => (
                          <option key={u.id}>{u.unit}</option>
                        ))}
                      </select>
                    </div>

                    <motion.button
                      className="remove-btn"
                      type="button"
                      onClick={() => removeIngredient(index)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      -
                    </motion.button>
                  </div>
                </div>
              );
            })}
            {errors?.title && <span>{errors.title.message}</span>}
          </article>

          <motion.button
            className="adding-btn"
            type="button"
            onClick={() =>
              appendIngredient({ name: "", quantity: 0, unit: "" })
            }
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            +
          </motion.button>
          <article className="steps-article">
            <h4>Etapes</h4>
            {stepsFields.map((field, index) => {
              return (
                <div className={"steps-area"} key={field.id}>
                  <h4>Etape {index + 1}</h4>
                  <textarea
                    placeholder="Décrivez une étape de votre recette"
                    {...register(`steps.${index}.description` as const, {
                      required: true,
                    })}
                    className={
                      errors?.steps?.[index]?.description ? "error" : ""
                    }
                  />

                  <motion.button
                    className="remove-btn"
                    type="button"
                    onClick={() => removeStep(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    -
                  </motion.button>
                </div>
              );
            })}
            {errors?.title && <span>{errors.title.message}</span>}
          </article>

          <motion.button
            className="adding-btn"
            type="button"
            onClick={() => appendStep({ description: "" })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            +
          </motion.button>
        </section>
        <div className="submit-btn">
          <motion.button
            className="btn"
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Envoyer
          </motion.button>
        </div>
      </form>
    </>
  );
}
