import { Link, NavLink, useLocation } from "react-router";
import "./navbar.css";
import { motion } from "motion/react";
import { useState } from "react";
import { useAuth } from "../../Auth/authContext";

const Navbar = () => {
  const { isConnected, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navbarChange =
    location.pathname === "/" ? "navbar-all" : "navbar-all-compact";

  if (!isConnected) {
    return (
      <div className={navbarChange}>
        <header className="navbar-section">
          <NavLink to="/">
            <img src="/images/logo.png" alt="logo Eating NamNam" />
          </NavLink>
          <button type="button" className="menu" onClick={() => setOpen(!open)}>
            ☰
          </button>
        </header>

        {open && (
          <nav className="burger-menu" onMouseLeave={() => setOpen(false)}>
            <ul>
              <li>
                <NavLink to="/">Accueil</NavLink>
              </li>
              <li>
                <NavLink to="/recettes">Les recettes</NavLink>
              </li>
              <li>
                <NavLink to="/about">A propos</NavLink>
              </li>
              <li>
                <NavLink to="/connexion">Connexion</NavLink>
              </li>
            </ul>
          </nav>
        )}
        <div className="navbar-text">
          <h1> Eating NAM NAM</h1>
          <div className="sign-banniere">
            <NavLink to={"/inscription"}>
              <motion.button
                type="button"
                className="sign-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Inscris-toi !
              </motion.button>
            </NavLink>
          </div>
        </div>
        <div>
          <nav className="desktop-menu">
            <ul>
              <Link className="link-desktop" to="/">
                Accueil
              </Link>
              <Link className="link-desktop" to="/recettes">
                Les recettes
              </Link>
              <Link className="link-desktop" to="/about">
                A propos
              </Link>
              <Link className="link-desktop" to="/connexion">
                Connexion
              </Link>
            </ul>
          </nav>
        </div>
      </div>
    );
  }

  if (isConnected) {
    return (
      <div className={navbarChange}>
        <header className="navbar-section">
          <NavLink to="/">
            <img src="/images/logo.png" alt="logo Eating NamNam" />
          </NavLink>
          <button type="button" className="menu" onClick={() => setOpen(!open)}>
            ☰
          </button>
        </header>

        {open && (
          <nav className="burger-menu" onMouseLeave={() => setOpen(false)}>
            <ul>
              <li>
                <NavLink to="/">Accueil</NavLink>
              </li>
              <li>
                <NavLink to="/recettes">Les recettes</NavLink>
              </li>
              <li>
                <NavLink to="/profil">Mon profil</NavLink>
              </li>
              <li>
                <NavLink to="/creation">Créer une recette</NavLink>
              </li>
              <li>
                <NavLink to="/about">A propos</NavLink>
              </li>
              <li>
                <button
                  className="burger-logout"
                  type="button"
                  onClick={logout}
                >
                  Déconnexion
                </button>
              </li>
            </ul>
          </nav>
        )}
        <div className="navbar-text">
          <h1> Eating NAM NAM</h1>

          <div className="sign-banniere">
            <NavLink to={"/recettes"}>
              <motion.button
                type="button"
                className="search-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Rechercher une recette
              </motion.button>
            </NavLink>
          </div>
        </div>
        <div>
          <nav className="desktop-menu">
            <ul>
              <Link className="link-desktop" to="/">
                Accueil
              </Link>
              <Link className="link-desktop" to="/recettes">
                Les recettes
              </Link>
              {isConnected && (
                <Link className="link-desktop" to="/profil">
                  Mon profil
                </Link>
              )}
              <Link className="link-desktop" to="/creation">
                Créer une recette
              </Link>
              <Link className="link-desktop" to="/about">
                A propos
              </Link>
              <Link className="link-desktop" to="/" onClick={logout}>
                Déconnexion
              </Link>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
};

export default Navbar;
