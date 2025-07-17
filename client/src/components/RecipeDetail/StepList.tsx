import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { stepType } from "../../lib/definition";

const StepList = () => {
  const { id } = useParams();
  const [steps, setSteps] = useState<stepType[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/recipes/${id}/steps`)
      .then((res) => res.json())
      .then((data) => setSteps(data));
  }, [id]);

  return (
    <section className="step-list">
      <h3>Étapes : </h3>
      <ol>
        {steps.map((step) => (
          <li key={step.id}>
            {step.title}
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default StepList;
