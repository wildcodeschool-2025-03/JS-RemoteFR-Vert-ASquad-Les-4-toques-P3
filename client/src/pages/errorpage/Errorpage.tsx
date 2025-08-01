import "./errorpage.css";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { ToastContainer } from "react-toastify";
import { showToast } from "../../components/Toast/Toast";

function ErrorPage() {
  const navigate = useNavigate();

  useEffect(() => {
    showToast(
      "Vous allez être redirigé vers la page d'accueil dans 3 secondes.",
      { type: "success" },
    );
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main className="errorpage">
      <div className="error-image" />
      <div className="error-content" />
      <ToastContainer />
    </main>
  );
}

export default ErrorPage;
