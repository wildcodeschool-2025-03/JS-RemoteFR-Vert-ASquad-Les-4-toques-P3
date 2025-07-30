import { NavLink, useLocation } from "react-router";
import "./navbar.css";
import { motion } from "motion/react";
import { useState } from "react";
import { useAuth } from "../../Auth/authContext";

type LinkType = {
  to: string;
  label: string;
  onClick?: () => void;
};

const getLinks = (
  isConnected: boolean,
  isAdmin: boolean,
  logout: () => void,
): LinkType[] => {
  if (!isConnected) {
    // Links for non-authenticated users
    return [
      { to: "/", label: "Accueil" },
      { to: "/recettes", label: "Les recettes" },
      { to: "/about", label: "A propos" },
      { to: "/connexion", label: "Connexion" },
    ];
  }
  if (isAdmin) {
    // Links for authenticated users who are admins
    return [
      { to: "/", label: "Accueil" },
      { to: "/recettes", label: "Les recettes" },
      { to: "/profil", label: "Mon profil" },
      { to: "/creation", label: "Créer une recette" },
      { to: "/about", label: "A propos" },
      { to: "/admin", label: "Dashboard" },
      { to: "/", label: "Déconnexion", onClick: logout },
    ];
  }
  return [
    // Links for authenticated users who are not admins
    { to: "/", label: "Accueil" },
    { to: "/recettes", label: "Les recettes" },
    { to: "/profil", label: "Mon profil" },
    { to: "/creation", label: "Créer une recette" },
    { to: "/about", label: "A propos" },
    { to: "/", label: "Déconnexion", onClick: logout },
  ];
};

const Navbar = () => {
  const { isConnected, logout, account } = useAuth();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navbarChange =
    location.pathname === "/" ? "navbar-all" : "navbar-all-compact";
  const isAdmin = isConnected && account?.role_id === 1;
  const links = getLinks(isConnected, isAdmin, logout);

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
            {links.map((link) =>
              link.onClick ? (
                <li key={link.label}>
                  <button
                    className="burger-logout"
                    type="button"
                    onClick={link.onClick}
                  >
                    {link.label}
                  </button>
                </li>
              ) : (
                <li key={link.label}>
                  <NavLink to={link.to}>{link.label}</NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>
      )}

      <div className="navbar-text">
        <h1> Eating NAM NAM</h1>
        <div className="sign-banniere">
          {!isConnected ? (
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
          ) : (
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
          )}
        </div>
      </div>
      <div>
        <nav className="desktop-menu">
          <ul>
            {links.map((link) =>
              link.onClick ? (
                <li key={link.label}>
                  <button
                    className="link-desktop"
                    type="button"
                    onClick={link.onClick}
                  >
                    {link.label}
                  </button>
                </li>
              ) : (
                <li key={link.label}>
                  <NavLink className="link-desktop" to={link.to}>
                    {link.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
