import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

function Header() {
  const getNavLinkClass = ({ isActive }) =>
    `${styles.navLink} ${isActive ? styles.activeLink : ""}`;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo}>
          <span className={styles.logoIcon} aria-hidden="true"></span>
          <span>LearnLingo</span>
        </NavLink>

        <nav className={styles.navigation} aria-label="Main navigation">
          <NavLink to="/" className={getNavLinkClass}>
            Home
          </NavLink>

          <NavLink to="/teachers" className={getNavLinkClass}>
            Teachers
          </NavLink>

          <NavLink to="/favorites" className={getNavLinkClass}>
            Favorites
          </NavLink>
        </nav>

        <div className={styles.authActions}>
          <button type="button" className={styles.loginButton}>
            <span className={styles.loginIcon} aria-hidden="true">
              ↳
            </span>
            Log in
          </button>

          <button type="button" className={styles.registrationButton}>
            Registration
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
